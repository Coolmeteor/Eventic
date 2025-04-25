# Test Cases
| No. | Test Case Name                       | Description                                                    | Input                          | Expected Output / Behavior                   | Status |
| --- | ------------------------------------ | -------------------------------------------------------------- | ------------------------------ | -------------------------------------------- | ------ |
| 1   | HorizontalScroll rendering items     | Renders items in list                                          | textWithIcons                  | Renders all items                            | PASS   |
| 2   | MiniHorizontalScroll rendering items | Renders items in list                                          | tags and textWithIcons         | Renders all items                            | PASS   |
| 3   | Render if only tags                  | Render MiniHorizontalScroll correctly given  only tags         | tags but textWithIcons is null | Renders tags and only tags                   | PASS   |
| 4   | Render if only textWithIcons         | Render MiniHorizontalScroll correctly given only textWithIcons | textWithIcons but tags is null | Renders textWithIcons and only textWithIcons | PASS   |

# Precondition
- Data being rendered itself is not malformed


# Postcondition *(if needed)*
- Data is displayed


# Error Handling / Edge Cases
- No items ends up being blank list