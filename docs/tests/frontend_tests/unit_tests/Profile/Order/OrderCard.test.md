# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Shows loading message initially | Displays loading state before data is fetched | Valid `ticketData`, `purchaseData` | Shows "Loading data" text | PASS |
| 2   | Displays event and purchase info | Renders event name, image, amount, quantity, and action buttons | Mocked `fetchTicketEvent` resolves | Displays "Mock Event", image, "$20", "2 ticket(s)", and both buttons | PASS |
| 3   | Displays error on fetch failure | Shows error message when `fetchTicketEvent` returns `undefined` | Mocked `fetchTicketEvent` fails | Shows "Failed to load ticket information" | PASS |

# Precondition
- The component is rendered with valid `ticketData` and `purchaseData`.
- `fetchTicketEvent` is mocked to return either valid data or `undefined`.

# Postcondition
- Displays event-related UI on successful fetch.
- Shows error UI when event fetch fails.

# Error Handling / Edge Cases
- Gracefully handles undefined API response by rendering an error message.
- Initially renders a loading indicator before data is fetched.
