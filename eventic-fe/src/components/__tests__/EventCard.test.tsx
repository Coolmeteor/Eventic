import React from 'react'
import { render, screen, fireEvent, getByTestId } from '@testing-library/react'

import { EventData, mockEvents } from '@/constants'
import '@testing-library/jest-dom'
import { EventCard } from '../EventCard'


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


/**
 * Test for component data rendering 
 */
describe('EventCard data rendering', () => {
    /**
     * Event basic content: name, location, description
     */
    test('Event name, location, description, date', () => {
        // large is not a prop currently being used
        render(<EventCard large={false} event={mockEvent} />)

        expect(screen.getByText(mockEvent.pricing)).toBeInTheDocument()
        expect(screen.getByText(mockEvent.name)).toBeInTheDocument()
        expect(screen.getByText(mockEvent.description)).toBeInTheDocument()
        expect(screen.getByText(mockEvent.location_string)).toBeInTheDocument()
        expect(screen.getByText(`${new Date(mockEvent.start_date).toLocaleDateString()} — ${new Date(mockEvent.start_date).toLocaleDateString()}`)).toBeInTheDocument()
    })

    /**
     * Event card background image
     */
    test('Check image and alt text', () => {
        const { container } = render(
            <EventCard large={false} event={mockEvent} />
        )
        // afetr image got changed to background
        let imageStyle = `background-image: linear-gradient(to top, rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0) 35%, rgba(0, 0, 0, 0.09) 50%, rgba(0, 0, 0, 0.61) 90%, rgba(0, 0, 0, 0.8) 100%),
                    url(${mockEvent.media[0]});`
        expect(container.querySelector(".top")).toHaveStyle(imageStyle);

        // before, when image was a janky overlay
        // const image = screen.getByAltText(mockEvent.name) as HTMLImageElement
        // expect(image).toBeInTheDocument()
        // expect(image.src).toBe(mockEvent.media[0])
    })


    /**
     * Check if button-link is correctly rendered if button is specified
     */
    test('Render button-link: Prop IS passed', () => {
        render(
            <EventCard
                large={false}
                event={mockEvent}
                btn={{ href: `/event/${mockEvent.id}`, text: "View more" }}
            />
        )
        expect(screen.queryByText(/view more/i)).toBeInTheDocument()
        expect(screen.getByText(/view more/i).closest('a')).toHaveAttribute('href', `/event/${mockEvent.id}`)
    })

    /**
     * Check if button does not render
     */
    test('Render button: NO prop passed', () => {
        render(
            <EventCard
                large={false}
                event={mockEvent}
            />
        )
        expect(screen.queryByText("View More")).toBeNull()
    })

})
