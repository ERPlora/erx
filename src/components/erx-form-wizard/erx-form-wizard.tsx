import { Component, Prop, State, Event, EventEmitter, h, Method } from '@stencil/core';
import { WizardConfig, StepStatus, WizardStepChangeDetail, WizardCompleteDetail } from './erx-form-wizard.types';

@Component({
  tag: 'erx-form-wizard',
  styleUrl: 'erx-form-wizard.css',
  shadow: true,
})
export class ErxFormWizard {
  @Prop() config: WizardConfig = { steps: [] };
  @Prop() disabled = false;

  @State() currentStep = 0;
  @State() completedSteps: Set<number> = new Set();
  @State() errorSteps: Set<number> = new Set();
  @State() isValidating = false;

  @Event() erxStepChange!: EventEmitter<WizardStepChangeDetail>;
  @Event() erxComplete!: EventEmitter<WizardCompleteDetail>;

  @Method()
  async goToStep(stepIndex: number): Promise<boolean> {
    if (stepIndex < 0 || stepIndex >= this.config.steps.length) return false;
    if (this.config.steps[stepIndex].disabled) return false;

    if (this.config.linear && stepIndex > this.currentStep) {
      // Must complete all previous steps in linear mode
      for (let i = 0; i < stepIndex; i++) {
        if (!this.completedSteps.has(i) && !this.config.steps[i].optional) {
          return false;
        }
      }
    }

    const previousStep = this.currentStep;
    this.currentStep = stepIndex;
    this.erxStepChange.emit({
      currentStep: stepIndex,
      previousStep,
      step: this.config.steps[stepIndex],
      direction: stepIndex > previousStep ? 'next' : stepIndex < previousStep ? 'prev' : 'jump',
    });
    return true;
  }

  @Method()
  async next(): Promise<boolean> {
    const step = this.config.steps[this.currentStep];

    if (step.validate) {
      this.isValidating = true;
      const isValid = await step.validate();
      this.isValidating = false;

      if (!isValid) {
        this.errorSteps = new Set([...this.errorSteps, this.currentStep]);
        return false;
      }
    }

    this.errorSteps.delete(this.currentStep);
    this.errorSteps = new Set(this.errorSteps);
    this.completedSteps = new Set([...this.completedSteps, this.currentStep]);

    if (this.currentStep === this.config.steps.length - 1) {
      this.erxComplete.emit({ steps: this.config.steps });
      return true;
    }

    return this.goToStep(this.currentStep + 1);
  }

  @Method()
  async prev(): Promise<boolean> {
    if (this.currentStep === 0) return false;
    return this.goToStep(this.currentStep - 1);
  }

  @Method()
  async reset(): Promise<void> {
    this.currentStep = 0;
    this.completedSteps = new Set();
    this.errorSteps = new Set();
  }

  private getStepStatus(index: number): StepStatus {
    if (this.errorSteps.has(index)) return 'error';
    if (index === this.currentStep) return 'active';
    if (this.completedSteps.has(index)) return 'completed';
    return 'pending';
  }

  private canNavigateTo(index: number): boolean {
    if (this.config.steps[index].disabled) return false;
    if (!this.config.linear) return true;
    if (index <= this.currentStep) return true;
    // Can only go to next step if all previous are completed
    for (let i = 0; i < index; i++) {
      if (!this.completedSteps.has(i) && !this.config.steps[i].optional) {
        return false;
      }
    }
    return true;
  }

  private handleStepClick(index: number) {
    if (this.canNavigateTo(index)) {
      this.goToStep(index);
    }
  }

  render() {
    const { steps, showStepNumbers = true, showNavigation = true, orientation = 'horizontal' } = this.config;

    return (
      <div
        class={{
          'erx-wizard': true,
          'erx-wizard--disabled': this.disabled,
          [`erx-wizard--${orientation}`]: true,
        }}
        part="container"
      >
        <div class="erx-wizard__steps" part="steps">
          {steps.map((step, index) => {
            const status = this.getStepStatus(index);
            const canNavigate = this.canNavigateTo(index);

            return (
              <div
                class={{
                  'erx-wizard__step': true,
                  [`erx-wizard__step--${status}`]: true,
                  'erx-wizard__step--clickable': canNavigate,
                  'erx-wizard__step--disabled': !!step.disabled,
                }}
                key={step.id}
                onClick={() => this.handleStepClick(index)}
              >
                <div class="erx-wizard__step-indicator">
                  {status === 'completed' ? (
                    <span class="erx-wizard__check">✓</span>
                  ) : status === 'error' ? (
                    <span class="erx-wizard__error">!</span>
                  ) : step.icon ? (
                    <span class="erx-wizard__icon">{step.icon}</span>
                  ) : showStepNumbers ? (
                    <span class="erx-wizard__number">{index + 1}</span>
                  ) : (
                    <span class="erx-wizard__dot"></span>
                  )}
                </div>

                <div class="erx-wizard__step-content">
                  <span class="erx-wizard__step-title">{step.title}</span>
                  {step.subtitle && <span class="erx-wizard__step-subtitle">{step.subtitle}</span>}
                  {step.optional && <span class="erx-wizard__step-optional">Optional</span>}
                </div>

                {index < steps.length - 1 && (
                  <div class={{
                    'erx-wizard__connector': true,
                    'erx-wizard__connector--completed': this.completedSteps.has(index),
                  }}></div>
                )}
              </div>
            );
          })}
        </div>

        <div class="erx-wizard__content" part="content">
          <slot name={`step-${this.currentStep}`}></slot>
          <slot></slot>
        </div>

        {showNavigation && (
          <div class="erx-wizard__navigation" part="navigation">
            <button
              class="erx-wizard__btn erx-wizard__btn--prev"
              onClick={() => this.prev()}
              disabled={this.currentStep === 0 || this.isValidating}
              type="button"
            >
              Previous
            </button>

            {this.config.allowSkip && this.config.steps[this.currentStep]?.optional && (
              <button
                class="erx-wizard__btn erx-wizard__btn--skip"
                onClick={() => this.goToStep(this.currentStep + 1)}
                disabled={this.isValidating}
                type="button"
              >
                Skip
              </button>
            )}

            <button
              class="erx-wizard__btn erx-wizard__btn--next"
              onClick={() => this.next()}
              disabled={this.isValidating}
              type="button"
            >
              {this.isValidating ? 'Validating...' : this.currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        )}
      </div>
    );
  }
}
