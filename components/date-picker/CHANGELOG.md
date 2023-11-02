# @locoworks/reusejs-react-date-picker

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
