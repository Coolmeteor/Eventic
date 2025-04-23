# ⚠️ Important Notes
- Do **NOT** edit `Summary.md` directly. Any modification in `Summary.md` is disappeared.
- Do **NOT** change the layout of `.test.md` files individually. Use the template provided below, or to discuss to change it.
- If you need to adjust the structure or format, **discuss in our Discord first.**
- Always run `node scripts/generate-summary.js` from the project root if you want to test locally.

# How to Write Test Document
## Write them as markdown files.
All test documents should be written in Markdown (`.md`) format.  
Markdown is easy to format and can be easily converted to LaTeX or PDF.  

For frontend tests, use the `frontend_tests/` folder.  
For backend tests, use the `backend_tests/` folder.  

To keep things organized, try to mirror the structure of the original source folders.  
For example:
- Use a `components/` folder inside `frontend_tests/unit_tests/`  
- Use an `api/` folder inside `backend_tests/unit_tests/`

## How to write .test.md file for each components
You only need to write `.test.md` files for each individual component or function.  
For example:
```bash
|-frontend_tests/
 |-unit_tests/
  |-components/
   |-Event/
    |-PriceInput.test.md <-- Not .md
    |-***.test.md
```
A template for `.test.md` files has been provided below. You can also check `docs/tests/backendTemplate.test.md` and `docs/tests/frontendTemplate.test.md`.
To keep the documentation consistent, do not modify the layout individually.
If you need to change the format, please discuss it in our Discord chat.

```markdown
# Test Cases
| No. | Test Case Name              | Description                                               | Input               | Expected Output / Behavior      | Status |
| --- | --------------------------- | --------------------------------------------------------- | ------------------- | ------------------------------- | ------ |
| 1   | Show initial values         | Renders input with initial `data` prop value              | `data=1500`         | Input shows "1500"              | PASS   |
| 2   | User input triggers setData | When user types, `setData` is called with updated value   | `user types "2000"` | `setData` called with `2000`    | PASS   |
| 3   | Price formatting logic      | Typing formatted price string still sets correct number   | `"2,000.0505"`      | `setData` called with `2000.05` | PASS   |
| 4   | formatPrice utility test    | Verifies `formatPrice()` formats various inputs correctly | `"1,500.5"`         | `"1500.50"`                     | PASS   |

# Precondition *(if needed)*
- `data` prop is provided to the component.
- Component is rendered inside a form container.


# Postcondition *(if needed)*
- `setData()` is called with updated value.
- The form state reflects the new price value.


# Error Handling / Edge Cases
- Invalid price inputs like `abc`, `-100`, `0` should be rejected.
- Handles paste input such as `"$1,500"` correctly.
```

Just like tables in LaTeX, you do not need to align the vertical lines visually.
As long as the number of columns (`|`) is consistent across the header and rows, the layout will render properly.

All `.test.md` files inside the `frontend_tests/` and `backend_tests/` directories are automatically compiled into `frontend_tests/Summary.md` and `backend_tests/Summary.md` when you push to the repository.
If Summary.md files are not updated on the remote repository, you can use GitHub Actions action, named 'Generate Summary' in our GitHub page.

If you want to preview the generated `Summary.md` locally, run the following command from the ***project root***:
```bash
node scripts/generate-summary.js
```

## What is needed to do other than writing .test.md files for each unit?
In addition to creating, `.test.md` files for each unit/component, please make sure to update the following documents:
- `overview.md` – Describe the general testing objectives, tools used, and file structure.
- `conclusion.md` – Summarize key findings, uncovered issues, and final impressions about the tests.

These files help provide context and conclusions that tie all the individual tests together.  
Make sure they are up to date before final submission.