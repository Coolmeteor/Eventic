# Test Cases

| No. | Test Case Name              | Description                                                | Input          | Expected Output / Behavior              | Status |
|-----|-----------------------------|------------------------------------------------------------|-----------------------|------------------------------------------|-------|
| 1 | Show initial values | Renders input with initial `data` value | `data=1500` | Input shows `"1500"` | PASS |
| 2 | User input triggers `setData` | Calls `setData` with updated numeric value on input | User types `"2000"` | `setData` called with 2000 | PASS |
| 3 | Price formatting logic | Handles formatted input and parses value correctly | `"2,000.0505"` | `setData` called with `"2000.05"` | PASS |
| 4 | formatPrice utility test 1 | Parses and formats simple number | `"1000"` | Returns `"1000.00"` | PASS |
| 5 | formatPrice utility test 2 | Handles commas and decimals | `"1,500.5"` | Returns `"1500.50"` | PASS |
| 6 | formatPrice utility test 3 | Handles dollar signs and commas | `"$2,000.99"` | Returns `"2000.99"` | PASS |

# Precondition
- `PriceInput` receives a numeric `data` prop (or `undefined`) and a `setData` function.
- The placeholder text is set to `"Enter ticket price"`.
- The utility function `formatPrice()` removes symbols and formats to 2 decimals.

# Postcondition
- The `setData()` function reflects the updated numeric value after input.
- Input formatting symbols (`$`, `,`, excess decimals) are cleaned internally

# Error Handling / Edge Cases
- Handles input with symbols like commas or dollar signs (e.g., `"$1,000"`).
- Prevents propagation of invalid numeric values like `abc` (this may require further tests if validation is implemented).
- Excess decimals (e.g., `.0505`) are rounded to two places correctly.