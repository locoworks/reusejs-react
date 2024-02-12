# @locoworks/reusejs-react-date-picker

## 3.1.1

### Patch Changes

- 9ad33a7: Added support for empty default date

## 3.1.0

### Minor Changes

- 3d6ce17: -Added Month Selector Component
  -Added Year Selector Component
  and related props

## 3.0.2

### Patch Changes

- 19ec0bb: Fixed Types path for new bundle

## 3.0.1

### Patch Changes

- 3ecf021: Changes:

  - Custom Buttons for prev and next months
  - Top Label: (Hide, Pass Custom Text, Pass Custom Component)
  - Call back for getting new selected date.

- 303a559: - Implemented usage of twMerge in Calendar and HeadlessDatePicker

## 3.0.0

### Major Changes

- 19f3501: - Resolved the error related to the missing declaration file for the '@locoworks/reusejs-react-date-picker' module.
  - Removed the inclusion of the hook from the tsconfig configuration.

## 2.0.1

### Patch Changes

- 17c646c: Added Grid layout to datepicker

## 2.0.0

### Major Changes

- 1fbf2f4: HeadlessDatePicker Changes:

  - Removed unnecessary logging statements.
  - Enhanced date format validation and synchronization with the calendar by allowing user-defined date formats.
  - Introduced suffixWrapperClasses and inputWrapperClasses for CSS customization.
  - Set a default value for minDate.
  - Simplified the Headless DatePicker component by removing various CSS properties for easier customization.
  - Moved the ts-luxon dependency to the hooks.

## 1.0.0

### Major Changes

- 32feb02: Created 3 Components inside DatePicker Component-

  1. Calendar which includes all the calendar related UI
  2. SingleDatePicker which includes using dayzed and passing props to Calendar
  3. HeadlessDatePicker which is a custom UI for date input and followed.
     There also is a useDateHelpers hook being used which extracts the date helper function (isValid) to be used inside DatePicker.
