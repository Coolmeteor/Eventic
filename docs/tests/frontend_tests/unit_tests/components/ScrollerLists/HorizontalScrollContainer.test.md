# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1 | Renders children | Checks if child elements are rendered inside the container | `<div>Test Child</div>` | The child element is present in the document | PASS |
| 2 | Shows scroll buttons | Confirms that left and right scroll buttons are displayed | No specific props | Two buttons are rendered | PASS |
| 3 | Scrolls right on click | Simulates clicking the right scroll button | Right button click | `scrollLeft` becomes greater than `0` | PASS |
| 4 | Uses `scrollAmount` prop | Confirms scroll distance respects custom `scrollAmount` prop | `scrollAmount={999}` | `scrollLeft` is exactly `999` after button click | PASS |

# Precondition 
- `HorizontalScrollContainer` is rendered with children elements.
- The `scrollRef` points to a scrollable container (mocked in the test).

# Postcondition
- Scroll buttons interact with the scroll container and update `scrollLeft`.
- Custom scroll amount is applied when provided via `scrollAmount` prop.

# Error Handling / Edge Cases
- Buttons are rendered even when content is small (no overflow). This could be a visual UX issue but does not break functionality.
- Component should ideally handle `noButton={true}` prop (not tested here, but can be added).
- Safe to simulate DOM manipulation via `scrollLeft` mocking in tests.

