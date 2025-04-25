# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Show loading while fetching | Displays loading indicator before data is retrieved | organizerId = 1 | "Loading data" text is shown | PASS |
| 2   | Show error on fetch failure | Displays error and retry message when API returns empty object | API returns `{}` | "Failed to load data" and "Reloading data" are shown | PASS |
| 3   | Renders sales statistics section | Displays statistics layout after successful fetch | Mock event stats | Contains "Your Event Statistics", "Top Event by Sales", etc. | PASS |

# Precondition
- `FetchEventStats` is mocked to simulate loading, error, and success.
- `organizerId` prop is passed to the component.

# Postcondition
- Based on the fetch result, the UI transitions between loading, error, and fully rendered states.

# Error Handling / Edge Cases
- If `FetchEventStats` returns an empty object, an error message is displayed and a retry is triggered.
- Pending fetch returns keep the component in a loading state.
