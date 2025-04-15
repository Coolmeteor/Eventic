# Test Cases

| No. | Test Case Name              | Description                                                | Input Example         | Expected Output / Behavior              | Status       |
|-----|-----------------------------|------------------------------------------------------------|-----------------------|------------------------------------------|-----------------|
| 1   | All input fields exist | Input fields for email, username, password, and confirmPassword should be rendered in the component |  No input  | All input fields exist | PASS |
| 2   | Price formatting logic      | Typing formatted price string still sets correct number    | `"2,000.0505"`        | `setData` called with `2000.05`          | PASS  |
| 3   | formatPrice utility test    | Verifies `formatPrice()` formats various inputs correctly  | `"1,500.5"`           | `"1500.50"`                              | FAILED   |