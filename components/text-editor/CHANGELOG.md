# @locoworks/reusejs-react-text-editor

## 0.1.4

### Patch Changes

- d7871ed: Changes:

  - Added prop for prepopulation of editor using htmlData.
  - Removed AutoFocusPlugin

## 0.1.3

### Patch Changes

- b1f6553: Changes:

  - Implemented multiple File Upload in Image
  - updated prop for multiple file upload
  - table rows and columns inversion issue fixed
  - updated styles

## 0.1.2

### Patch Changes

- ef1eb22: Updated Changes-

  • Remove Normal/Heading
  • Add numbered list
  • UI for the toolbar (Center align)
  • Move “Save” to top toolbar
  • @ See if it’s possible to show usernames immediately
  • Editor Content resizable
  • Table cell styling
  • Table in html gets styled

## 0.1.1

### Patch Changes

- 9b6ff0f: Text-Editor Component

  1. Editor

  - Added props for initialEditor state and extracted payload for setup in a div.

  2. Table Plugin

  - Resolved the layout for the TableRow Adder button.
  - Corrected TableAction Menu to resolve scrolling issues.

  3. ImagePlugin

  - Eliminated "Sample Image" from ImagePlugin.

  4. Others

  - Transferred inline styles to CSS files for convenient style overrides.
  - Updated icons

## 0.1.0

### Minor Changes

- 3ceb4e0: Text Editor Component

  - Created a Text editor app using Lexical library
  - It takes props :
    useMentionLookupService,
    convertFileToImageUrl,
    onChangeCallback,
    wrapperClass
  - Uses Plugins inside editor for features like mentions,tables and images.

### Patch Changes

- 6de9025: Deleted Unused Files and removed cursor pointer
