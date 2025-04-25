# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Render with current value | Displays title, description, and current gender | `currentValue="Male"` | Title "Gender", description, and "Current gender: Male" (as span) are shown | PASS |
| 2   | Fallback to 'Not registered' | Shows fallback text when current value is missing | `currentValue=""` | "Not registered" text is displayed | PASS |
| 3   | Show all gender options | All radio buttons for gender values are rendered | `genderValues` from constants | Each gender label (e.g., "Male", "Female", etc.) appears as a radio input | PASS   |
| 4   | Gender selection state updates | Updates selection state when user clicks radio option | User selects "Female" | "Female" radio becomes checked | PASS |
| 5   | Submit selected gender | Submits selected gender value via `onSubmit` handler | Select "Female", submit form | `onSubmit("Female")` is called | PASS |
| 6   | Displays error message | Shows error text and applies styling when error exists | `errorText="Gender selection required"` | Error text shown in red | PASS |

# Precondition
- Component is rendered with valid props: `currentValue`, `title`, `onSubmit`.
- `genderValues` constant defines all available gender options.

# Postcondition
- Submitting the form sends the selected gender to `onSubmit`.

# Error Handling / Edge Cases
- Displays fallback message when gender is not registered.
- Ensures error text is visible and styled (e.g., red) when `errorText` is provided.
