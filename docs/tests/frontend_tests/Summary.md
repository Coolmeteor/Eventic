# Frontend Test Documentation

## Overview

This document summarizes the unit testing practices and coverage in our React application project. All tests are written using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/), aiming to ensure UI component correctness, stability, and user interaction reliability.

## Objective

- Verify that each component behaves as expected under typical and some edge-case scenarios.
- Ensure that any changes in logic do not unintentionally break the UI.
- Improve maintainability by documenting test structure clearly.

## Environment

- Frontend Framework: React
- Language: TypeScript
- Testing Framework: Jest, @testing-library/react
- Date: 04/25/2025

## Unit Tests

### Unit: DashboardList

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Renders all list items | Ensures each list item is rendered with a bullet prefix | List with "Edit Profile", "My Orders" | Items "• Edit Profile" and "• My Orders" are shown | PASS |
| 2   | Calls onClick when clicked | Clicking a list item triggers its corresponding handler | Click on each list item | Each item’s `onClick` handler is called once | PASS |

#### Precondition
- Component receives a `list` prop with `text` and `onClick` for each item.

#### Postcondition
- Each list item renders with "•" prefix.
- Handlers are invoked when respective items are clicked.

#### Error Handling / Edge Cases
- No edge cases are explicitly tested.
- Additional tests could verify behavior with an empty list or missing `onClick`.


### Unit: ChangeFormBox

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Render with current value | Displays title, description, and current registered value | `currentValue="test@example.com"` | Shows title "Email", description text, and current email | PASS |
| 2   | Show 'Not registered' | Fallback text is displayed when no value is registered | `currentValue=""`, `title="Username"` | "Current username: Not registered" is rendered | PASS |
| 3   | Submit entered value | Submits new input value via form submission | User enters "newname", submits form | `onSubmit("newname")` is called | PASS |
| 4   | Clear input after submit | Input field is cleared after successful submission | User submits form with "clearme" | Input becomes empty after submit | PASS |
| 5   | Display error message | Error text is shown and styled when `errorText` is passed | `errorText="Something went wrong"` | Error is visible and styled with red color | PASS |

#### Precondition
- `ChangeFormBox` component receives valid props: `title`, `currentValue`, `onSubmit`.
- Optional children (description) can be rendered.

#### Postcondition
- Form input is cleared after submission.
- Callback function `onSubmit` is invoked with user-entered value.

#### Error Handling / Edge Cases
- Displays "Not registered" when `currentValue` is empty.
- Shows and styles error text when provided.


### Unit: DoBChangeForm

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Render with registered date | Checks if component renders title, description, and current date | `currentValue="2000-01-01"`, `children="Optional Description"` | Title, description, and `2000-01-01` date input are displayed | PASS |
| 2   | Show 'Not registered' if no value | Verifies display of fallback text when no current value is passed | `currentValue=""` | "Not registered" is shown instead of a date | PASS |
| 3   | Call onSubmit with selected date | Ensures correct submission with newly selected date | `fireEvent.change(..., { value: "2001-12-31" })` | `onSubmit("2001-12-31")` is called | PASS |
| 4   | Render error message | Displays error message and applies styling when `errorText` is provided | `errorText="Invalid date"` | "Invalid date" shown in red color | PASS |

#### Precondition
- Component receives props: `currentValue`, `onSubmit`, `errorText`, `title`, and optional children.
- Rendered inside a form wrapper.

#### Postcondition
- If a valid new date is selected and the form is submitted, `onSubmit` is triggered with that value.

#### Error Handling / Edge Cases
- If `currentValue` is empty, fallback message "Not registered" is shown.
- If `errorText` is passed, it is displayed in red for user feedback.

### Unit: SecurityChangeForm

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Render title and children | Verifies title and description render correctly | `title="Email"`, `children="Update your email"` | "Email", "Update your email", "Current email:", and email value displayed | PASS |
| 2   | Password-specific fields | Shows special input label for passwords | `title="Password"` | "Enter new password" is displayed | PASS |
| 3   | Phone number formatting | Formats number into (XXX) XXX-XXXX pattern | `title="Phone Number"`, input: "1234567890" | Input value is formatted properly | PASS |
| 4   | Submit calls handler with input data  | Submits new value and password correctly | Inputs: "new@example.com" and "securePass" | `onSubmit("new@example.com", "securePass")` is called | PASS |
| 5   | Show custom error text | Error passed via props is rendered in red | `errorText="Server rejected input"` | Error text is shown with red styling | PASS |

#### Precondition
- Component receives valid props: `title`, `currentValue`, `errorText`, and `onSubmit`.
- May render specialized placeholder depending on `title` (e.g., Email, Password, Phone Number).

#### Postcondition
- Submitting the form with inputs calls `onSubmit(value, password)`.

#### Error Handling / Edge Cases
- Validates format-specific behavior (phone auto-format).
- Custom error messages passed in `errorText` are styled and shown clearly.

### Unit: SexChangeForm

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Render with current value | Displays title, description, and current gender | `currentValue="Male"` | Title "Gender", description, and "Current gender: Male" (as span) are shown | PASS |
| 2   | Fallback to 'Not registered' | Shows fallback text when current value is missing | `currentValue=""` | "Not registered" text is displayed | PASS |
| 3   | Show all gender options | All radio buttons for gender values are rendered | `genderValues` from constants | Each gender label (e.g., "Male", "Female", etc.) appears as a radio input | PASS   |
| 4   | Gender selection state updates | Updates selection state when user clicks radio option | User selects "Female" | "Female" radio becomes checked | PASS |
| 5   | Submit selected gender | Submits selected gender value via `onSubmit` handler | Select "Female", submit form | `onSubmit("Female")` is called | PASS |
| 6   | Displays error message | Shows error text and applies styling when error exists | `errorText="Gender selection required"` | Error text shown in red | PASS |

#### Precondition
- Component is rendered with valid props: `currentValue`, `title`, `onSubmit`.
- `genderValues` constant defines all available gender options.

#### Postcondition
- Submitting the form sends the selected gender to `onSubmit`.

#### Error Handling / Edge Cases
- Displays fallback message when gender is not registered.
- Ensures error text is visible and styled (e.g., red) when `errorText` is provided.


### Unit: OrderCard

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Shows loading message initially | Displays loading state before data is fetched | Valid `ticketData`, `purchaseData` | Shows "Loading data" text | PASS |
| 2   | Displays event and purchase info | Renders event name, image, amount, quantity, and action buttons | Mocked `fetchTicketEvent` resolves | Displays "Mock Event", image, "$20", "2 ticket(s)", and both buttons | PASS |
| 3   | Displays error on fetch failure | Shows error message when `fetchTicketEvent` returns `undefined` | Mocked `fetchTicketEvent` fails | Shows "Failed to load ticket information" | PASS |

#### Precondition
- The component is rendered with valid `ticketData` and `purchaseData`.
- `fetchTicketEvent` is mocked to return either valid data or `undefined`.

#### Postcondition
- Displays event-related UI on successful fetch.
- Shows error UI when event fetch fails.

#### Error Handling / Edge Cases
- Gracefully handles undefined API response by rendering an error message.
- Initially renders a loading indicator before data is fetched.


### Unit: RightContainer

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Renders breadcrumbs and children | Displays breadcrumb with page name and renders child components | `pageName="Edit Info"` | Shows "Profile -> Edit Info" and the child element text | PASS |
| 2   | Navigates to profile on breadcrumb | Click on breadcrumb navigates to profile | Click on "Profile" link | Calls `router.push` with "/profile" | PASS |

#### Precondition
- Component receives `pageName` prop and valid `children`.
- `useRouter` is mocked to return a `push` function.

#### Postcondition
- Correct breadcrumb text is shown.
- Navigation is triggered when "Profile" is clicked.

#### Error Handling / Edge Cases
- None tested in this case. Possible future tests could handle invalid router or missing props.


### Unit: RegisterForm

#### Test Cases

| No. | Test Case Name              | Description                                                | Input Example         | Expected Output / Behavior              | Status       |
|-----|-----------------------------|------------------------------------------------------------|-----------------------|------------------------------------------|-----------------|
| 1   | All input fields exist | Input fields for email, username, password, and confirmPassword should be rendered in the component |  No input  | All input fields exist | PASS |
| 2   | Price formatting logic      | Typing formatted price string still sets correct number    | `"2,000.0505"`        | `setData` called with `2000.05`          | PASS  |
| 3   | formatPrice utility test    | Verifies `formatPrice()` formats various inputs correctly  | `"1,500.5"`           | `"1500.50"`                              | FAILED   |

### Unit: DefaultButton

#### Test Cases
| No. | Test Case Name        | Description                  | Input                        | Expected Output / Behavior | Status |
| --- | --------------------- | ---------------------------- | ---------------------------- | -------------------------- | ------ |
| 1   | Render regular button | Render as a button           | no props                     | Renders correctly          | PASS   |
| 2   | Test onclick button   | Render as a link             | `link={true}`, `href="/yes"` | Renders correctly          | PASS   |
| 3   | Test onclick button   | Test onclick function called | `onClick={mockFn}`           | onclick function is called | PASS   |


#### Precondition
- `onClick` and `href` is valid given whatever is supposed to be used


#### Postcondition
- None


#### Error Handling / Edge Cases
- No button content is valid
- No href/onClick means nothing happens

### Unit: DefaultInputForm

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Shows the input value | Typing in the input field updates the input value | `placeholder="Type here"` | Value becomes `"ABcd12#$"` after typing | PASS |
| 2   | Renders with default styles | Ensures input includes default styling class | `data-testid="input"` | `className` includes `"defaultStyle"` | PASS |
| 3   | Passes other input props correctly| Tests `type`, `placeholder`, and `value` props | `type="email"`, `value="test@example.com"` | Input type is `"email"` and value is `"test@example.com"`| PASS |
| 4   | Merges custom className | Custom `className` is merged with `defaultStyle` | `className="custom-class"`, `data-testid="input"` | Both `defaultStyle` and `custom-class` in className | PASS |

#### Precondition
- `DefaultInputForm` component accepts standard input props (`type`, `value`, `placeholder`, etc.).
- `defaultStyle` class is always applied internally.

#### Postcondition
- The component renders an HTML `<input>` element.
- The input behaves like a controlled component when `value` and `onChange` are provided.

#### Error Handling / Edge Cases
- Class name merging is verified for style override behavior.
- Typing and placeholder behavior are verified using `userEvent`.


### Unit: CustomDatePicker

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1 | Render with initial start and end | Renders date inputs with formatted initial values | initialStartDate, initialEndDate (timestamps) | Start and End inputs show formatted date strings | PASS |
| 2 | Call `setDate` on valid input | Triggers `setDate` when user selects a valid start date | User selects a date > today | `setDate` is called with [newStartTime, 0] | PASS |
| 3 | Prevent endDate before startDate | Ensures end date before selected start date is disabled | Select start: today + 10 days, end: today + 9 days | End date selection is disabled (aria-disabled="true") | PASS |
| 4 | Disable startDate within 7 days | Prevents user from selecting start date within 7 days from today | Click on today + 6 days | Day button is disabled (aria-disabled="true") | PASS |

#### Precondition
- The CustomDatePicker component is rendered with optional initialStartDate and initialEndDate props.
- `setDate` is a mock function to track calls.
- System time is assumed to be fixed during testing (implicit with new Date()).

```ts
const mockSetDate = jest.fn();
render(<CustomDatePicker setDate={mockSetDate} />);
```

#### Postcondition
- When dates are selected, `setDate`([`startDate`, `endDate`]) is called appropriately.
- Dates that violate constraints (e.g., end before start, start within 7 days) are not selectable.

#### Error Handling / Edge Cases
- Selecting a date within 7 days from today is not allowed.
- Selecting an end date before the selected start date is disabled.
- The component handles both initial render and user interaction correctly.

### Unit: EventItem

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1 | Renders name and thumbnail | Check if event name and thumbnail is rendered | mockEventItemProps | `Test Event` and `Thumnbnail` is rendered | PASS |
| 2 | The component does not show detail information in simple mode | Check if the location and date is not rendered | mockEventItemProps | `Toronto` and `May 1, 2025` is not rendered | PASS |
| 3 | The component shows detail information in standard mode | Check if the locatio nand date is rendered | mockEventItemProps | `Toronto` and `May 1, 2025` is rendered | PASS |
| 4 | Clicking image navigates to event detail | Check if the window is navigated to the appropriate URL | mockEventItemProps | `window.location.href` is `/event/123` | PASS |
| 5 | Shows a loading message if `thumbnail` is empty | Check if the component shows a loading message | mockEventItemProps with `thumbnail=""` | `Loading...` is in the component | PASS |
| 6 | (Manual Tesing) Truncates long event title automatically | The component automatically truncates a long event name | mockEventItemProps with `name=Web Application Development` | Truncated name | PASS |

#### Precondition
- The following prop is provided
```ts
const mockEventItemProps: EventItemProps = {
    isSimple: false,
    name: "Test Event",
    thumbnail: "https://example.com/image.jpg",
    date: new Date(2025, 4, 1).getTime(), // May 1, 2025
    location: "Toronto",
    description: "",
    id: 123,
};
```

#### Postcondition
- Input event detail are shown in the component

#### Error Handling / Edge Cases
- Long event name will be automatically truncated
- Empty thumbnail will be rendered as a loading message


### Unit: PriceInput

#### Test Cases

| No. | Test Case Name              | Description                                                | Input          | Expected Output / Behavior              | Status |
|-----|-----------------------------|------------------------------------------------------------|-----------------------|------------------------------------------|-------|
| 1 | Show initial values | Renders input with initial `data` value | `data=1500` | Input shows `"1500"` | PASS |
| 2 | User input triggers `setData` | Calls `setData` with updated numeric value on input | User types `"2000"` | `setData` called with 2000 | PASS |
| 3 | Price formatting logic | Handles formatted input and parses value correctly | `"2,000.0505"` | `setData` called with `"2000.05"` | PASS |
| 4 | formatPrice utility test 1 | Parses and formats simple number | `"1000"` | Returns `"1000.00"` | PASS |
| 5 | formatPrice utility test 2 | Handles commas and decimals | `"1,500.5"` | Returns `"1500.50"` | PASS |
| 6 | formatPrice utility test 3 | Handles dollar signs and commas | `"$2,000.99"` | Returns `"2000.99"` | PASS |

#### Precondition
- `PriceInput` receives a numeric `data` prop (or `undefined`) and a `setData` function.
- The placeholder text is set to `"Enter ticket price"`.
- The utility function `formatPrice()` removes symbols and formats to 2 decimals.

#### Postcondition
- The `setData()` function reflects the updated numeric value after input.
- Input formatting symbols (`$`, `,`, excess decimals) are cleaned internally

#### Error Handling / Edge Cases
- Handles input with symbols like commas or dollar signs (e.g., `"$1,000"`).
- Prevents propagation of invalid numeric values like `abc` (this may require further tests if validation is implemented).
- Excess decimals (e.g., `.0505`) are rounded to two places correctly.

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

### Unit: Fobidden

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Displays default 403 text | Renders default forbidden message | `<Forbidden />` | Shows `"403 - Forbidden"` and permission denial message | PASS |
| 2   | Renders children content | Confirms children elements are rendered inside layout | `<Forbidden><button>...</button></Forbidden>` | Button labeled `***Test Children***` is rendered and visible | PASS |

#### Precondition
- The `Forbidden` component should render default forbidden message.
- It should support rendering additional children content inside.

#### Postcondition
- The user sees a 403 message unless a child is passed.
- If children are passed, they are also visible in the rendered output.

#### Error Handling / Edge Cases
- Verifies presence of static message in absence of children.
- Confirms flexibility to insert custom components (e.g., button) as children.


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


### Unit: ProfileLayout

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Shows LoadingMessage before fetch | Displays loading text before user profile is loaded | fetchProfile = pending | "Loading" message is shown | PASS |
| 2   | Renders non-organizer layout | Shows personal view when `is_org = false` | mockNormalUser | "Personal Information", "Tickets" are shown | PASS |
| 3   | Renders organizer layout | Shows organizer dashboard when `is_org = true` | mockOrganizer | "Event Management", "Your orders" are shown | PASS |
| 4   | Redirects on invalid profile data | Redirects user to homepage if profile data is missing | fetchProfile returns `{}` | `window.location.href === "/"` | PASS |
| 5   | Renders children inside container | Ensures child content is rendered in layout | Child element provided | "Right Side" content is visible | PASS |

#### Precondition
- `fetchProfile` is mocked.
- `DashboardList` and `Split` components are mocked for simplicity.
- `window.location.href` is overwritten for redirect behavior test.

#### Postcondition
- Layout is adjusted correctly depending on user type.
- Children are always rendered in the designated container after fetch success.

#### Error Handling / Edge Cases
- Graceful handling of unresolved fetch (Loading state persists).
- Proper redirect on malformed or missing profile response.


### Unit: LoadingMessage

#### Test Cases for `LoadingMessage` Component

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Renders initial message | Ensures component renders base text without dots initially | `<LoadingMessage>Loading</LoadingMessage>` | Displays "Loading" without trailing dots | PASS |
| 2   | Cycles dot animation | Simulates time passage to show progressive dot animation | advanceTimersByTime(500×n) | Renders "Loading", "Loading.", "Loading..", "Loading...", etc | PASS |
| 3   | Supports custom dot limit | Accepts a prop to modify max number of dots | `<LoadingMessage maxDotNum={5}>Please wait</LoadingMessage>` | Shows "Please wait....." after appropriate interval | PASS |
| 4   | Clears interval on unmount | Checks that interval timer is cleaned up on component unmount | Render → Unmount | `clearInterval()` is called | PASS |

#### Precondition
- Jest fake timers (`jest.useFakeTimers()`) are enabled for time simulation.
- Component renders a message and adds dots in intervals of 500ms.

#### Postcondition
- The dot count loops based on `maxDotNum`.
- Intervals are cleared properly to avoid memory leaks.

#### Error Handling / Edge Cases
- Validates cleanup behavior on unmount.
- Verifies the dot sequence resets after reaching `maxDotNum`.


### Unit: MediaUploadBox_and_Gallery

#### Test Cases (GalleryImage Component)
| No. | Test Case Name                              | Description                                             | Input                                      | Expected Output / Behavior         | Status |
| --- | ------------------------------------------- | ------------------------------------------------------- | ------------------------------------------ | ---------------------------------- | ------ |
| 1   | Render image                                | Renders image                                           | image data and alt text                    | image rendered correctly           | PASS   |
| 2   | Hides removable if supposed to be view only | no remove button is specified                           | removable={undefined} onRemove={undefined} | remove button is not present       | PASS   |
| 3   | Remove button works if enabled              | Typing formatted price string still sets correct number | removable={true} onRemove={mockRemove}     | remove button is present and works | PASS   |


#### Test Cases (MediaUploadBox component)
| No. | Test Case Name                                               | Description                                                  | Input                                                                                  | Expected Output / Behavior                                    | Status             |
| --- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------ |
| 1   | Render drag and drop effects and compoent label              | Render basic data and check if drag styling works            |                                                                                        |                                                               | PASS               |
| 2   | Images are exported when inputted through drag and drop      | Images are exported corectly when drag and drop              | user drags and drops some images                                                       | images show up in preview                                     | N/A (not impl yet) |
| 3   | Images are exported when inputted through file upload dialog | Images are exported corectly when file upload dialog is used | user used the browser's file picker dialog to select images                            | images show up in preview                                     | N/A (not impl yet) |
| 4   | Render image previews                                        | Images can render in preview fine                            | images={imageData = [image1, image2]} setImages={setImages} (mock images are provided) | Images can render in preview                                  | PASS               |
| 5   | Remove button works                                          | Remove image button is able to remove images                 | images={imageData = [image1, image2]} setImages={setImages} (mock images are provided). User clicks the X button. | Image1 is removed, so item at index 0 in images is now image2 | PASS               |

#### Precondition
- For GalleryImage Component 2 and 3, assume enough data is given so test 1 passes
- Images must be valid images


#### Postcondition *(if needed)*
- None


#### Error Handling / Edge Cases
- Invalid images should be rejected

### Unit: HorizontalEventList

#### Test Cases for `HorizontalEventList` Component

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Renders title | Verifies that the component displays the title text | `title="Upcoming Events"` | "Upcoming Events" is shown | PASS |
| 2   | Renders all event cards | Checks that all events from `EventCards` are displayed | Two mock events | "Sample Event 1" and "Sample Event 2" are visible | PASS |
| 3   | Renders inside scroll container | Confirms events are rendered inside `ul.scroll-list` | `EventCards=[mockEvents]` | `ul.scroll-list` contains two children | PASS |

#### Precondition
- The component receives a valid `title` prop and an `EventCards` array with event data.
- `EventItem` is mocked to return a `div` containing the `name`.

#### Postcondition
- The title and all event items are rendered correctly in a scrollable list.

#### Error Handling / Edge Cases
- Not applicable in this suite; no error state tested (e.g., empty list or missing props).


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

### Unit: HorizontalScrollContainer

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1 | Renders children | Checks if child elements are rendered inside the container | `<div>Test Child</div>` | The child element is present in the document | PASS |
| 2 | Shows scroll buttons | Confirms that left and right scroll buttons are displayed | No specific props | Two buttons are rendered | PASS |
| 3 | Scrolls right on click | Simulates clicking the right scroll button | Right button click | `scrollLeft` becomes greater than `0` | PASS |
| 4 | Uses `scrollAmount` prop | Confirms scroll distance respects custom `scrollAmount` prop | `scrollAmount={999}` | `scrollLeft` is exactly `999` after button click | PASS |

#### Precondition
- `HorizontalScrollContainer` is rendered with children elements.
- The `scrollRef` points to a scrollable container (mocked in the test).

#### Postcondition
- Scroll buttons interact with the scroll container and update `scrollLeft`.
- Custom scroll amount is applied when provided via `scrollAmount` prop.

#### Error Handling / Edge Cases
- Buttons are rendered even when content is small (no overflow). This could be a visual UX issue but does not break functionality.
- Component should ideally handle `noButton={true}` prop (not tested here, but can be added).
- Safe to simulate DOM manipulation via `scrollLeft` mocking in tests.



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

### Unit: DailyChart

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Shows loading message initially | Displays "Loading daily chart data" while fetching chart data | No user input | Text "Loading daily chart data" appears | PASS |
| 2   | Displays chart when data is loaded | Renders chart and dropdown after successful fetch | Mock chart data | Texts "Daily" and "Select data by:" are shown | PASS |
| 3   | Fetches sorted data when dropdown changes | Calls `FetchDailyChart` with updated sort type after user action | User selects "start_date" | `FetchDailyChart` called with argument "start_date" | PASS |
| 4   | Retries when data fetch is invalid | Shows retry message if fetched data is missing | Mock empty response | "Try to reload..." message is displayed | PASS |

#### Precondition
- `FetchDailyChart` function is mocked to simulate API behavior.
- `ResizeObserver` is mocked because `Recharts` internally requires it during rendering.
- `console.warn` and `console.error` are silenced for cleaner test output.

#### Postcondition
- Chart UI is rendered with correct sort functionality.
- Retry message appears if no chart data is available.

#### Error Handling / Edge Cases
- Simulates retry mechanism when API returns no chart data.
- Does not test network failure cases or invalid data formats explicitly.


### Unit: EventTable

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Renders table headers and event data | Checks if the table headers and first event data are rendered | `mockStatsData`, `mockTotalStats` | Headers like "Event name" and data like "Event 1" appear | PASS |
| 2   | Sorts data when sort button clicked | Simulates sort button click and ensures internal sort changes | Click on first sort button | No direct visual change tested, but no error thrown | PASS |
| 3   | Fetches new data on duration change | Simulates changing duration select dropdown | Select "oneyear" | `FetchEventStats` called with `"oneyear"` | PASS |
| 4   | Shows loading while fetching new data | Displays loading message when fetching after changing duration | Select "onemonth" | "Loading event stats" message is shown temporarily | PASS |

#### Precondition
- `mockStatsData` and `mockTotalStats` provided as initial props.
- `FetchEventStats` function is mocked to simulate server responses.

#### Postcondition
- EventTable displays sorted and filtered data according to user interactions.
- Fetch retry is not tested here explicitly.

#### Error Handling / Edge Cases
- Handling failed fetches or unexpected API responses is **not tested** in this suite.
- Assumes API always responds correctly.


### Unit: SalesChart

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Show loading initially | Shows loading text before chart loads | Organizer ID = 1 | "Loading chart" appears initially | PASS |
| 2   | Render chart and controls after load | Renders chart controls after loading is complete | Organizer ID = 1 | "Apply" button and "Chart Settings" appear | PASS |
| 3   | Change duration and interval values | Change dropdowns and verify updated values | Change "duration" and "interval" select inputs | Inputs reflect new selected values | PASS |
| 4   | Fetch data again on apply button | Clicking apply triggers a second fetch | Click "Apply" after load | `FetchChart` is called twice (initial + apply) | PASS |
| 5   | Redirect on fetch failure | If chart fetch fails, redirects to `/org/stats` | Fetch returns undefined | `window.location.href` becomes "/org/stats" | PASS |

#### Precondition
- `FetchChart` function is mocked to control the response.
- Organizer ID is provided as prop.

#### Postcondition
- Chart and controls are correctly updated and rerendered according to user interactions.
- Handles API fetch failures by redirecting the user.

#### Error Handling / Edge Cases
- If `FetchChart` returns `undefined`, the component redirects to `/org/stats`.
- No tests for invalid chart data format (assumes correct format or redirects).


### Unit: SalesViewer

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Show loading while fetching | Displays loading indicator before data is retrieved | organizerId = 1 | "Loading data" text is shown | PASS |
| 2   | Show error on fetch failure | Displays error and retry message when API returns empty object | API returns `{}` | "Failed to load data" and "Reloading data" are shown | PASS |
| 3   | Renders sales statistics section | Displays statistics layout after successful fetch | Mock event stats | Contains "Your Event Statistics", "Top Event by Sales", etc. | PASS |

#### Precondition
- `FetchEventStats` is mocked to simulate loading, error, and success.
- `organizerId` prop is passed to the component.

#### Postcondition
- Based on the fetch result, the UI transitions between loading, error, and fully rendered states.

#### Error Handling / Edge Cases
- If `FetchEventStats` returns an empty object, an error message is displayed and a retry is triggered.
- Pending fetch returns keep the component in a loading state.


### Unit: TopEvents

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Displays top 3 events by sales | Sorts and renders top 3 events based on highest sales | `mockStatsData` | Renders Event 2, Event 4, Event 1 in that order | PASS |
| 2   | Updates list on duration change | Calls `FetchEventStats` and displays new data | Change to `onemonth` | New Event is displayed in the list | PASS |
| 3   | Navigates to event detail on click | Clicking the "View Event" button redirects to event page | Click "View Event" | `window.location.href` is updated with `/event/{id}` | PASS |

#### Precondition
- `TopEvents` component receives `statsData` as props.
- `FetchEventStats` is mocked to return a specific response for duration changes.
- `window.location` is mocked for navigation testing.

#### Postcondition
- The component rerenders and updates the top events based on newly fetched data.
- Navigation behavior is simulated by assigning `window.location.href`.

#### Error Handling / Edge Cases
- Sort logic should correctly handle events with the same sales amount (not tested here).
- Handles updates to state and rerender correctly after async fetch.


### Unit: WeeklyChart

#### Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Shows loading message initially | Component should display loading state before data is available | Initial render | "Loading daily chart data" is shown | PASS |
| 2   | Displays chart when data is loaded | Chart title and dropdown should be rendered when data is successfully loaded | Mock data from FetchWeeklyChart | "Weekly" and "Select data by:" texts are visible | PASS |
| 3   | Triggers fetch on dropdown change | Changing the sort option should trigger FetchWeeklyChart call | Change select to `start_date` | `FetchWeeklyChart("start_date")` is called | PASS |
| 4   | Retries loading if data is empty | When fetch returns empty, retry message should be shown | Mocked fetch returns `{}` | "Try to reload..." is shown | PASS |

#### Precondition
- `FetchWeeklyChart` is mocked.
- ResizeObserver and console methods are mocked due to Recharts environment needs.

#### Postcondition
- `WeeklyChart` loads and renders chart correctly on successful fetch.
- Correctly responds to user input changes and retries on missing data.

#### Error Handling / Edge Cases
- Retries up to 3 times on missing or invalid data.
- Handles empty responses without crashing.


### Unit: TagEditor

#### Test Cases
| No. | Test Case Name                        | Description                                               | Input                                                                         | Expected Output / Behavior                | Status |
| --- | ------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------- | ------ |
| 1   | Render component                      | Basic rendering                                           | `tags={[]}`                                                                   | Component renders                         | PASS   |
| 2   | Test inputing tags                    | Adding tags via user input methods enter key and comma    | `user types "2000"`                                                           | `["meow", "miaw", "nya", "myaaa"]`        | PASS   |
| 3   | Empty and blank tag inputs            | Typing blank tags should be ignored                       | `tags={[]}`, user enters `"{enter}"`       and `"<spacebar>{enter}"`          | `[]`                                      | PASS   |
| 4   | Test inputing tags given initial tags | Verift that adding tags via user input will add in order  | `tags={["tag1", "tag2", "tag3"]}`, user types `meow,miaw{enter}`              | `"tag1", "tag2", "tag3", "meow", "miaw"]` | PASS   |
| 5   | Ignoring duplicate tags               | Duplicate tags already in the component should be ignored | `tags={["tag1", "tag2", "tag3"]}`, user types `tag1{enter}` and `meow{enter}` | `"tag1", "tag2", "tag3", "meow"]`         | PASS   |
| 6   | Remove button                         | Verifies The x button works                               | Click X on                                                                    | `["tag1", "tag3"]`                        | PASS   |

#### Precondition *(if needed)*
- `setTags` and `tags` prop is provided and functional.


#### Postcondition *(if needed)*
- The tags show up visually


#### Error Handling / Edge Cases
- Empty amd blank tags are ignored
- Duplicated tags are not added to prevent duplicates

### Unit: GenerateTicketPDF

#### Test Cases for `GenerateTicketPDF`

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Shows loading text initially | Ensures a loading message is displayed before the QR fetch completes | ticketID + event props | Text "Loading QR code..." is rendered | PASS |
| 2   | Displays QR image and enables button | Confirms image loads and button becomes active after fetch | ticketID + event props | Image with alt "QR Code" appears; button is enabled | PASS |
| 3   | Opens PDF when button is clicked | Checks if pdfMake.createPdf().open() is called on button click | ticketID + event props | `mockPdfOpen` is called once the button is clicked | PASS |

#### Precondition
- Global `fetch` is mocked to return a valid Blob representing the QR image.
- `pdfmake.createPdf().open()` is mocked to track invocation.

#### Postcondition
- QR code is displayed as an `<img>` element.
- Clicking the button generates and opens a PDF using the provided event and ticket data.

#### Error Handling / Edge Cases
- Edge case scenarios such as fetch failure or invalid Blob are not tested here.
- Additional tests may include corrupted image data, network errors, or no ticket ID.


### Unit: auth-api

#### Test Cases for Utility Functions

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1  | Get access CSRF token | Reads `csrf_access_token` from cookies | `document.cookie` has access token | Returns access token | PASS |
| 2  | Get refresh CSRF token | Reads `csrf_refresh_token` from cookies | `document.cookie` has refresh token | Returns refresh token | PASS |
| 3  | Convert response with JSON content | Converts `application/json` response | Fake response with JSON content | Returns parsed JSON object | PASS |
| 4  | Convert response with non-JSON content | Converts `text/plain` response | Fake response with plain text | Returns raw text | PASS |
| 5  | Logout redirects to login page | Successfully calls logout API and redirects | Mock fetch returns success | `window.location.href` is `/login` | PASS |
| 6  | Authentication succeeds with access token | Access token is valid and authenticated successfully | Mock fetch returns success on access check | Returns `true` | PASS |
| 7  | Authentication succeeds after refresh | Access token fails, refresh succeeds | First fetch fails, second fetch succeeds | Returns `true` | PASS |
| 8  | Authentication fails completely | Both access token and refresh token fail | Both fetch attempts fail | Returns `false` | PASS |
| 9  | Refresh token success | Refresh token API call succeeds | Mock fetch returns success | Returns response with `ok: true` | PASS |
| 10 | Refresh token failure | Refresh token API call fails | Mock fetch returns failure | Returns `undefined` | PASS |

#### Precondition
- `global.fetch` is mocked.
- `window.location.href` is overridden in the testing environment.

#### Postcondition
- Correct behavior for token management and authentication flow is confirmed.

#### Error Handling / Edge Cases
- Handles missing or invalid cookies.
- Handles access token expiration and retries with refresh token.
- Handles complete authentication failure gracefully.


### Unit: event

#### Test Cases for Utility Functions

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1  | Extract event item data | Extracts essential fields from event object | Sample `Event` object | Returns simplified event item | PASS |
| 2  | fetchTicketEvent success | Successfully fetches event data | Mock fetch resolves ok | Returns event object | PASS |
| 3  | fetchTicketEvent failure | Fails to fetch event data | Mock fetch resolves not ok | Returns `undefined` | PASS |
| 4  | fetchAddCart success | Successfully adds item to cart | Mock fetch resolves ok | Returns `true` | PASS |
| 5  | fetchAddCart failure | Fails to add item to cart | Mock fetch resolves not ok | Returns `false` | PASS |
| 6  | fetchDeleteCart success | Successfully deletes cart | Mock fetch resolves ok | Returns `true` | PASS |
| 7  | fetchDeleteCart failure | Fails to delete cart | Mock fetch resolves not ok | Returns `false` | PASS |
| 8  | fetchCartItems success | Successfully fetches cart items | Mock fetch resolves ok | Returns cart items array | PASS |
| 9  | fetchCartItems failure | Fails to fetch cart items | Mock fetch resolves not ok | Returns `undefined` | PASS |
| 10 | fetchCartPurchase success | Successfully completes cart purchase | Mock fetch resolves ok | Returns `true` | PASS |
| 11 | fetchCartPurchase failure | Fails to complete cart purchase | Mock fetch resolves not ok | Returns `false` | PASS |

#### Precondition
- `global.fetch` and `convertResponse` are mocked.
- All network operations are simulated inside unit tests.

#### Postcondition
- Correct extraction of event data is validated.
- Correct handling of add-to-cart, delete-cart, cart fetch, and purchase flows is verified.

#### Error Handling / Edge Cases
- Handles API failures by returning appropriate fallback values (`false`, `undefined`).
- Ensures API response structure is respected.


### Unit: helper

#### Test Cases for Utility Functions

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1  | Convert blob to Base64 string | Successfully fetches a blob and converts it | Mocked blob fetch and FileReader response | Returns base64-encoded string | PASS |

#### Precondition
- `global.fetch` is mocked to return a blob.
- `global.FileReader` is mocked to simulate reading the blob as a base64 data URL.

#### Postcondition
- `blobToBase64` returns a valid base64 string from the provided URL.

#### Error Handling / Edge Cases
- FileReader's `onloadend` is correctly triggered.
- Fetch call is verified to have been made with the correct URL.
- Handles successful fetch and base64 conversion gracefully.


### Unit: profile-api

#### Test Cases for Utility Functions

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1 | isValidGender returns true for valid values | "Male", "Female", "Other" | Valid gender strings | true | PASS |
| 2 | isValidGender returns false for invalid values | "Unknown" | false | PASS |
| 3 | fetchProfile returns user when access token valid | Mock fetch 200 OK | Returns user data | PASS |
| 4 | fetchProfile refreshes token if 401 and succeeds | Mock fetch 401 then 200 | Returns user data after refresh | PASS |
| 5 | fetchProfile redirects if refresh fails | Mock fetch 401, refresh fail | Redirect to `/login` | PASS |
| 6 | fetchUserInfo succeeds with valid response | Mock fetch 200 OK | Returns user data | PASS |
| 7 | fetchUserInfo returns undefined on error | Mock fetch 400 Bad | Returns undefined | PASS |
| 8 | changeRequest succeeds on first attempt | Mock fetch 200 OK | Calls resetText and sets success | PASS |
| 9 | changeRequest refreshes token and succeeds | Mock fetch 401 then 200 | Calls resetText after refresh | PASS |
| 10 | changeRequest redirects on refresh fail | Mock fetch 401, refresh fail | Redirect to `/login` | PASS |
| 11 | fetchOrders succeeds directly | Mock fetch 200 OK | Returns orders data | PASS |
| 12 | fetchOrders refreshes token and succeeds | Mock fetch 401 then 200 | Returns orders data | PASS |
| 13 | fetchOrders redirects if refresh fails | Mock fetch 401, refresh fail | Redirect to `/login` | PASS |
| 14 | fetchUpcomingOrders succeeds directly | Mock fetch 200 OK | Returns upcoming orders data | PASS |
| 15 | fetchUpcomingOrders refreshes token and succeeds | Mock fetch 401 then 200 | Returns upcoming orders data | PASS |
| 16 | fetchUpcomingOrders redirects if refresh fails | Mock fetch 401, refresh fail | Redirect to `/login` | PASS |

#### Precondition
- `global.fetch` is mocked for HTTP requests.
- `refreshToken` and `convertResponse` are mocked from `auth-api`.
- `window.location.href` is writable and controlled in tests.

#### Postcondition
- Data is returned or redirection happens appropriately.
- Token refresh logic is verified.
- Error handling ensures fallback to `/login` if authentication fails.

#### Error Handling / Edge Cases
- 401 Unauthorized triggers refresh logic.
- Refresh failure causes forced logout.
- convertResponse correctly processes both JSON and plain text responses.


### Unit: statistics

#### Test Cases for Utility Functions

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1 | sortStatsData name ascending | Sorts events by name in ascending order | Events with names "B Event", "A Event" | Sorted order: "A Event", "B Event" | PASS |
| 2 | sortStatsData sales descending | Sorts events by sales in descending order | Events with sales 1000, 2000 | Sorted order: 2000 → 1000 | PASS |
| 3 | FetchEventStats returns all stats | Fetch stats when duration is "all" | Mock fetch OK | Returns stats data | PASS |
| 4 | FetchEventStats returns duration stats | Fetch stats when duration is "threeMonths" | Mock fetch OK | Returns duration stats | PASS |
| 5 | FetchEventStats returns undefined on failure | Fetch fails | Mock fetch not OK | Returns undefined | PASS |
| 6 | FetchChart returns data on success | Fetch sales chart data | Mock fetch OK | Returns chart data array | PASS |
| 7 | FetchChart returns empty array on failure | Fetch fails | Mock fetch not OK | Returns empty array | PASS |
| 8 | FetchDailyChart returns data on success | Fetch daily chart data | Mock fetch OK | Returns chart data array | PASS |
| 9 | FetchDailyChart returns undefined on failure | Fetch fails | Mock fetch not OK | Returns undefined | PASS |
| 10 | FetchWeeklyChart returns data on success | Fetch weekly chart data | Mock fetch OK | Returns chart data array | PASS |
| 11 | FetchWeeklyChart returns undefined on failure | Fetch fails | Mock fetch not OK | Returns undefined | PASS |
| 12 | FetchOrgEvents returns all events | Fetch "all" events for organizer | Mock fetch OK | Returns events list | PASS |
| 13 | FetchOrgEvents returns upcoming events | Fetch "upcoming" events for organizer | Mock fetch OK | Returns upcoming events list | PASS |
| 14 | FetchOrgEvents returns previous events | Fetch "previous" events for organizer | Mock fetch OK | Returns previous events list | PASS |
| 15 | FetchOrgEvents returns undefined on failure | Fetch fails | Mock fetch not OK | Returns undefined | PASS |

#### Precondition
- `global.fetch` is mocked for HTTP requests.
- `convertResponse` is mocked from `auth-api`.
- Sample event data is provided where needed for sorting tests.

#### Postcondition
- Data is sorted correctly or returned based on fetch success.
- Undefined or empty array is returned when fetch fails.

#### Error Handling / Edge Cases
- Fallback behavior (undefined or empty array) is tested for failed API calls.
- Sorting direction ("asc", "desc") correctness is verified.


### Unit: ticket_purchases

#### Test Cases for Utility Functionst

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1 | AuthorizeTicket success case | Returns true when fetch is successful and ok | Ticket ID = 123, fetch ok = true | Returns true | PASS |
| 2 | AuthorizeTicket failure case | Returns false when fetch is not ok | Ticket ID = 456, fetch ok = false | Returns false | PASS |
| 3 | AuthorizeTicket fetch error case | Returns false when fetch throws an error | Ticket ID = 789, fetch throws error | Returns false | PASS |

#### Precondition
- `global.fetch` is mocked for HTTP requests.
- `jest.clearAllMocks()` is called before each test to reset fetch behavior.

#### Postcondition
- Ticket authorization succeeds or fails appropriately based on API response.

#### Error Handling / Edge Cases
- Proper handling is verified when:
- Fetch response is not OK.
- Fetch operation itself fails (e.g., network error).


### Unit: utils

#### Test Cases for Utility Functions

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1 | Return correct icon for matching category | Returns icon matching input category exactly | "Music" | Icon with `iconName: "music"` | PASS |
| 2 | Case insensitive matching | Returns correct icon even if input case differs | "art" | Icon with `iconName: "paint-brush"` | PASS |
| 3 | Return default icon if no match | Returns default icon when no category matches | "Unknown Category" | Icon with `iconName: "question-circle"` | PASS |

#### Precondition
- `eventCategoriesWithIcons` mock is provided:
  - "Music" → "music" icon
  - "Art" → "paint-brush" icon
  - Default → "question-circle" icon

#### Postcondition
- Correct icon object is returned based on category name, case-insensitive.

#### Error Handling / Edge Cases
- If no category matches, the default icon (`question-circle`) is safely returned.


## Integration Tests

### Unit: Integration

#### Integration Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1 | Home → Event Detail Navigation | Clicking event card on Home navigates to event detail page | Click event card | Moved to `/event/[id]` page | PASS |
| 2 | Login Success | Enter correct credentials and login | Correct email/password | Redirected to Home page | PASS |
| 3 | Login Failure | Enter wrong credentials and attempt login | Wrong email/password | Error message shown, stays on login page | PASS |
| 4 | Move to Create User Form | Click "Create One" on login page | Click "Create One" link | User registration form displayed | PASS |
| 5 | Move to Organizer Registration | In user registration form, click "Move to organizer registration" | Click link | Redirected to `/org/register` page | PASS |
| 6 | Profile Page for Customer | Customer account profile shows only "Your Account" quick links | Logged-in as Customer | Only "Your Account" links shown | PASS |
| 7 | Profile Page for Organizer | Organizer account profile shows "Your Account" and "Event Management" quick links | Logged-in as Organizer | Both "Your Account" and "Event Management" links shown | PASS |
| 8 | Organizer Event List (/org/events) | Shows list of events linked to organizer | Access `/org/events` | Organizer's events listed | PASS |
| 9 | Upcoming Events (/org/upcoming) | Shows events within 1 month from today | Access `/org/upcoming` | Only future events within 1 month shown | PASS |
| 10 | Past Events (/org/previous) | Shows past events | Access `/org/previous` | Only past events shown | PASS |
| 11 | Organizer Statistics (/org/stats) | Shows charts and tables, changeable by duration/sort | Access `/org/stats` and interact | Chart and table update correctly | PASS |
| 12 | Ticket Scanner (/org/scan) | Select upcoming event and open camera | Access `/org/scan` | Upcoming events selectable, camera opens | PASS |
| 13 | Customer Order List (/customer/orders) | Displays purchased ticket list | Access `/customer/orders` | List of purchased tickets shown | PASS |
| 14 | Customer Upcoming Events (/customer/upcoming) | Shows tickets for events happening soon | Access `/customer/upcoming` | Upcoming event tickets listed | PASS |
| 15 | Event List (/event) | Shows public event list with filters and sorting | Access `/event` | Public events displayed, filtering/sorting works | PASS |
| 16 | Event Search (/event) | Search by keyword and show matching events | Input search word | Matched events shown | PASS |
| 17 | Event Detail Page (/event/[id]) | Displays event details by id | Access `/event/[id]` | Correct event data displayed | PASS |
| 18 | Logout Popup | Hover person icon → Show popup → Logout | Hover icon, click logout | Logged out successfully | PASS |

#### Precondition
- Users and organizers are already registered in the system.
- Organizer has created events.
- Tickets are purchased by the customer account.

#### Postcondition
- User is correctly logged in/logged out.
- Event-related pages reflect expected data based on time and user role.
- Sorting, searching, and filters are functional.

#### Error Handling / Edge Cases
- Incorrect login shows appropriate error without redirect.
- No events available: Pages show fallback UI (e.g., "No events found").
- Organizer with no upcoming or past events: Displays empty list gracefully.
- Logout always resets session and redirects to login.



## Test Coverage
This section shows the test coverate for the front-end testing.
```markdown
Unit Test Coverage (from Jest):
- Statements: 87.36%
- Branches: 78.04%
- Functions: 80.39%
- Lines: 88.93%
```

## Authors
- Shoei Yamamoto (sy21uu@brocku.ca, 7334444)
- Michael Zhou (mz21pp@brocku.ca, 7265762)

