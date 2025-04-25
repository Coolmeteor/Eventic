# Test Cases for `LoadingMessage` Component

| No. | Test Case Name | Description | Input | Expected Output / Behavior | Status |
|-----|----------------|-------------|-------|----------------------------|--------|
| 1   | Renders initial message | Ensures component renders base text without dots initially | `<LoadingMessage>Loading</LoadingMessage>` | Displays "Loading" without trailing dots | PASS |
| 2   | Cycles dot animation | Simulates time passage to show progressive dot animation | advanceTimersByTime(500×n) | Renders "Loading", "Loading.", "Loading..", "Loading...", etc | PASS |
| 3   | Supports custom dot limit | Accepts a prop to modify max number of dots | `<LoadingMessage maxDotNum={5}>Please wait</LoadingMessage>` | Shows "Please wait....." after appropriate interval | PASS |
| 4   | Clears interval on unmount | Checks that interval timer is cleaned up on component unmount | Render → Unmount | `clearInterval()` is called | PASS |

# Precondition
- Jest fake timers (`jest.useFakeTimers()`) are enabled for time simulation.
- Component renders a message and adds dots in intervals of 500ms.

# Postcondition
- The dot count loops based on `maxDotNum`.
- Intervals are cleared properly to avoid memory leaks.

# Error Handling / Edge Cases
- Validates cleanup behavior on unmount.
- Verifies the dot sequence resets after reaching `maxDotNum`.
