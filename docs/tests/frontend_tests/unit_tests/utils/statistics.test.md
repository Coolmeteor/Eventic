# Test Cases for Utility Functions

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1 | sortStatsData name ascending | Sorts events by name in ascending order | Events with names "B Event", "A Event" | Sorted order: "A Event", "B Event" | PASS |
| 2 | sortStatsData sales descending | Sorts events by sales in descending order | Events with sales 1000, 2000 | Sorted order: 2000 → 1000 | PASS |
| 3 | FetchEventStats returns all stats | Fetch stats when duration is "all" | Mock fetch OK | Returns stats data | PASS |
| 4 | FetchEventStats returns duration stats | Fetch stats when duration is "threeMonths" | Mock fetch OK | Returns duration stats | PASS |
| 5 | FetchEventStats returns undefined on failure | Fetch fails | Mock fetch not OK | Returns undefined | PASS |
| 6 | FetchChart returns data on success | Fetch sales chart data | Mock fetch OK | Returns chart data array | PASS |
| 7 | FetchChart returns empty array on failure | Fetch fails | Mock fetch not OK | Returns empty array | PASS |
| 8 | FetchDailyChart returns data on success | Fetch daily chart data | Mock fetch OK | Returns chart data array | PASS |
| 9 | FetchDailyChart returns undefined on failure | Fetch fails | Mock fetch not OK | Returns undefined | PASS |
| 10 | FetchWeeklyChart returns data on success | Fetch weekly chart data | Mock fetch OK | Returns chart data array | PASS |
| 11 | FetchWeeklyChart returns undefined on failure | Fetch fails | Mock fetch not OK | Returns undefined | PASS |
| 12 | FetchOrgEvents returns all events | Fetch "all" events for organizer | Mock fetch OK | Returns events list | PASS |
| 13 | FetchOrgEvents returns upcoming events | Fetch "upcoming" events for organizer | Mock fetch OK | Returns upcoming events list | PASS |
| 14 | FetchOrgEvents returns previous events | Fetch "previous" events for organizer | Mock fetch OK | Returns previous events list | PASS |
| 15 | FetchOrgEvents returns undefined on failure | Fetch fails | Mock fetch not OK | Returns undefined | PASS |

# Precondition
- `global.fetch` is mocked for HTTP requests.
- `convertResponse` is mocked from `auth-api`.
- Sample event data is provided where needed for sorting tests.

# Postcondition
- Data is sorted correctly or returned based on fetch success.
- Undefined or empty array is returned when fetch fails.

# Error Handling / Edge Cases
- Fallback behavior (undefined or empty array) is tested for failed API calls.
- Sorting direction ("asc", "desc") correctness is verified.
