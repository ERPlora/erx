# erx-phone-input



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                    | Type                    | Default          |
| --------------------- | ----------------------- | ------------------------------ | ----------------------- | ---------------- |
| `allowedCountries`    | --                      | Allowed countries (ISO codes)  | `string[] \| undefined` | `undefined`      |
| `autoFormat`          | `auto-format`           | Auto format                    | `boolean`               | `true`           |
| `defaultCountry`      | `default-country`       | Default country code           | `string`                | `'US'`           |
| `disabled`            | `disabled`              | Disabled state                 | `boolean`               | `false`          |
| `excludedCountries`   | --                      | Excluded countries (ISO codes) | `string[] \| undefined` | `undefined`      |
| `placeholder`         | `placeholder`           | Placeholder                    | `string`                | `'Phone number'` |
| `showCountrySelector` | `show-country-selector` | Show country selector          | `boolean`               | `true`           |
| `showDialCode`        | `show-dial-code`        | Show dial code                 | `boolean`               | `true`           |
| `value`               | `value`                 | Phone number value             | `string`                | `''`             |


## Events

| Event       | Description        | Type                               |
| ----------- | ------------------ | ---------------------------------- |
| `erxChange` | Phone change event | `CustomEvent<ErxPhoneChangeEvent>` |


## Shadow Parts

| Part            | Description |
| --------------- | ----------- |
| `"container"`   |             |
| `"country-btn"` |             |
| `"dropdown"`    |             |
| `"input"`       |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
