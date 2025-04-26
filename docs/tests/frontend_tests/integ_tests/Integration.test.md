# Integration Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1 | Home → Event Detail Navigation | Clicking event card on Home navigates to event detail page | Click event card | Moved to `/event/[id]` page | PASS |
| 2 | Login Success | Enter correct credentials and login | Correct email/password | Redirected to Home page | PASS |
| 3 | Login Failure | Enter wrong credentials and attempt login | Wrong email/password | Error message shown, stays on login page | PASS |
| 4 | Move to Create User Form | Click "Create One" on login page | Click "Create One" link | User registration form displayed | PASS |
| 5 | Move to Organizer Registration | In user registration form, click "Move to organizer registration" | Click link | Redirected to `/org/register` page | PASS |
| 6 | Profile Page for Customer | Customer account profile shows only "Your Account" quick links | Logged-in as Customer | Only "Your Account" links shown | PASS |
| 7 | Profile Page for Organizer | Organizer account profile shows "Your Account" and "Event Management" quick links | Logged-in as Organizer | Both "Your Account" and "Event Management" links shown | PASS |
| 8 | Organizer Event List (/org/events) | Shows list of events linked to organizer | Access `/org/events` | Organizer's events listed | PASS |
| 9 | Upcoming Events (/org/upcoming) | Shows events within 1 month from today | Access `/org/upcoming` | Only future events within 1 month shown | PASS |
| 10 | Past Events (/org/previous) | Shows past events | Access `/org/previous` | Only past events shown | PASS |
| 11 | Organizer Statistics (/org/stats) | Shows charts and tables, changeable by duration/sort | Access `/org/stats` and interact | Chart and table update correctly | PASS |
| 12 | Ticket Scanner (/org/scan) | Select upcoming event and open camera | Access `/org/scan` | Upcoming events selectable, camera opens | PASS |
| 13 | Customer Order List (/customer/orders) | Displays purchased ticket list | Access `/customer/orders` | List of purchased tickets shown | PASS |
| 14 | Customer Upcoming Events (/customer/upcoming) | Shows tickets for events happening soon | Access `/customer/upcoming` | Upcoming event tickets listed | PASS |
| 15 | Event List (/event) | Shows public event list with filters and sorting | Access `/event` | Public events displayed, filtering/sorting works | PASS |
| 16 | Event Search (/event) | Search by keyword and show matching events | Input search word | Matched events shown | PASS |
| 17 | Event Detail Page (/event/[id]) | Displays event details by id | Access `/event/[id]` | Correct event data displayed | PASS |
| 18 | Logout Popup | Hover person icon → Show popup → Logout | Hover icon, click logout | Logged out successfully | PASS |

# Precondition
- Users and organizers are already registered in the system.
- Organizer has created events.
- Tickets are purchased by the customer account.

# Postcondition
- User is correctly logged in/logged out.
- Event-related pages reflect expected data based on time and user role.
- Sorting, searching, and filters are functional.

# Error Handling / Edge Cases
- Incorrect login shows appropriate error without redirect.
- No events available: Pages show fallback UI (e.g., "No events found").
- Organizer with no upcoming or past events: Displays empty list gracefully.
- Logout always resets session and redirects to login.

