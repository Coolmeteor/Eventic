# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Shows loading message initially | Component should display loading state before data is available | Initial render | "Loading daily chart data" is shown | PASS |
| 2   | Displays chart when data is loaded | Chart title and dropdown should be rendered when data is successfully loaded | Mock data from FetchWeeklyChart | "Weekly" and "Select data by:" texts are visible | PASS |
| 3   | Triggers fetch on dropdown change | Changing the sort option should trigger FetchWeeklyChart call | Change select to `start_date` | `FetchWeeklyChart("start_date")` is called | PASS |
| 4   | Retries loading if data is empty | When fetch returns empty, retry message should be shown | Mocked fetch returns `{}` | "Try to reload..." is shown | PASS |

# Precondition
- `FetchWeeklyChart` is mocked.
- ResizeObserver and console methods are mocked due to Recharts environment needs.

# Postcondition
- `WeeklyChart` loads and renders chart correctly on successful fetch.
- Correctly responds to user input changes and retries on missing data.

# Error Handling / Edge Cases
- Retries up to 3 times on missing or invalid data.
- Handles empty responses without crashing.
