# Test Cases
| No. | Test Case Name        | Description                  | Input                        | Expected Output / Behavior | Status |
| --- | --------------------- | ---------------------------- | ---------------------------- | -------------------------- | ------ |
| 1   | Render regular button | Render as a button           | no props                     | Renders correctly          | PASS   |
| 2   | Test onclick button   | Render as a link             | `link={true}`, `href="/yes"` | Renders correctly          | PASS   |
| 3   | Test onclick button   | Test onclick function called | `onClick={mockFn}`           | onclick function is called | PASS   |


# Precondition
- `onClick` and `href` is valid given whatever is supposed to be used


# Postcondition
- None


# Error Handling / Edge Cases
- No button content is valid
- No href/onClick means nothing happens