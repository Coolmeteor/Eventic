# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Render with current value | Displays title, description, and current registered value | `currentValue="test@example.com"` | Shows title "Email", description text, and current email | PASS |
| 2   | Show 'Not registered' | Fallback text is displayed when no value is registered | `currentValue=""`, `title="Username"` | "Current username: Not registered" is rendered | PASS |
| 3   | Submit entered value | Submits new input value via form submission | User enters "newname", submits form | `onSubmit("newname")` is called | PASS |
| 4   | Clear input after submit | Input field is cleared after successful submission | User submits form with "clearme" | Input becomes empty after submit | PASS |
| 5   | Display error message | Error text is shown and styled when `errorText` is passed | `errorText="Something went wrong"` | Error is visible and styled with red color | PASS |

# Precondition
- `ChangeFormBox` component receives valid props: `title`, `currentValue`, `onSubmit`.
- Optional children (description) can be rendered.

# Postcondition
- Form input is cleared after submission.
- Callback function `onSubmit` is invoked with user-entered value.

# Error Handling / Edge Cases
- Displays "Not registered" when `currentValue` is empty.
- Shows and styles error text when provided.
