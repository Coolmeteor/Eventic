# Test Cases (GalleryImage Component)
| No. | Test Case Name                              | Description                                             | Input                                      | Expected Output / Behavior         | Status |
| --- | ------------------------------------------- | ------------------------------------------------------- | ------------------------------------------ | ---------------------------------- | ------ |
| 1   | Render image                                | Renders image                                           | image data and alt text                    | image rendered correctly           | PASS   |
| 2   | Hides removable if supposed to be view only | no remove button is specified                           | removable={undefined} onRemove={undefined} | remove button is not present       | PASS   |
| 3   | Remove button works if enabled              | Typing formatted price string still sets correct number | removable={true} onRemove={mockRemove}     | remove button is present and works | PASS   |


# Test Cases (MediaUploadBox component)
| No. | Test Case Name                                               | Description                                                  | Input                                                                                  | Expected Output / Behavior                                    | Status             |
| --- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------ |
| 1   | Render drag and drop effects and compoent label              | Render basic data and check if drag styling works            |                                                                                        |                                                               | PASS               |
| 2   | Images are exported when inputted through drag and drop      | Images are exported corectly when drag and drop              | user drags and drops some images                                                       | images show up in preview                                     | N/A (not impl yet) |
| 3   | Images are exported when inputted through file upload dialog | Images are exported corectly when file upload dialog is used | user used the browser's file picker dialog to select images                            | images show up in preview                                     | N/A (not impl yet) |
| 4   | Render image previews                                        | Images can render in preview fine                            | images={imageData = [image1, image2]} setImages={setImages} (mock images are provided) | Images can render in preview                                  | PASS               |
| 5   | Remove button works                                          | Remove image button is able to remove images                 | images={imageData = [image1, image2]} setImages={setImages} (mock images are provided). User clicks the X button. | Image1 is removed, so item at index 0 in images is now image2 | PASS               |

# Precondition
- For GalleryImage Component 2 and 3, assume enough data is given so test 1 passes
- Images must be valid images


# Postcondition *(if needed)*
- None


# Error Handling / Edge Cases
- Invalid images should be rejected