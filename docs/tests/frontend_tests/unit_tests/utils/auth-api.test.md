# Test Cases for Utility Functions

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1  | Get access CSRF token | Reads `csrf_access_token` from cookies | `document.cookie` has access token | Returns access token | PASS |
| 2  | Get refresh CSRF token | Reads `csrf_refresh_token` from cookies | `document.cookie` has refresh token | Returns refresh token | PASS |
| 3  | Convert response with JSON content | Converts `application/json` response | Fake response with JSON content | Returns parsed JSON object | PASS |
| 4  | Convert response with non-JSON content | Converts `text/plain` response | Fake response with plain text | Returns raw text | PASS |
| 5  | Logout redirects to login page | Successfully calls logout API and redirects | Mock fetch returns success | `window.location.href` is `/login` | PASS |
| 6  | Authentication succeeds with access token | Access token is valid and authenticated successfully | Mock fetch returns success on access check | Returns `true` | PASS |
| 7  | Authentication succeeds after refresh | Access token fails, refresh succeeds | First fetch fails, second fetch succeeds | Returns `true` | PASS |
| 8  | Authentication fails completely | Both access token and refresh token fail | Both fetch attempts fail | Returns `false` | PASS |
| 9  | Refresh token success | Refresh token API call succeeds | Mock fetch returns success | Returns response with `ok: true` | PASS |
| 10 | Refresh token failure | Refresh token API call fails | Mock fetch returns failure | Returns `undefined` | PASS |

# Precondition
- `global.fetch` is mocked.
- `window.location.href` is overridden in the testing environment.

# Postcondition
- Correct behavior for token management and authentication flow is confirmed.

# Error Handling / Edge Cases
- Handles missing or invalid cookies.
- Handles access token expiration and retries with refresh token.
- Handles complete authentication failure gracefully.
