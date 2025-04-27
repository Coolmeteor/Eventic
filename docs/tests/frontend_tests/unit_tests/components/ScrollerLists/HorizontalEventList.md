# Test Cases for `HorizontalEventList` Component

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Renders title | Verifies that the component displays the title text | `title="Upcoming Events"` | "Upcoming Events" is shown | PASS |
| 2   | Renders all event cards | Checks that all events from `EventCards` are displayed | Two mock events | "Sample Event 1" and "Sample Event 2" are visible | PASS |
| 3   | Renders inside scroll container | Confirms events are rendered inside `ul.scroll-list` | `EventCards=[mockEvents]` | `ul.scroll-list` contains two children | PASS |

# Precondition
- The component receives a valid `title` prop and an `EventCards` array with event data.
- `EventItem` is mocked to return a `div` containing the `name`.

# Postcondition
- The title and all event items are rendered correctly in a scrollable list.

# Error Handling / Edge Cases
- Not applicable in this suite; no error state tested (e.g., empty list or missing props).
