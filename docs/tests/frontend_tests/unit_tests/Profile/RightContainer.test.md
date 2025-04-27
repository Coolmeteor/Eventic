# Test Cases

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Renders breadcrumbs and children | Displays breadcrumb with page name and renders child components | `pageName="Edit Info"` | Shows "Profile -> Edit Info" and the child element text | PASS |
| 2   | Navigates to profile on breadcrumb | Click on breadcrumb navigates to profile | Click on "Profile" link | Calls `router.push` with "/profile" | PASS |

# Precondition
- Component receives `pageName` prop and valid `children`.
- `useRouter` is mocked to return a `push` function.

# Postcondition
- Correct breadcrumb text is shown.
- Navigation is triggered when "Profile" is clicked.

# Error Handling / Edge Cases
- None tested in this case. Possible future tests could handle invalid router or missing props.
