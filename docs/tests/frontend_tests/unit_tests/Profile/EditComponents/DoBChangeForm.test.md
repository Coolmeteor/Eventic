# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Render with registered date | Checks if component renders title, description, and current date | `currentValue="2000-01-01"`, `children="Optional Description"` | Title, description, and `2000-01-01` date input are displayed | PASS |
| 2   | Show 'Not registered' if no value | Verifies display of fallback text when no current value is passed | `currentValue=""` | "Not registered" is shown instead of a date | PASS |
| 3   | Call onSubmit with selected date | Ensures correct submission with newly selected date | `fireEvent.change(..., { value: "2001-12-31" })` | `onSubmit("2001-12-31")` is called | PASS |
| 4   | Render error message | Displays error message and applies styling when `errorText` is provided | `errorText="Invalid date"` | "Invalid date" shown in red color | PASS |

# Precondition
- Component receives props: `currentValue`, `onSubmit`, `errorText`, `title`, and optional children.
- Rendered inside a form wrapper.

# Postcondition
- If a valid new date is selected and the form is submitted, `onSubmit` is triggered with that value.

# Error Handling / Edge Cases
- If `currentValue` is empty, fallback message "Not registered" is shown.
- If `errorText` is passed, it is displayed in red for user feedback.