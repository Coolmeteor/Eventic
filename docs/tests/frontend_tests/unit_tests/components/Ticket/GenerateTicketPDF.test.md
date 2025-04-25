# Test Cases for `GenerateTicketPDF`

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Shows loading text initially | Ensures a loading message is displayed before the QR fetch completes | ticketID + event props | Text "Loading QR code..." is rendered | PASS |
| 2   | Displays QR image and enables button | Confirms image loads and button becomes active after fetch | ticketID + event props | Image with alt "QR Code" appears; button is enabled | PASS |
| 3   | Opens PDF when button is clicked | Checks if pdfMake.createPdf().open() is called on button click | ticketID + event props | `mockPdfOpen` is called once the button is clicked | PASS |

# Precondition
- Global `fetch` is mocked to return a valid Blob representing the QR image.
- `pdfmake.createPdf().open()` is mocked to track invocation.

# Postcondition
- QR code is displayed as an `<img>` element.
- Clicking the button generates and opens a PDF using the provided event and ticket data.

# Error Handling / Edge Cases
- Edge case scenarios such as fetch failure or invalid Blob are not tested here.
- Additional tests may include corrupted image data, network errors, or no ticket ID.
