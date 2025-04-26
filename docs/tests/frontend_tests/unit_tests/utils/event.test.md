# Test Cases for Utility Functions

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1  | Extract event item data | Extracts essential fields from event object | Sample `Event` object | Returns simplified event item | PASS |
| 2  | fetchTicketEvent success | Successfully fetches event data | Mock fetch resolves ok | Returns event object | PASS |
| 3  | fetchTicketEvent failure | Fails to fetch event data | Mock fetch resolves not ok | Returns `undefined` | PASS |
| 4  | fetchAddCart success | Successfully adds item to cart | Mock fetch resolves ok | Returns `true` | PASS |
| 5  | fetchAddCart failure | Fails to add item to cart | Mock fetch resolves not ok | Returns `false` | PASS |
| 6  | fetchDeleteCart success | Successfully deletes cart | Mock fetch resolves ok | Returns `true` | PASS |
| 7  | fetchDeleteCart failure | Fails to delete cart | Mock fetch resolves not ok | Returns `false` | PASS |
| 8  | fetchCartItems success | Successfully fetches cart items | Mock fetch resolves ok | Returns cart items array | PASS |
| 9  | fetchCartItems failure | Fails to fetch cart items | Mock fetch resolves not ok | Returns `undefined` | PASS |
| 10 | fetchCartPurchase success | Successfully completes cart purchase | Mock fetch resolves ok | Returns `true` | PASS |
| 11 | fetchCartPurchase failure | Fails to complete cart purchase | Mock fetch resolves not ok | Returns `false` | PASS |

# Precondition
- `global.fetch` and `convertResponse` are mocked.
- All network operations are simulated inside unit tests.

# Postcondition
- Correct extraction of event data is validated.
- Correct handling of add-to-cart, delete-cart, cart fetch, and purchase flows is verified.

# Error Handling / Edge Cases
- Handles API failures by returning appropriate fallback values (`false`, `undefined`).
- Ensures API response structure is respected.
