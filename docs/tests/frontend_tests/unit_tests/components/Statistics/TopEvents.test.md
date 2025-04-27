# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Displays top 3 events by sales | Sorts and renders top 3 events based on highest sales | `mockStatsData` | Renders Event 2, Event 4, Event 1 in that order | PASS |
| 2   | Updates list on duration change | Calls `FetchEventStats` and displays new data | Change to `onemonth` | New Event is displayed in the list | PASS |
| 3   | Navigates to event detail on click | Clicking the "View Event" button redirects to event page | Click "View Event" | `window.location.href` is updated with `/event/{id}` | PASS |

# Precondition
- `TopEvents` component receives `statsData` as props.
- `FetchEventStats` is mocked to return a specific response for duration changes.
- `window.location` is mocked for navigation testing.

# Postcondition
- The component rerenders and updates the top events based on newly fetched data.
- Navigation behavior is simulated by assigning `window.location.href`.

# Error Handling / Edge Cases
- Sort logic should correctly handle events with the same sales amount (not tested here).
- Handles updates to state and rerender correctly after async fetch.
