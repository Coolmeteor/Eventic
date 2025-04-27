# Test Cases for Utility Functions

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1 | isValidGender returns true for valid values | "Male", "Female", "Other" | Valid gender strings | true | PASS |
| 2 | isValidGender returns false for invalid values | "Unknown" | false | PASS |
| 3 | fetchProfile returns user when access token valid | Mock fetch 200 OK | Returns user data | PASS |
| 4 | fetchProfile refreshes token if 401 and succeeds | Mock fetch 401 then 200 | Returns user data after refresh | PASS |
| 5 | fetchProfile redirects if refresh fails | Mock fetch 401, refresh fail | Redirect to `/login` | PASS |
| 6 | fetchUserInfo succeeds with valid response | Mock fetch 200 OK | Returns user data | PASS |
| 7 | fetchUserInfo returns undefined on error | Mock fetch 400 Bad | Returns undefined | PASS |
| 8 | changeRequest succeeds on first attempt | Mock fetch 200 OK | Calls resetText and sets success | PASS |
| 9 | changeRequest refreshes token and succeeds | Mock fetch 401 then 200 | Calls resetText after refresh | PASS |
| 10 | changeRequest redirects on refresh fail | Mock fetch 401, refresh fail | Redirect to `/login` | PASS |
| 11 | fetchOrders succeeds directly | Mock fetch 200 OK | Returns orders data | PASS |
| 12 | fetchOrders refreshes token and succeeds | Mock fetch 401 then 200 | Returns orders data | PASS |
| 13 | fetchOrders redirects if refresh fails | Mock fetch 401, refresh fail | Redirect to `/login` | PASS |
| 14 | fetchUpcomingOrders succeeds directly | Mock fetch 200 OK | Returns upcoming orders data | PASS |
| 15 | fetchUpcomingOrders refreshes token and succeeds | Mock fetch 401 then 200 | Returns upcoming orders data | PASS |
| 16 | fetchUpcomingOrders redirects if refresh fails | Mock fetch 401, refresh fail | Redirect to `/login` | PASS |

# Precondition
- `global.fetch` is mocked for HTTP requests.
- `refreshToken` and `convertResponse` are mocked from `auth-api`.
- `window.location.href` is writable and controlled in tests.

# Postcondition
- Data is returned or redirection happens appropriately.
- Token refresh logic is verified.
- Error handling ensures fallback to `/login` if authentication fails.

# Error Handling / Edge Cases
- 401 Unauthorized triggers refresh logic.
- Refresh failure causes forced logout.
- convertResponse correctly processes both JSON and plain text responses.
