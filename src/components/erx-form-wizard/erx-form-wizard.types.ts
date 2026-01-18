export type StepStatus = 'pending' | 'active' | 'completed' | 'error';

export interface WizardStep {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  optional?: boolean;
  disabled?: boolean;
  validate?: () => boolean | Promise<boolean>;
}

export interface WizardConfig {
  steps: WizardStep[];
  linear?: boolean; // must complete steps in order
  showStepNumbers?: boolean;
  showNavigation?: boolean;
  allowSkip?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export interface WizardStepChangeDetail {
  currentStep: number;
  previousStep: number;
  step: WizardStep;
  direction: 'next' | 'prev' | 'jump';
}

export interface WizardCompleteDetail {
  steps: WizardStep[];
}
