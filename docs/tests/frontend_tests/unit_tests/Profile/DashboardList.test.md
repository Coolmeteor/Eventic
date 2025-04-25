# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Renders all list items | Ensures each list item is rendered with a bullet prefix | List with "Edit Profile", "My Orders" | Items "• Edit Profile" and "• My Orders" are shown | PASS |
| 2   | Calls onClick when clicked | Clicking a list item triggers its corresponding handler | Click on each list item | Each item’s `onClick` handler is called once | PASS |

# Precondition
- Component receives a `list` prop with `text` and `onClick` for each item.

# Postcondition
- Each list item renders with "•" prefix.
- Handlers are invoked when respective items are clicked.

# Error Handling / Edge Cases
- No edge cases are explicitly tested.
- Additional tests could verify behavior with an empty list or missing `onClick`.
