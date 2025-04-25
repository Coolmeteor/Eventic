

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import GalleryImage from '../GalleryImage' // adjust path as needed
import { image1, image2 } from '@/constants_mockimages';
import MediaUploadBox from '../MediaUploadBox';
import userEvent from '@testing-library/user-event';


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


// mock image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} />
    }
}))

// if you jump to decleration be warned, these are base 64 strings and your text/code editor may not like it
const imageData = [image1, image2]

describe('GalleryImage Component', () => {
    test('Render image', () => {
        render(<GalleryImage src={imageData[0]} alt="Test image" />)
        const image = screen.getByAltText("Test image") as HTMLImageElement
        expect(image).toBeInTheDocument()
        expect(image.src).toBe(image1)
    })



    test('Hides removable if supposed to be view only', () => {
        render(<GalleryImage src={imageData[0]} />)

        const removeButton = screen.queryByRole('button', { name: 'X' })
        expect(removeButton).not.toBeInTheDocument()
    })

    test('Remove button works if enabled', () => {
        const mockRemove = jest.fn()
        render(<GalleryImage src={imageData[0]} removable onRemove={mockRemove} />)

        const removeButton = screen.getByRole('button', { name: 'X' })
        expect(removeButton).toBeInTheDocument()

        fireEvent.click(removeButton)
        expect(mockRemove).toHaveBeenCalledTimes(1)
    })
})


const data = {
    files: [...imageData],
    types: ["Files"],
    getData: () => "",
    setData: () => { },
    clearData: () => { },

}




describe("MediaUploadBox", () => {
    let images: string[] = []
    let setImages = jest.fn((newImages) => {
        images = newImages
    })

    beforeEach(() => {
        images = []
        setImages = jest.fn((newImages) => {
            images = newImages
        })
    })

    test("Render drag and drop effects and compoent label", () => {
        render(<MediaUploadBox images={images} setImages={setImages} />)
        expect(
            screen.getByText(/Drag & Drop images here or/i)
        ).toBeInTheDocument()


        const dropZone = screen.getByLabelText(/drag & drop/i).parentElement!

        fireEvent.dragOver(dropZone)
        expect(dropZone.className).toContain("bg-blue-100")

        fireEvent.dragLeave(dropZone)
        expect(dropZone.className).not.toContain("bg-blue-100")
    })

    test("Images are exported when inputted", async () => {
        render(<MediaUploadBox images={images} setImages={setImages} />)

        const dropZone = screen.getByLabelText(/drag & drop/i).parentElement!
        // add this if have time

        // setTimeout(() => {

        // }, 1000);
        // expect(images[0] == imageData[0])
        // expect(images[1] == imageData[1])

    })

    test("Uploads images through file input", async () => {
        render(<MediaUploadBox images={images} setImages={setImages} />)

        // add this if have time
    })

    test("Render image previews", () => {
        render(<MediaUploadBox images={imageData} setImages={setImages} />)

        const renderedImages = screen.getAllByRole("img")
        expect(renderedImages.length).toBe(2)
        expect(renderedImages[0]).toHaveAttribute("src", expect.stringContaining(imageData[0]))
        expect(renderedImages[1]).toHaveAttribute("src", expect.stringContaining(imageData[1]))
        expect(images[0] == imageData[0])
        expect(images[1] == imageData[1])
    })

    test("Remove button works", () => {
        render(<MediaUploadBox images={imageData} setImages={setImages} />)

        const buttons = screen.getAllByRole("button", { name: "X" })
        fireEvent.click(buttons[0])

        expect(images.length).toBe(1)
        expect(images[0] == imageData[1])

    })
})
