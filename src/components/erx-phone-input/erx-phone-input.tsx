import { Component, Prop, Event, EventEmitter, State, h } from '@stencil/core';
import { ErxCountry, ErxPhoneChangeEvent } from './erx-phone-input.types';

const COUNTRIES: ErxCountry[] = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', format: '(###) ###-####' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', format: '#### ######' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸', format: '### ### ###' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', format: '# ## ## ## ##' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', format: '### #######' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹', format: '### ### ####' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽', format: '## #### ####' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷', format: '## #####-####' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷', format: '## ####-####' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴', format: '### #######' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱', format: '# #### ####' },
  { code: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪', format: '### ### ###' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳', format: '### #### ####' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵', format: '##-####-####' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷', format: '##-####-####' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', format: '##### #####' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', format: '### ### ###' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', format: '(###) ###-####' },
];

@Component({
  tag: 'erx-phone-input',
  styleUrl: 'erx-phone-input.css',
  shadow: true,
})
export class ErxPhoneInput {
  /** Phone number value */
  @Prop({ mutable: true }) value: string = '';

  /** Default country code */
  @Prop() defaultCountry: string = 'US';

  /** Allowed countries (ISO codes) */
  @Prop() allowedCountries?: string[];

  /** Excluded countries (ISO codes) */
  @Prop() excludedCountries?: string[];

  /** Show country selector */
  @Prop() showCountrySelector: boolean = true;

  /** Show dial code */
  @Prop() showDialCode: boolean = true;

  /** Auto format */
  @Prop() autoFormat: boolean = true;

  /** Placeholder */
  @Prop() placeholder: string = 'Phone number';

  /** Disabled state */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Phone change event */
  @Event() erxChange!: EventEmitter<ErxPhoneChangeEvent>;

  @State() selectedCountry: ErxCountry;
  @State() dropdownOpen: boolean = false;
  @State() searchQuery: string = '';

  componentWillLoad() {
    this.selectedCountry = this.getCountryByCode(this.defaultCountry) || COUNTRIES[0];
  }

  private get availableCountries(): ErxCountry[] {
    let countries = COUNTRIES;

    if (this.allowedCountries?.length) {
      countries = countries.filter(c => this.allowedCountries.includes(c.code));
    }

    if (this.excludedCountries?.length) {
      countries = countries.filter(c => !this.excludedCountries.includes(c.code));
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      countries = countries.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.code.toLowerCase().includes(query) ||
        c.dialCode.includes(query)
      );
    }

    return countries;
  }

  private getCountryByCode(code: string): ErxCountry | undefined {
    return COUNTRIES.find(c => c.code === code);
  }

  private formatNumber(value: string, format?: string): string {
    if (!this.autoFormat || !format) return value;

    const digits = value.replace(/\D/g, '');
    let result = '';
    let digitIndex = 0;

    for (const char of format) {
      if (digitIndex >= digits.length) break;
      if (char === '#') {
        result += digits[digitIndex];
        digitIndex++;
      } else {
        result += char;
      }
    }

    return result;
  }

  private handleInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    let value = input.value.replace(/[^\d]/g, '');

    if (this.autoFormat && this.selectedCountry.format) {
      value = this.formatNumber(value, this.selectedCountry.format);
    }

    this.value = value;
    this.emitChange();
  };

  private selectCountry(country: ErxCountry): void {
    this.selectedCountry = country;
    this.dropdownOpen = false;
    this.searchQuery = '';
    this.emitChange();
  }

  private emitChange(): void {
    const nationalNumber = this.value.replace(/\D/g, '');
    const fullNumber = this.selectedCountry.dialCode + nationalNumber;

    this.erxChange.emit({
      value: fullNumber,
      nationalNumber,
      countryCode: this.selectedCountry.code,
      dialCode: this.selectedCountry.dialCode,
      isValid: nationalNumber.length >= 7,
    });
  }

  render() {
    return (
      <div
        class={{
          'erx-phone': true,
          'erx-phone--disabled': this.disabled,
        }}
        part="container"
      >
        {/* Country selector */}
        {this.showCountrySelector && (
          <div class="erx-phone__country">
            <button
              class="erx-phone__country-btn"
              onClick={() => this.dropdownOpen = !this.dropdownOpen}
              disabled={this.disabled}
              type="button"
              part="country-btn"
            >
              <span class="erx-phone__flag">{this.selectedCountry.flag}</span>
              {this.showDialCode && (
                <span class="erx-phone__dial-code">{this.selectedCountry.dialCode}</span>
              )}
              <span class="erx-phone__caret">▼</span>
            </button>

            {this.dropdownOpen && (
              <div class="erx-phone__dropdown" part="dropdown">
                <input
                  type="text"
                  class="erx-phone__search"
                  placeholder="Search countries..."
                  value={this.searchQuery}
                  onInput={(e) => this.searchQuery = (e.target as HTMLInputElement).value}
                />
                <div class="erx-phone__list">
                  {this.availableCountries.map(country => (
                    <button
                      class={{
                        'erx-phone__option': true,
                        'erx-phone__option--selected': country.code === this.selectedCountry.code,
                      }}
                      onClick={() => this.selectCountry(country)}
                      type="button"
                    >
                      <span class="erx-phone__option-flag">{country.flag}</span>
                      <span class="erx-phone__option-name">{country.name}</span>
                      <span class="erx-phone__option-dial">{country.dialCode}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Phone input */}
        <input
          type="tel"
          class="erx-phone__input"
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          onInput={this.handleInput}
          part="input"
        />
      </div>
    );
  }
}
