# Test Cases
| No. | Test Case Name              | Description                                                | Input          | Expected Output / Behavior              | Status |
|-----|-----------------------------|------------------------------------------------------------|-----------------------|------------------------------------------|-------|
| 1   | Show initial values         | Renders input with initial `data` prop value               | `data=1500`           | Input shows "1500"                       | PASS |
| 2   | User input triggers setData | When user types, `setData` is called with updated value    | `user types "2000"`   | `setData` called with `2000`             | PASS |
| 3   | Price formatting logic      | Typing formatted price string still sets correct number    | `"2,000.0505"`        | `setData` called with `2000.05`          | PASS |
| 4   | formatPrice utility test    | Verifies `formatPrice()` formats various inputs correctly  | `"1,500.5"`           | `"1500.50"`                              | PASS |

# Precondition *(if needed)*
- `data` prop is provided to the component.
- Component is rendered inside a form container.


# Postcondition *(if needed)*
- `setData()` is called with updated value.
- The form state reflects the new price value.


# Error Handling / Edge Cases
- Invalid price inputs like `abc`, `-100`, `0` should be rejected.
- Handles paste input such as `"$1,500"` correctly.