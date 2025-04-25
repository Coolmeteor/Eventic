# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Shows loading message initially | Displays "Loading daily chart data" while fetching chart data | No user input | Text "Loading daily chart data" appears | PASS |
| 2   | Displays chart when data is loaded | Renders chart and dropdown after successful fetch | Mock chart data | Texts "Daily" and "Select data by:" are shown | PASS |
| 3   | Fetches sorted data when dropdown changes | Calls `FetchDailyChart` with updated sort type after user action | User selects "start_date" | `FetchDailyChart` called with argument "start_date" | PASS |
| 4   | Retries when data fetch is invalid | Shows retry message if fetched data is missing | Mock empty response | "Try to reload..." message is displayed | PASS |

# Precondition
- `FetchDailyChart` function is mocked to simulate API behavior.
- `ResizeObserver` is mocked because `Recharts` internally requires it during rendering.
- `console.warn` and `console.error` are silenced for cleaner test output.

# Postcondition
- Chart UI is rendered with correct sort functionality.
- Retry message appears if no chart data is available.

# Error Handling / Edge Cases
- Simulates retry mechanism when API returns no chart data.
- Does not test network failure cases or invalid data formats explicitly.
