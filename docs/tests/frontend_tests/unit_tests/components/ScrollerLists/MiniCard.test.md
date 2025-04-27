# Test Cases
| No. | Test Case Name                   | Description                                           | Input                                             | Expected Output / Behavior      | Status |
| --- | -------------------------------- | ----------------------------------------------------- | ------------------------------------------------- | ------------------------------- | ------ |
| 1   | Render image only                | Render card correctly given image only                | image={mockEvent.media[0]}, icon = undefined      | Renders with image          | PASS   |
| 2   | Render icon only                 | Render card correctly given icon only                 | image = undefined, icon={faParachuteBox}          | Renders with icon   | PASS   |
| 3   | Render given both icon and image | Render card correctly, image takes priority over icon | image={mockEvent.media[0]}, icon={faParachuteBox} | Renders with image | PASS   |

# Precondition
- Image and/or icon data is valid

# Postcondition
- None

# Error Handling / Edge Cases
- No graphic is rendered when both image and icon is not provided (expected behaviour). Same with text