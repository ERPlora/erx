import { Component, Prop, State, Event, EventEmitter, h, Method } from '@stencil/core';
import { DateRange, DateRangePreset, DateRangePickerConfig, DateRangeChangeDetail, DEFAULT_PRESETS } from './erx-date-range-picker.types';

@Component({
  tag: 'erx-date-range-picker',
  styleUrl: 'erx-date-range-picker.css',
  shadow: true,
})
export class ErxDateRangePicker {
  @Prop() range?: DateRange;
  @Prop() config: DateRangePickerConfig = {};
  @Prop() placeholder = 'Select date range';
  @Prop() disabled = false;
  @Prop() label?: string;

  @State() isOpen = false;
  @State() currentMonth: Date = new Date();
  @State() hoverDate: Date | null = null;
  @State() selectedRange: DateRange = { start: null, end: null };
  @State() selectingEnd = false;

  @Event() erxChange!: EventEmitter<DateRangeChangeDetail>;

  componentWillLoad() {
    if (this.range) {
      this.selectedRange = { ...this.range };
    }
  }

  @Method()
  async clear(): Promise<void> {
    this.selectedRange = { start: null, end: null };
    this.selectingEnd = false;
    this.erxChange.emit({ start: null, end: null });
  }

  @Method()
  async setRange(range: DateRange): Promise<void> {
    this.selectedRange = { ...range };
    this.erxChange.emit({ start: range.start, end: range.end });
  }

  private get locale(): string {
    return this.config.locale || 'en-US';
  }

  private get firstDayOfWeek(): number {
    return this.config.firstDayOfWeek ?? 0;
  }

  private get presets(): DateRangePreset[] {
    return this.config.presets || DEFAULT_PRESETS;
  }

  private getMonthDays(monthDate: Date): Date[][] {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDate = new Date(firstDay);
    const dayOffset = (firstDay.getDay() - this.firstDayOfWeek + 7) % 7;
    startDate.setDate(startDate.getDate() - dayOffset);

    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      currentWeek.push(date);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
        if (date > lastDay && weeks.length >= 5) break;
      }
    }

    return weeks;
  }

  private getWeekDayNames(): string[] {
    const names: string[] = [];
    const baseDate = new Date(2024, 0, this.firstDayOfWeek);
    for (let i = 0; i < 7; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);
      names.push(date.toLocaleDateString(this.locale, { weekday: 'short' }));
    }
    return names;
  }

  private isToday(date: Date): boolean {
    return date.toDateString() === new Date().toDateString();
  }

  private isCurrentMonth(date: Date, monthDate: Date): boolean {
    return date.getMonth() === monthDate.getMonth();
  }

  private isInRange(date: Date): boolean {
    const { start, end } = this.selectedRange;
    if (!start || !end) return false;
    return date >= start && date <= end;
  }

  private isRangeStart(date: Date): boolean {
    return this.selectedRange.start?.toDateString() === date.toDateString();
  }

  private isRangeEnd(date: Date): boolean {
    return this.selectedRange.end?.toDateString() === date.toDateString();
  }

  private isInHoverRange(date: Date): boolean {
    if (!this.selectingEnd || !this.selectedRange.start || !this.hoverDate) return false;
    return date > this.selectedRange.start && date <= this.hoverDate;
  }

  private isDisabled(date: Date): boolean {
    if (this.config.minDate && date < new Date(this.config.minDate)) return true;
    if (this.config.maxDate && date > new Date(this.config.maxDate)) return true;
    return false;
  }

  private handleDateClick(date: Date) {
    if (this.isDisabled(date)) return;

    if (!this.selectingEnd) {
      this.selectedRange = { start: date, end: null };
      this.selectingEnd = true;
    } else {
      if (date < this.selectedRange.start!) {
        this.selectedRange = { start: date, end: this.selectedRange.start };
      } else {
        this.selectedRange = { ...this.selectedRange, end: date };
      }
      this.selectingEnd = false;
      this.erxChange.emit({ start: this.selectedRange.start, end: this.selectedRange.end });
    }
  }

  private handlePresetClick(preset: DateRangePreset) {
    this.selectedRange = { ...preset.range };
    this.erxChange.emit({ start: preset.range.start, end: preset.range.end, preset });
    this.isOpen = false;
  }

  private navigateMonth(direction: 'prev' | 'next') {
    const newMonth = new Date(this.currentMonth);
    newMonth.setMonth(newMonth.getMonth() + (direction === 'next' ? 1 : -1));
    this.currentMonth = newMonth;
  }

  private formatDisplayValue(): string {
    const { start, end } = this.selectedRange;
    if (!start) return this.placeholder;
    if (!end) return start.toLocaleDateString(this.locale);
    return `${start.toLocaleDateString(this.locale)} - ${end.toLocaleDateString(this.locale)}`;
  }

  private renderCalendar(monthDate: Date, isSecond = false) {
    const weeks = this.getMonthDays(monthDate);
    const weekDays = this.getWeekDayNames();

    return (
      <div class="erx-drp__calendar">
        <div class="erx-drp__month-header">
          {!isSecond && (
            <button class="erx-drp__nav-btn" onClick={() => this.navigateMonth('prev')}>←</button>
          )}
          <span class="erx-drp__month-title">
            {monthDate.toLocaleDateString(this.locale, { month: 'long', year: 'numeric' })}
          </span>
          {(isSecond || this.config.singleCalendar) && (
            <button class="erx-drp__nav-btn" onClick={() => this.navigateMonth('next')}>→</button>
          )}
        </div>

        <div class="erx-drp__weekdays">
          {weekDays.map(day => (
            <div class="erx-drp__weekday" key={day}>{day}</div>
          ))}
        </div>

        <div class="erx-drp__days">
          {weeks.map((week, weekIndex) => (
            <div class="erx-drp__week" key={weekIndex}>
              {week.map(date => (
                <div
                  class={{
                    'erx-drp__day': true,
                    'erx-drp__day--today': this.isToday(date),
                    'erx-drp__day--other-month': !this.isCurrentMonth(date, monthDate),
                    'erx-drp__day--in-range': this.isInRange(date),
                    'erx-drp__day--range-start': this.isRangeStart(date),
                    'erx-drp__day--range-end': this.isRangeEnd(date),
                    'erx-drp__day--hover-range': this.isInHoverRange(date),
                    'erx-drp__day--disabled': this.isDisabled(date),
                  }}
                  key={date.toISOString()}
                  onClick={() => this.handleDateClick(date)}
                  onMouseEnter={() => { this.hoverDate = date; }}
                  onMouseLeave={() => { this.hoverDate = null; }}
                >
                  {date.getDate()}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const nextMonth = new Date(this.currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    return (
      <div
        class={{
          'erx-drp': true,
          'erx-drp--disabled': this.disabled,
          'erx-drp--open': this.isOpen,
        }}
        part="container"
      >
        {this.label && <label class="erx-drp__label">{this.label}</label>}

        <div
          class="erx-drp__trigger"
          onClick={() => { if (!this.disabled) this.isOpen = !this.isOpen; }}
          part="trigger"
        >
          <span class="erx-drp__value">{this.formatDisplayValue()}</span>
          <span class="erx-drp__icon">📅</span>
        </div>

        {this.isOpen && (
          <div class="erx-drp__dropdown" part="dropdown">
            {this.config.showPresets !== false && (
              <div class="erx-drp__presets" part="presets">
                {this.presets.map(preset => (
                  <button
                    class="erx-drp__preset"
                    key={preset.id}
                    onClick={() => this.handlePresetClick(preset)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}

            <div class="erx-drp__calendars" part="calendars">
              {this.renderCalendar(this.currentMonth)}
              {!this.config.singleCalendar && this.renderCalendar(nextMonth, true)}
            </div>

            <div class="erx-drp__footer" part="footer">
              <button
                class="erx-drp__clear-btn"
                onClick={() => this.clear()}
                type="button"
              >
                Clear
              </button>
              <button
                class="erx-drp__apply-btn"
                onClick={() => { this.isOpen = false; }}
                type="button"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
