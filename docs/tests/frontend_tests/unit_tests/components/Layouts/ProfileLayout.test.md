# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Shows LoadingMessage before fetch | Displays loading text before user profile is loaded | fetchProfile = pending | "Loading" message is shown | PASS |
| 2   | Renders non-organizer layout | Shows personal view when `is_org = false` | mockNormalUser | "Personal Information", "Tickets" are shown | PASS |
| 3   | Renders organizer layout | Shows organizer dashboard when `is_org = true` | mockOrganizer | "Event Management", "Your orders" are shown | PASS |
| 4   | Redirects on invalid profile data | Redirects user to homepage if profile data is missing | fetchProfile returns `{}` | `window.location.href === "/"` | PASS |
| 5   | Renders children inside container | Ensures child content is rendered in layout | Child element provided | "Right Side" content is visible | PASS |

# Precondition
- `fetchProfile` is mocked.
- `DashboardList` and `Split` components are mocked for simplicity.
- `window.location.href` is overwritten for redirect behavior test.

# Postcondition
- Layout is adjusted correctly depending on user type.
- Children are always rendered in the designated container after fetch success.

# Error Handling / Edge Cases
- Graceful handling of unresolved fetch (Loading state persists).
- Proper redirect on malformed or missing profile response.
