# Summary
This document outlines the unit tests for the database schema of the Event Management System. The tests validate the core components of the database, including constraints, triggers.

# Test Coverage:
- Schema Constraints: Ensured that data integrity rules are enforced through CHECK constraints (e.g., preventing negative pricing), UNIQUE constraints (e.g., preventing duplicate emails), and other custom rules such as the correct date order for events.

# Execution:
- The tests were executed using plain SQL scripts, with psql used to interact with the PostgreSQL test database.

- Test results were monitored to ensure that all schema constraints and triggers behaved as expected.

# Expected Outcomes:
- Constraints correctly reject invalid data (e.g., negative pricing, duplicate emails).

- Triggers correctly update the updated_at field and log changes in the audit_log table.

- Functions return correct data, such as event statistics within a given date range.

# Status:
- All tests are expected to pass when executed against a correctly configured test database. If any test fails, the schema or triggers should be revised to meet the expected behavior.

