/**
 * ERX Phone Input Types
 * Phone number input with country code
 */

export interface ErxCountry {
  /** ISO country code */
  code: string;
  /** Country name */
  name: string;
  /** Dial code */
  dialCode: string;
  /** Phone format pattern */
  format?: string;
  /** Flag emoji */
  flag?: string;
}

export interface ErxPhoneInputConfig {
  /** Phone number value */
  value?: string;
  /** Default country code */
  defaultCountry?: string;
  /** Allowed countries (ISO codes) */
  allowedCountries?: string[];
  /** Excluded countries (ISO codes) */
  excludedCountries?: string[];
  /** Show country selector */
  showCountrySelector?: boolean;
  /** Show dial code */
  showDialCode?: boolean;
  /** Auto format */
  autoFormat?: boolean;
  /** Placeholder */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface ErxPhoneChangeEvent {
  /** Full phone number with dial code */
  value: string;
  /** National format number */
  nationalNumber: string;
  /** Country code */
  countryCode: string;
  /** Dial code */
  dialCode: string;
  /** Is valid number */
  isValid: boolean;
}
