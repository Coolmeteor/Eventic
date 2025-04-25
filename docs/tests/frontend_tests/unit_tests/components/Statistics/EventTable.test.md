# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Renders table headers and event data | Checks if the table headers and first event data are rendered | `mockStatsData`, `mockTotalStats` | Headers like "Event name" and data like "Event 1" appear | PASS |
| 2   | Sorts data when sort button clicked | Simulates sort button click and ensures internal sort changes | Click on first sort button | No direct visual change tested, but no error thrown | PASS |
| 3   | Fetches new data on duration change | Simulates changing duration select dropdown | Select "oneyear" | `FetchEventStats` called with `"oneyear"` | PASS |
| 4   | Shows loading while fetching new data | Displays loading message when fetching after changing duration | Select "onemonth" | "Loading event stats" message is shown temporarily | PASS |

# Precondition
- `mockStatsData` and `mockTotalStats` provided as initial props.
- `FetchEventStats` function is mocked to simulate server responses.

# Postcondition
- EventTable displays sorted and filtered data according to user interactions.
- Fetch retry is not tested here explicitly.

# Error Handling / Edge Cases
- Handling failed fetches or unexpected API responses is **not tested** in this suite.
- Assumes API always responds correctly.
