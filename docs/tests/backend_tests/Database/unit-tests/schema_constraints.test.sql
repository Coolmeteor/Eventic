-- Test Prevent Negative Ticket Pricing (Constraint)
INSERT INTO tickets(pricing) VALUES(-5.00); -- Expect error: violates check constraint "tickets_price_chk"

-- Test Unique User Email (Constraint)
INSERT INTO users(user_name,email,passwd_hash) VALUES('user1','a@x.com','password1');
INSERT INTO users(user_name,email,passwd_hash) VALUES('user2','a@x.com','password2'); -- Expect error: duplicate key value violates unique constraint "users_email_key"

-- Test Start Date < End Date (Constraint)
INSERT INTO events(name,start_date,end_date) VALUES('Event','2025-05-01','2025-04-30'); -- Expect error: violates check constraint "chk_dates_valid"

-- Test Latitude and Longitude Range (Constraint)
INSERT INTO events(name,start_date,end_date,location_lat,location_long)
VALUES('Event','2025-05-01','2025-05-02',100.0,200.0); -- Expect error: violates check constraint "chk_lat_long"

-- Test `created_at` Default to NOW() (Constraint)
INSERT INTO events(name,start_date,end_date) VALUES('Event','2025-05-01','2025-05-02');
SELECT created_at FROM events WHERE name='Event'; -- Expect `created_at` to be close to NOW()

-- Test Trigger to Update `updated_at` (Trigger)
UPDATE events SET name='Updated Event' WHERE id=1;
SELECT updated_at FROM events WHERE id=1; -- Expect `updated_at` to be greater than its previous value

-- Test Case: Audit DELETE operations
DELETE FROM events WHERE id=1;
SELECT op, tbl FROM audit_log ORDER BY changed_at DESC LIMIT 1;



