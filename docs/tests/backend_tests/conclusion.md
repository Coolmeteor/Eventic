## Test Coverage
- Constraints: Ensured that database constraints such as CHECK, UNIQUE, and foreign keys are properly enforced.

- Triggers: Verified that triggers like updated_at updates function correctly during insert, update, and delete operations.


## Known Issues

- **Constraint Violations**: The `tickets` table constraint to prevent negative pricing is working, but there are scenarios where invalid data might still be attempted for insertion.
- **Trigger Failures**: The trigger on the `updated_at` column does not always fire on updates due to a logic error in the trigger function, particularly in the case of multiple updates within the same transaction.
- **Data Type Mismatches**: There are occasional issues with inserting data that doesn’t match the expected precision for numeric fields.
- **SQL Syntax Errors**: Some older test cases have been found to have syntax errors, particularly with missing semicolons in multi-line SQL statements.

## Authors
ZhanPing Zhou(zz19mg@brocku.ca 6854830)