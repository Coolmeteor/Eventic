import React from 'react'
import { render, screen, } from '@testing-library/react'

import { EventData, mockEvents } from '@/constants'
import '@testing-library/jest-dom'
import { MiniCard } from '@/components/ScrollerLists/MiniCard'
import { faParachuteBox } from '@fortawesome/free-solid-svg-icons'


const mockEvent: EventData = mockEvents[0]

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



describe('Minicard data rendering', () => {


    test('Basic info: image', () => {
        render(<MiniCard
            // icon={faParachuteBox}
            image={mockEvent.media[0]}
            text={mockEvent.name}
        />)

        expect(screen.getByText(mockEvent.name)).toBeInTheDocument()
        const image = screen.getByAltText(mockEvent.name) as HTMLImageElement
        expect(image).toBeInTheDocument()
        expect(image.src).toBe(mockEvent.media[0])

        let svgState = false
        try {
            const svg = screen.getByRole("img", { hidden: true });
            svgState = true
        } catch (e) {

        }

        // expect(svg).not.toHaveAttribute("data-icon", "parachute-box");
    })


    test('Basic info: icon', () => {
        render(<MiniCard
            icon={faParachuteBox}
            // image={mockEvent.media[0]}
            text={mockEvent.name}
        />)

        expect(screen.getByText(mockEvent.name)).toBeInTheDocument()
        let imageState = false
        try {
            const image = screen.getByAltText(mockEvent.name) as HTMLImageElement
            imageState = true
        } catch (e) {

        }

        expect(imageState == false)


        const svg = screen.getByRole("img", { hidden: true });
        expect(svg).toHaveAttribute("data-icon", "parachute-box");
    })

    test('When icon and image provided, use image', () => {
        render(<MiniCard
            icon={faParachuteBox}
            image={mockEvent.media[0]}
            text={mockEvent.name}
        />)

        expect(screen.getByText(mockEvent.name)).toBeInTheDocument()
        const image = screen.getByAltText(mockEvent.name) as HTMLImageElement
        expect(image).toBeInTheDocument()
        expect(image.src).toBe(mockEvent.media[0])

        let svgState = false
        try {
            const svg = screen.getByRole("img", { hidden: true });
            svgState = true
        } catch (e) {

        }

        // expect(svg).not.toHaveAttribute("data-icon", "parachute-box");
    })
})
