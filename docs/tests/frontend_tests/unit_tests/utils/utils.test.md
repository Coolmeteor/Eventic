# Test Cases for Utility Functions

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1 | Return correct icon for matching category | Returns icon matching input category exactly | "Music" | Icon with `iconName: "music"` | PASS |
| 2 | Case insensitive matching | Returns correct icon even if input case differs | "art" | Icon with `iconName: "paint-brush"` | PASS |
| 3 | Return default icon if no match | Returns default icon when no category matches | "Unknown Category" | Icon with `iconName: "question-circle"` | PASS |

# Precondition
- `eventCategoriesWithIcons` mock is provided:
  - "Music" → "music" icon
  - "Art" → "paint-brush" icon
  - Default → "question-circle" icon

# Postcondition
- Correct icon object is returned based on category name, case-insensitive.

# Error Handling / Edge Cases
- If no category matches, the default icon (`question-circle`) is safely returned.
