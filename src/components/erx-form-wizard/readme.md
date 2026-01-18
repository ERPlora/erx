# erx-form-wizard



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type           | Default         |
| ---------- | ---------- | ----------- | -------------- | --------------- |
| `config`   | --         |             | `WizardConfig` | `{ steps: [] }` |
| `disabled` | `disabled` |             | `boolean`      | `false`         |


## Events

| Event           | Description | Type                                  |
| --------------- | ----------- | ------------------------------------- |
| `erxComplete`   |             | `CustomEvent<WizardCompleteDetail>`   |
| `erxStepChange` |             | `CustomEvent<WizardStepChangeDetail>` |


## Methods

### `goToStep(stepIndex: number) => Promise<boolean>`



#### Parameters

| Name        | Type     | Description |
| ----------- | -------- | ----------- |
| `stepIndex` | `number` |             |

#### Returns

Type: `Promise<boolean>`



### `next() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `prev() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `reset() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"container"`  |             |
| `"content"`    |             |
| `"navigation"` |             |
| `"steps"`      |             |


----------------------------------------------

*Built with Stencil - ERPlora eXtensions*
