# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1 | Renders name and thumbnail | Check if event name and thumbnail is rendered | mockEventItemProps | `Test Event` and `Thumnbnail` is rendered | PASS |
| 2 | The component does not show detail information in simple mode | Check if the location and date is not rendered | mockEventItemProps | `Toronto` and `May 1, 2025` is not rendered | PASS |
| 3 | The component shows detail information in standard mode | Check if the locatio nand date is rendered | mockEventItemProps | `Toronto` and `May 1, 2025` is rendered | PASS |
| 4 | Clicking image navigates to event detail | Check if the window is navigated to the appropriate URL | mockEventItemProps | `window.location.href` is `/event/123` | PASS |
| 5 | Shows a loading message if `thumbnail` is empty | Check if the component shows a loading message | mockEventItemProps with `thumbnail=""` | `Loading...` is in the component | PASS |
| 6 | (Manual Tesing) Truncates long event title automatically | The component automatically truncates a long event name | mockEventItemProps with `name=Web Application Development` | Truncated name | PASS |

# Precondition
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

# Postcondition
- Input event detail are shown in the component

# Error Handling / Edge Cases
- Long event name will be automatically truncated
- Empty thumbnail will be rendered as a loading message
