# Test Cases for Utility Functions

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1  | Convert blob to Base64 string | Successfully fetches a blob and converts it | Mocked blob fetch and FileReader response | Returns base64-encoded string | PASS |

# Precondition
- `global.fetch` is mocked to return a blob.
- `global.FileReader` is mocked to simulate reading the blob as a base64 data URL.

# Postcondition
- `blobToBase64` returns a valid base64 string from the provided URL.

# Error Handling / Edge Cases
- FileReader's `onloadend` is correctly triggered.
- Fetch call is verified to have been made with the correct URL.
- Handles successful fetch and base64 conversion gracefully.
