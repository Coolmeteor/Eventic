
import { render, screen, } from '@testing-library/react'

import '@testing-library/jest-dom'
import InputMultiLine from '../InputMultiLine'
import userEvent from '@testing-library/user-event'



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




describe('Multiline input component text typing functionaliy', () => {
    /**
     * Only minimum props are passed
     */
    test('Functionality with minimum props', async () => {
        let text = ""
        render(<InputMultiLine onChange={(e) => {
            text = e.target.value
        }} />)

        // check textbox is there and it blank
        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByRole("textbox")).toHaveValue("")
        expect(screen.getByRole("textbox")).toHaveAttribute("rows", "2")


        // check if textbox works to export the content
        let string = "the cat jumps over the moon, and lands in the pacific ocean"
        const input = screen.getByRole("textbox") as HTMLTextAreaElement

        await userEvent.clear(input);
        await userEvent.type(input, string);

        expect(screen.getByRole("textbox")).toHaveValue(string)
        expect(text).toBe(string)

    })

    /**
     * User adds stuff to the input
     */
    test('Adding onto inital value', async () => {
        let text = ""

        let iniVal = "the math exam was very difficult"
        render(<InputMultiLine initialValue={iniVal} onChange={(e) => {
            text = e.target.value
        }} />)


        // check textbox for initial val
        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByRole("textbox")).toHaveValue(iniVal)
        expect(screen.getByRole("textbox")).toHaveAttribute("rows", "2")


        // check if textbox works to export the content
        let string = "the cat jumps over the moon, and lands in the pacific ocean"
        const input = screen.getByRole("textbox") as HTMLTextAreaElement

        // await userEvent.clear(input);
        await userEvent.type(input, string);


        expect(text).toBe(iniVal + string)
        expect(screen.getByRole("textbox")).toHaveValue(iniVal + string)

    })

    /**
     * User types multiline content
     */
    test('Multi line user typing ', async () => {
        let text = ""
        render(<InputMultiLine onChange={(e) => {
            text = e.target.value
        }} />)

        // check textbox is there and it blank
        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByRole("textbox")).toHaveValue("")
        expect(screen.getByRole("textbox")).toHaveAttribute("rows", "2")


        // check if textbox works to export the content
        let string = "the cat jumps over the moon, and lands in the pacific ocean"
        const input = screen.getByRole("textbox") as HTMLTextAreaElement

        await userEvent.clear(input);
        await userEvent.type(input, string);
        await userEvent.type(input, "{enter}");
        await userEvent.type(input, "MIAW.");
        await userEvent.type(input, "{enter}");
        await userEvent.type(input, "{enter}");
        await userEvent.type(input, "{enter}");
        await userEvent.type(input, "{enter}");
        await userEvent.type(input, "Final line here");

        expect(screen.getByRole("textbox")).toHaveValue(string + "\nMIAW.\n\n\n\nFinal line here")
        expect(text).toBe(string + "\nMIAW.\n\n\n\nFinal line here")
        expect(screen.getByRole("textbox")).toHaveAttribute("rows", "2")


    })


})

describe('Multiline input component extra functionality', () => {
    /**
     * Check if enter key works
     */
    test('Enter key functionality', async () => {
        let text = ""
        let enterKeyIsHit = false
        render(<InputMultiLine
            onChange={(e) => {
                text = e.target.value
            }} onEnterPress={(e) => {
                enterKeyIsHit = true
            }}
        />)

        expect(enterKeyIsHit).toBe(false)

        // send enter to the textbox
        const input = screen.getByRole("textbox") as HTMLTextAreaElement
        await userEvent.type(input, "{enter}");



        expect(enterKeyIsHit).toBe(true)
    })



    test('Default lines', async () => {
        let text = ""
        render(<InputMultiLine
            onChange={(e) => {
                text = e.target.value
            }} defaultLines={4}
        />)

        expect(screen.getByRole("textbox")).toHaveAttribute("rows", "4")

    })

    test('Textarea expands as user types ', async () => {
        let text = ""
        render(<InputMultiLine defaultLines={3} onChange={(e) => {
            text = e.target.value
        }} />)

        // check textbox is there and it blank
        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByRole("textbox")).toHaveValue("")
        expect(screen.getByRole("textbox")).toHaveAttribute("rows", "3")


        // check if textbox works to export the content
        let string = "the cat jumps over the moon, and lands in the pacific ocean"
        const input = screen.getByRole("textbox") as HTMLTextAreaElement

        await userEvent.clear(input);
        await userEvent.type(input, string);
        await userEvent.type(input, "{enter}");
        await userEvent.type(input, "MIAW.");
        await userEvent.type(input, "{enter}");
        await userEvent.type(input, "{enter}");
        await userEvent.type(input, "{enter}");
        await userEvent.type(input, "{enter}");
        await userEvent.type(input, "Final line here");

        expect(screen.getByRole("textbox")).toHaveAttribute("rows", "3")
        

    })

})
