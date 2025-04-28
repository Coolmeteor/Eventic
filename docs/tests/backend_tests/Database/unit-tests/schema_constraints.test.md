# Test Cases for schema constraints

| No. | Test Case Name | Description | SQL / Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------------|----------------------------|--------|
| 1 | Prevent negative ticket price   | Ensure pricing is non-negative | ```sql INSERT INTO tickets(pricing) VALUES(-5.00);``` | `ERROR: violates check constraint "tickets_price_chk"` | PASS |
| 2 | Unique user email | Prevent users from having the same email | ```sql
INSERT INTO users(user_name,email,passwd_hash) VALUES('user1','a@x.com','password1');
INSERT INTO users(user_name,email,passwd_hash) VALUES('user2','a@x.com','password2');
``` `| `ERROR: duplicate key value violates unique constraint "users_email_key"` | PASS |
| 3 | Start date < End date | Ensure start date is before end date | ```sql INSERT INTO events(name,start_date,end_date) VALUES('Event','2025-05-01','2025-04-30');``` | `ERROR: new row for relation "events" violates check constraint "chk_dates_valid"` | PASS |
| 4 | Latitude and Longitude range | Ensure location lat/long are within bounds | ```sql INSERT INTO events(name,start_date,end_date,location_lat,location_long)
VALUES('Event','2025-05-01','2025-05-02',100.0,200.0);``` `| `ERROR: new row for relation "events" violates check constraint "chk_lat_long"` | PASS |
| 5 | `created_at` default to NOW() | Ensure `created_at` defaults to the current timestamp | ```sql
INSERT INTO events(name,start_date,end_date) VALUES('Event','2025-05-01','2025-05-02');
SELECT created_at FROM events WHERE name='Event';
``` `| `created_at` is NOT NULL and close to NOW() | PASS |
| 6 | Trigger to update `updated_at` | Ensure `updated_at` gets updated on any update | ```sql
UPDATE events SET name='Updated Event' WHERE id=1;
SELECT updated_at FROM events WHERE id=1;
``` `| `updated_at` is greater than its previous value | PASS |
| 7 | Audit DELETE operations | Ensure every DELETE operation is logged in `audit_log` | ```sql DELETE FROM events WHERE id=1;
SELECT op, tbl FROM audit_log ORDER BY changed_at DESC LIMIT 1;``` | (op, tbl) should return ('DELETE', 'events') | PASS |

## Preconditions
- The `events`, `users`, and `tickets` tables exist in the test database.
- Constraints like `CHECK`, `UNIQUE`, and foreign keys are active.
- Relevant triggers (e.g., `updated_at`) are properly configured.
- Test data has been seeded into relevant tables.

## Postconditions
- After the test completes, the relevant data should be correctly inserted/updated/deleted.
- Constraints should correctly reject any invalid data.
- Trigger functions should fire correctly, such as updating the `updated_at` field.

## Error Handling / Edge Cases
- Trying to insert a ticket with a negative price should raise an error due to the `CHECK` constraint.
- Inserting an event where the start date is later than the end date should raise an error due to the `chk_dates_valid` constraint.
- Updating a ticket with an invalid user ID should raise a foreign key violation error.
