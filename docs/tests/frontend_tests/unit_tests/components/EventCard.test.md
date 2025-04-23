# Test Cases
| No. | Test Case Name                     | Description                                                                        | Input                                     | Expected Output / Behavior                                 | Status |
| --- | ---------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------- | ------ |
| 1   | EventCard data rendering           | Test rendering of basic content fields: name, pricing, description, location, date | mockevent in constants.tsx                | All fields used by the component must match those of input | PASS   |
| 2   | Check image                        | Check if image url/data is present, and url is present in background image css     | mockevent in constants.tsx                | css with url src is present                                | PASS   |
| 3   | Render button-link: Prop IS passed | Test if button renders correctly when prop is passed                               | `btn={{ href: ... , text: "View more" }}` | The button does render with the text label "view more"     | PASS   |
| 4   | Render button: NO prop passed      | Test if button is notrendered when no prop is passed                               | `btn = ` is not passed                    | The button does not render                                 | PASS   |

# Precondition
- mockEvents[0] is a valid event, that works (ex. image is a valid url/base64 string)
- `event` prop is provided to the component.
- `btn` prop is correctly filled in, with the corect type


# Postcondition
- N/A


# Error Handling / Edge Cases
- Invalid images should result in everything else rendering, but the background image is blank
- Titles exceeding the card size are cut off with `...`
- Description exceeding the card size are cut off with `...`