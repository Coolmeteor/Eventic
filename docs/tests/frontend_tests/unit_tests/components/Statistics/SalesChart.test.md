# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Show loading initially | Shows loading text before chart loads | Organizer ID = 1 | "Loading chart" appears initially | PASS |
| 2   | Render chart and controls after load | Renders chart controls after loading is complete | Organizer ID = 1 | "Apply" button and "Chart Settings" appear | PASS |
| 3   | Change duration and interval values | Change dropdowns and verify updated values | Change "duration" and "interval" select inputs | Inputs reflect new selected values | PASS |
| 4   | Fetch data again on apply button | Clicking apply triggers a second fetch | Click "Apply" after load | `FetchChart` is called twice (initial + apply) | PASS |
| 5   | Redirect on fetch failure | If chart fetch fails, redirects to `/org/stats` | Fetch returns undefined | `window.location.href` becomes "/org/stats" | PASS |

# Precondition
- `FetchChart` function is mocked to control the response.
- Organizer ID is provided as prop.

# Postcondition
- Chart and controls are correctly updated and rerendered according to user interactions.
- Handles API fetch failures by redirecting the user.

# Error Handling / Edge Cases
- If `FetchChart` returns `undefined`, the component redirects to `/org/stats`.
- No tests for invalid chart data format (assumes correct format or redirects).
