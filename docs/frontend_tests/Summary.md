# Frontend Test Documentation

## Overview

This document summarizes the unit testing practices and coverage in our React application project. All tests are written using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/), aiming to ensure UI component correctness, stability, and user interaction reliability.

## bjective

- Verify that each component behaves as expected under typical and edge-case scenarios.
- Ensure that any changes in logic do not unintentionally break the UI.
- Improve maintainability by documenting test structure clearly.

## Structure

- `unit_tests/components/` – Component-specific unit test documentation
- `unit_tests/utils/` – Utility function test documentation

---

# Unit Tests

## Component: PriceInput
### Description
### Unit Test Cases

| No. | Test Case Name              | Description                                                | Input Example         | Expected Output / Behavior              | Test Type       |
|-----|-----------------------------|------------------------------------------------------------|-----------------------|------------------------------------------|-----------------|
| 1   | Show initial values         | Renders input with initial `data` prop value               | `data=1500`           | Input shows "1500"                       | Render Test     |
| 2   | User input triggers setData | When user types, `setData` is called with updated value    | `user types "2000"`   | `setData` called with `2000`             | Event Handling  |
| 3   | Price formatting logic      | Typing formatted price string still sets correct number    | `"2,000.0505"`        | `setData` called with `2000.05`          | Formatting Test |
| 4   | formatPrice utility test    | Verifies `formatPrice()` formats various inputs correctly  | `"1,500.5"`           | `"1500.50"`                              | Unit Logic Test |

---

# Integration Tests

