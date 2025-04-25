import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import DefaultButton from "../DefaultButton"

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
