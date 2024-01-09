# @locoworks/reusejs-toolkit-react-hooks

## 2.1.0

### Minor Changes

- 2fc6e24: Fixed issue with default selected options in useHeadlessSelectHook

## 2.0.0

### Major Changes

- 1fbf2f4: Date-Helper Changes:

  - Added the following functions for enhanced date handling:
    - addLeadingZeroes: Adds leading zeroes to single-digit months or dates in user input.
    - parseCustomDate: Converts user-entered dates in a specified format to JavaScript Date type.
    - getFormattedDate: Converts calendar-selected dates or Date objects to the user-specified format.
    - isValidDate: Updated the function to validate user-typed input in the specified format and incorporated ts-luxon for date validation.

## 1.0.0

### Major Changes

- 32feb02: This include a use-date-helper Hook

  - Added the convertGMTDateToTimezone function to convert GMT dates to a specified timezone.
  - Introduced the isValidDate function to validate date strings against a specified format.

## 0.5.0

### Minor Changes

- 9781410: Added useMountComponent and useClosableComponent hooks

## 0.4.0

### Minor Changes

- 4835ee6: Added useBetaForm Hook

## 0.3.0

### Minor Changes

- 15f8716: Added usePRogess and useSlider hooks to toolkit-react-hooks

## 0.2.0

### Minor Changes

- bfde7df: Releaseing react hooks

### Patch Changes

- Updated dependencies [7fa7c9b]
  - @locoworks/reusejs-toolkit-utils@0.2.0

## 0.1.0

### Minor Changes

- 1ed390b: Initial release of React-hooks

### Patch Changes

- Updated dependencies [1ed390b]
  - @locoworks/reusejs-toolkit-utils@0.1.0
