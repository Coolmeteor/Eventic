import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import DefaultButton from "../DefaultButton"

// we use <style> tags, jest does not support this well. Throws css parse errors, and this is non-fatal error anyways so ignore it
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation((msg) => {
        if (typeof msg === 'string' && msg.includes('Could not parse CSS stylesheet')) {
            return;
        }
        console.log("Ignoring css error");
        // console.log("Ignoring css error", msg);
    });
});

afterAll(() => {
    jest.restoreAllMocks();
});


describe("DefaultButton tests", () => {
    test("Render regular button", () => {
        render(<DefaultButton>View more</DefaultButton>)
        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent("View more")
    })

    test("Render link button`", () => {
        render(<DefaultButton link={true} href="/yes">View more</DefaultButton>)
        const button = screen.getByRole("button")
        const link = screen.getByRole("link")
        expect(button).toBeInTheDocument()
        expect(link).toHaveAttribute("href", "/yes")
        expect(link).toHaveTextContent("View more")
    })

    test("Test onclick button", () => {
        const mockFn = jest.fn()
        render(<DefaultButton onClick={mockFn}>View more</DefaultButton>)
        const button = screen.getByRole("button")
        fireEvent.click(button)
        expect(mockFn).toHaveBeenCalledTimes(1)
    })
})
