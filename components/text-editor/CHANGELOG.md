# @locoworks/reusejs-react-text-editor

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
