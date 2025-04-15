# Test Cases

| No. | Test Case Name          | Description                                 | Input       | Expected Output / Behavior                 | Status |
|-----|-------------------------|---------------------------------------------|-------------|--------------------------------------------|--------|
| 1   | Get all events          | Retrieves a list of all events              | GET /events | 200 OK + JSON array of event objects       | PASS   |
| 2   | Data error fallback     | Handles unexpected non-list return          | GET /events | 500 error with message `"data error"`      | PASS   |


# Precondition *(if needed)*

- Events exist in the database table `events`
- DB connection is available


# Postcondition *(if needed)*

- No DB updates are made
- Connection is closed after query


# Error Handling / Edge Cases

- If `get_all_events()` returns a non-list (e.g. `int`, `None`), return 500
- If DB is down, Flask will handle with generic 500 unless otherwise handled