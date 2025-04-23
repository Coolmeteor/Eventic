# Test Cases
| No. | Test Case Name                   | Description                                                        | Input                                                                                                                                              | Expected Output / Behavior                                                                                                                                      | Status |
| --- | -------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | Functionality with minimum props | Textarea works with only only an data "get result" function        | Nothing.                                                                                                                                           | Input shows "1500"                                                                                                                                              | PASS   |
| 2   | Adding onto inital value         | User is able to add text to initialValue and have it recorded      | `initialValue=the cat jumps over the moon, and lands in the pacific ocean`                                                                         | value of the textarea and the coresponding "output variable" is `"the math exam was very difficultthe cat jumps over the moon, and lands in the pacific ocean"` | PASS   |
| 3   | Multi line user typing           | User is able to type multi-line content and have it recorded       | `"the cat jumps over the moon, and lands in the pacific ocean"`, followed by the enter key, `"MIAW"`, folowed by 4 enter keys, `"Final line here"` | value of the textarea and the coresponding "output variable" is `"the cat jumps over the moon, and lands in the pacific ocean\nMIAW.\n\n\n\nFinal line here"`   | PASS   |
| 4   | Enter key functionality          | User can press the enter key, and the enter key function is called | onEnterPress={...}  is providedm, User hits enter key                                                                                              | onEnterPress is called                                                                                                                                          | PASS   |
| 5   | Default lines                    | Default lines of textbox is editable                               | defaultLines={4}                                                                                                                                   | Component renders with 4 as the row count                                                                                                                       | PASS   |
| 6   | Textarea expands as user types   | As user types, the size of the textbox does not increase           | defaultLines={3}                                                                                                                                   | Component still has 3 as the row count, even after typing the user input in test #3                                                                             | PASS   |

# Precondition
- `onChange` prop is always provided, and itself is free of errors
- Test 6 assumes test all the other tests have a pass status


# Postcondition
- The textbox content reflects the user's input
- 


# Error Handling / Edge Cases
- Very long input lengths and weird characters is supported up to whatever TypeScript string can support
