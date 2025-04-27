# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Displays default 403 text | Renders default forbidden message | `<Forbidden />` | Shows `"403 - Forbidden"` and permission denial message | PASS |
| 2   | Renders children content | Confirms children elements are rendered inside layout | `<Forbidden><button>...</button></Forbidden>` | Button labeled `***Test Children***` is rendered and visible | PASS |

# Precondition
- The `Forbidden` component should render default forbidden message.
- It should support rendering additional children content inside.

# Postcondition
- The user sees a 403 message unless a child is passed.
- If children are passed, they are also visible in the rendered output.

# Error Handling / Edge Cases
- Verifies presence of static message in absence of children.
- Confirms flexibility to insert custom components (e.g., button) as children.
