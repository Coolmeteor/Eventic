# Backend Test Documentation

## Database
## Overview
This document describes how we validate our PostgreSQL schema, triggers, and helper functions.  
We use plain‐SQL test scripts executed via the `psql` CLI to ensure each constraint, trigger, and function behaves as expected.

## Objective
- **Unit Tests:** Verify individual schema elements (CHECKs, UNIQUEs, triggers, functions) in isolation.  
- **Seed Data Tests:** Confirm our seed scripts produce the expected volume and shape of data for front-end charts.

## Environment
- **Database:** PostgreSQL 13+  
- **CLI:** `psql` (version ≥ 13)  
- **Test Runner:**  
  - **Option 1 (plain SQL):** Run `psql --file=…/*.test.sql` and inspect PASS/FAIL in the test-docs  
  - **Option 2 (pgTAP):** Install [pgTAP](https://pgtap.org/) and run `pg_prove` over your `.sql` test files  