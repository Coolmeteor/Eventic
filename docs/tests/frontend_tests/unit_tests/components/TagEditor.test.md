# Test Cases
| No. | Test Case Name                        | Description                                               | Input                                                                         | Expected Output / Behavior                | Status |
| --- | ------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------- | ------ |
| 1   | Render component                      | Basic rendering                                           | `tags={[]}`                                                                   | Component renders                         | PASS   |
| 2   | Test inputing tags                    | Adding tags via user input methods enter key and comma    | `user types "2000"`                                                           | `["meow", "miaw", "nya", "myaaa"]`        | PASS   |
| 3   | Empty and blank tag inputs            | Typing blank tags should be ignored                       | `tags={[]}`, user enters `"{enter}"`       and `"<spacebar>{enter}"`          | `[]`                                      | PASS   |
| 4   | Test inputing tags given initial tags | Verift that adding tags via user input will add in order  | `tags={["tag1", "tag2", "tag3"]}`, user types `meow,miaw{enter}`              | `"tag1", "tag2", "tag3", "meow", "miaw"]` | PASS   |
| 5   | Ignoring duplicate tags               | Duplicate tags already in the component should be ignored | `tags={["tag1", "tag2", "tag3"]}`, user types `tag1{enter}` and `meow{enter}` | `"tag1", "tag2", "tag3", "meow"]`         | PASS   |
| 6   | Remove button                         | Verifies The x button works                               | Click X on                                                                    | `["tag1", "tag3"]`                        | PASS   |

# Precondition *(if needed)*
- `setTags` and `tags` prop is provided and functional.


# Postcondition *(if needed)*
- The tags show up visually


# Error Handling / Edge Cases
- Empty amd blank tags are ignored
- Duplicated tags are not added to prevent duplicates