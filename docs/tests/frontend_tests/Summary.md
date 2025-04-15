# Frontend Test Documentation

## Overview

This document summarizes the unit testing practices and coverage in our React application project. All tests are written using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/), aiming to ensure UI component correctness, stability, and user interaction reliability.

## Objective

- Verify that each component behaves as expected under typical and edge-case scenarios.
- Ensure that any changes in logic do not unintentionally break the UI.
- Improve maintainability by documenting test structure clearly.

## Environment

- Frontend Framework: React
- Language: TypeScript
- Testing Framework: Jest, @testing-library/react
- Date: ******************************************

## Unit Tests

### Unit: RegisterForm

#### Test Cases

| No. | Test Case Name              | Description                                                | Input Example         | Expected Output / Behavior              | Status       |
|-----|-----------------------------|------------------------------------------------------------|-----------------------|------------------------------------------|-----------------|
| 1   | All input fields exist | Input fields for email, username, password, and confirmPassword should be rendered in the component |  No input  | All input fields exist | PASS |
| 2   | Price formatting logic      | Typing formatted price string still sets correct number    | `"2,000.0505"`        | `setData` called with `2000.05`          | PASS  |
| 3   | formatPrice utility test    | Verifies `formatPrice()` formats various inputs correctly  | `"1,500.5"`           | `"1500.50"`                              | FAILED   |

### Unit: PriceInput

#### Test Cases

| No. | Test Case Name              | Description                                                | Input          | Expected Output / Behavior              | Status |
|-----|-----------------------------|------------------------------------------------------------|-----------------------|------------------------------------------|-------|
| 1   | Show initial values         | Renders input with initial `data` prop value               | `data=1500`           | Input shows "1500"                       | PASS |
| 2   | User input triggers setData | When user types, `setData` is called with updated value    | `user types "2000"`   | `setData` called with `2000`             | PASS |
| 3   | Price formatting logic      | Typing formatted price string still sets correct number    | `"2,000.0505"`        | `setData` called with `2000.05`          | PASS |
| 4   | formatPrice utility test    | Verifies `formatPrice()` formats various inputs correctly  | `"1,500.5"`           | `"1500.50"`                              | PASS |

## Test Coverage
Write down the test converage percentage from the testing framework. For example:
```markdown
Unit Test Coverage (from Jest):
- Statements: 93%
- Branches: 87%
- Functions: 95%
- Lines: 93%
```

## Known Issues
Describe not tested/not fixed issues. For example:
```markdown
- Toast messages occasionally overlap on small screens
- Delay in error rendering due to debounce (to be fixed)
```

## Authors
Names whose worked on the frontend testing.

