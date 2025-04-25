# Frontend Test Documentation

## Overview

This document summarizes the unit testing practices and coverage in our React application project. All tests are written using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/), aiming to ensure UI component correctness, stability, and user interaction reliability.

## Objective

- Verify that each component behaves as expected under typical and edge-case scenarios.
- Ensure that any changes in logic do not unintentionally break the UI.
- Improve maintainability by documenting test structure clearly.

## Environment

- Frontend Framework: React
- Language: TypeScript
- Testing Framework: Jest, @testing-library/react
- Date: ******************************************

## Unit Tests

### Unit: RegisterForm

#### Test Cases

| No. | Test Case Name              | Description                                                | Input Example         | Expected Output / Behavior              | Status       |
|-----|-----------------------------|------------------------------------------------------------|-----------------------|------------------------------------------|-----------------|
| 1   | All input fields exist | Input fields for email, username, password, and confirmPassword should be rendered in the component |  No input  | All input fields exist | PASS |
| 2   | Price formatting logic      | Typing formatted price string still sets correct number    | `"2,000.0505"`        | `setData` called with `2000.05`          | PASS  |
| 3   | formatPrice utility test    | Verifies `formatPrice()` formats various inputs correctly  | `"1,500.5"`           | `"1500.50"`                              | FAILED   |

### Unit: PriceInput

#### Test Cases

| No. | Test Case Name              | Description                                                | Input          | Expected Output / Behavior              | Status |
|-----|-----------------------------|------------------------------------------------------------|-----------------------|------------------------------------------|-------|
| 1   | Show initial values         | Renders input with initial `data` prop value               | `data=1500`           | Input shows "1500"                       | PASS |
| 2   | User input triggers setData | When user types, `setData` is called with updated value    | `user types "2000"`   | `setData` called with `2000`             | PASS |
| 3   | Price formatting logic      | Typing formatted price string still sets correct number    | `"2,000.0505"`        | `setData` called with `2000.05`          | PASS |
| 4   | formatPrice utility test    | Verifies `formatPrice()` formats various inputs correctly  | `"1,500.5"`           | `"1500.50"`                              | PASS |

### Unit: EventCard

#### Test Cases
| No. | Test Case Name                     | Description                                                                        | Input                                     | Expected Output / Behavior                                 | Status |
| --- | ---------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------- | ------ |
| 1   | EventCard data rendering           | Test rendering of basic content fields: name, pricing, description, location, date | mockevent in constants.tsx                | All fields used by the component must match those of input | PASS   |
| 2   | Check image                        | Check if image url/data is present, and url is present in background image css     | mockevent in constants.tsx                | css with url src is present                                | PASS   |
| 3   | Render button-link: Prop IS passed | Test if button renders correctly when prop is passed                               | `btn={{ href: ... , text: "View more" }}` | The button does render with the text label "view more"     | PASS   |
| 4   | Render button: NO prop passed      | Test if button is notrendered when no prop is passed                               | `btn = ` is not passed                    | The button does not render                                 | PASS   |

#### Precondition
- mockEvents[0] is a valid event, that works (ex. image is a valid url/base64 string)
- `event` prop is provided to the component.
- `btn` prop is correctly filled in, with the corect type


#### Postcondition
- N/A


#### Error Handling / Edge Cases
- Invalid images should result in everything else rendering, but the background image is blank
- Titles exceeding the card size are cut off with `...`
- Description exceeding the card size are cut off with `...`

### Unit: InputMultiLine

#### Test Cases
| No. | Test Case Name                   | Description                                                        | Input                                                                                                                                              | Expected Output / Behavior                                                                                                                                      | Status |
| --- | -------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | Functionality with minimum props | Textarea works with only only an data "get result" function        | Nothing.                                                                                                                                           | Input shows "1500"                                                                                                                                              | PASS   |
| 2   | Adding onto inital value         | User is able to add text to initialValue and have it recorded      | `initialValue=the cat jumps over the moon, and lands in the pacific ocean`                                                                         | value of the textarea and the coresponding "output variable" is `"the math exam was very difficultthe cat jumps over the moon, and lands in the pacific ocean"` | PASS   |
| 3   | Multi line user typing           | User is able to type multi-line content and have it recorded       | `"the cat jumps over the moon, and lands in the pacific ocean"`, followed by the enter key, `"MIAW"`, folowed by 4 enter keys, `"Final line here"` | value of the textarea and the coresponding "output variable" is `"the cat jumps over the moon, and lands in the pacific ocean\nMIAW.\n\n\n\nFinal line here"`   | PASS   |
| 4   | Enter key functionality          | User can press the enter key, and the enter key function is called | onEnterPress={...}  is providedm, User hits enter key                                                                                              | onEnterPress is called                                                                                                                                          | PASS   |
| 5   | Default lines                    | Default lines of textbox is editable                               | defaultLines={4}                                                                                                                                   | Component renders with 4 as the row count                                                                                                                       | PASS   |
| 6   | Textarea expands as user types   | As user types, the size of the textbox does not increase           | defaultLines={3}                                                                                                                                   | Component still has 3 as the row count, even after typing the user input in test #3                                                                             | PASS   |

#### Precondition
- `onChange` prop is always provided, and itself is free of errors
- Test 6 assumes test all the other tests have a pass status


#### Postcondition
- The textbox content reflects the user's input
- 


#### Error Handling / Edge Cases
- Very long input lengths and weird characters is supported up to whatever TypeScript string can support


### Unit: HorizontalScroll

#### Test Cases
| No. | Test Case Name                       | Description                                                    | Input                          | Expected Output / Behavior                   | Status |
| --- | ------------------------------------ | -------------------------------------------------------------- | ------------------------------ | -------------------------------------------- | ------ |
| 1   | HorizontalScroll rendering items     | Renders items in list                                          | textWithIcons                  | Renders all items                            | PASS   |
| 2   | MiniHorizontalScroll rendering items | Renders items in list                                          | tags and textWithIcons         | Renders all items                            | PASS   |
| 3   | Render if only tags                  | Render MiniHorizontalScroll correctly given  only tags         | tags but textWithIcons is null | Renders tags and only tags                   | PASS   |
| 4   | Render if only textWithIcons         | Render MiniHorizontalScroll correctly given only textWithIcons | textWithIcons but tags is null | Renders textWithIcons and only textWithIcons | PASS   |

#### Precondition
- Data being rendered itself is not malformed


#### Postcondition *(if needed)*
- Data is displayed


#### Error Handling / Edge Cases
- No items ends up being blank list

### Unit: MiniCard

#### Test Cases
| No. | Test Case Name                   | Description                                           | Input                                             | Expected Output / Behavior      | Status |
| --- | -------------------------------- | ----------------------------------------------------- | ------------------------------------------------- | ------------------------------- | ------ |
| 1   | Render image only                | Render card correctly given image only                | image={mockEvent.media[0]}, icon = undefined      | Renders with image          | PASS   |
| 2   | Render icon only                 | Render card correctly given icon only                 | image = undefined, icon={faParachuteBox}          | Renders with icon   | PASS   |
| 3   | Render given both icon and image | Render card correctly, image takes priority over icon | image={mockEvent.media[0]}, icon={faParachuteBox} | Renders with image | PASS   |

#### Precondition
- Image and/or icon data is valid

#### Postcondition
- None

#### Error Handling / Edge Cases
- No graphic is rendered when both image and icon is not provided (expected behaviour). Same with text

## Test Coverage
Write down the test converage percentage from the testing framework. For example:
```markdown
Unit Test Coverage (from Jest):
- Statements: 93%
- Branches: 87%
- Functions: 95%
- Lines: 93%
```

## Known Issues
Describe not tested/not fixed issues. For example:
```markdown
- Toast messages occasionally overlap on small screens
- Delay in error rendering due to debounce (to be fixed)
```

## Authors
Names whose worked on the frontend testing.

