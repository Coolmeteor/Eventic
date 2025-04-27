# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1 | Render with initial start and end | Renders date inputs with formatted initial values | initialStartDate, initialEndDate (timestamps) | Start and End inputs show formatted date strings | PASS |
| 2 | Call `setDate` on valid input | Triggers `setDate` when user selects a valid start date | User selects a date > today | `setDate` is called with [newStartTime, 0] | PASS |
| 3 | Prevent endDate before startDate | Ensures end date before selected start date is disabled | Select start: today + 10 days, end: today + 9 days | End date selection is disabled (aria-disabled="true") | PASS |
| 4 | Disable startDate within 7 days | Prevents user from selecting start date within 7 days from today | Click on today + 6 days | Day button is disabled (aria-disabled="true") | PASS |

# Precondition 
- The CustomDatePicker component is rendered with optional initialStartDate and initialEndDate props.
- `setDate` is a mock function to track calls.
- System time is assumed to be fixed during testing (implicit with new Date()).

```ts
const mockSetDate = jest.fn();
render(<CustomDatePicker setDate={mockSetDate} />);
```

# Postcondition
- When dates are selected, `setDate`([`startDate`, `endDate`]) is called appropriately.
- Dates that violate constraints (e.g., end before start, start within 7 days) are not selectable.

# Error Handling / Edge Cases
- Selecting a date within 7 days from today is not allowed.
- Selecting an end date before the selected start date is disabled.
- The component handles both initial render and user interaction correctly.