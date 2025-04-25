import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TagEditor from "../TagEditor" // adjust path as needed


// we use <style> tags, jest does not support this well. Throws css parse errors, and this is non-fatal error anyways so ignore it
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation((msg) => {
        if (typeof msg === 'string' && msg.includes('Could not parse CSS stylesheet')) {
            return
        }
        // console.log("Ignoring css error")
        // console.log("Ignoring css error", msg)
    })
})

afterAll(() => {
    jest.restoreAllMocks()
})

let mockInitialTags = ["tag1", "tag2", "tag3"]

describe("TagEditor tests", () => {

    // type ImageDropBoxProps = {
    //     tags: string[];
    //     setTags: (files: string[]) => void;
    // }

    let mockTags: string[] = []
    let setTags = jest.fn((newTags: string[]) => {
        mockTags = newTags
    })

    // reset tags
    beforeEach(() => {
        mockTags = []
        setTags = jest.fn((newTags: string[]) => {
            mockTags = newTags
        })
    })

    test("Render component", () => {
        render(<TagEditor tags={[]} setTags={setTags} />)
        expect(screen.getByText(/Enter tags here/i)).toBeInTheDocument()
        expect(screen.getByRole("textbox")).toBeInTheDocument()
    })

    test("Test inputing tags", async () => {
        render(<TagEditor tags={[]} setTags={setTags} />)

        const input = screen.getByRole("textbox")

        // comma and enter after every tag
        await userEvent.type(input, "meow,miaw{enter}")
        expect(JSON.stringify(mockTags) == JSON.stringify(["meow", "miaw"]))

        await userEvent.type(input, "nya{enter}myaaa{enter}")
        expect(JSON.stringify(mockTags) == JSON.stringify(["meow", "miaw", "nya", "myaaa"]))
    })

    test("Empty and blank tag inputs", async () => {
        render(<TagEditor tags={[]} setTags={setTags} />)
        const input = screen.getByRole("textbox")
        await userEvent.type(input, "{enter}")
        await userEvent.type(input, " {enter}")

        expect(JSON.stringify(mockTags) == JSON.stringify([]))
    })



    test("Test inputing tags given initial tags", async () => {
        render(<TagEditor tags={mockInitialTags} setTags={setTags} />)
        const input = screen.getByRole("textbox")

        // check if only initial, when when inputing if it adds in order after
        expect(JSON.stringify(mockTags) == JSON.stringify(mockInitialTags))

        await userEvent.type(input, "meow,miaw{enter}")
        expect(JSON.stringify(mockTags) == JSON.stringify([...mockInitialTags, "meow", "miaw"]))
    })

    test("Ignoring duplicate tags", async () => {
        render(<TagEditor tags={mockInitialTags} setTags={setTags} />)
        const input = screen.getByRole("textbox")

        // check if only initial, when when inputing if it adds in order after
        expect(JSON.stringify(mockTags) == JSON.stringify(mockInitialTags))

        await userEvent.type(input, "tag1{enter}")
        expect(JSON.stringify(mockTags) == JSON.stringify(mockInitialTags))
        await userEvent.type(input, "meow{enter}")
        expect(JSON.stringify(mockTags) == JSON.stringify([...mockInitialTags, "meow"]))
    })


    test("Remove button", () => {
        render(<TagEditor tags={mockInitialTags} setTags={setTags} />)

        const tag = screen.getByText("tag2")
        const removeButton = tag.closest("button") || tag.parentElement?.querySelector("button")

        expect(removeButton).toBeInTheDocument()
        fireEvent.click(removeButton!)

        expect(JSON.stringify(mockTags) == JSON.stringify(["tag1", "tag3"]))
    })
})
