import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import { EventData, mockEvents } from '@/constants'
import '@testing-library/jest-dom'
import EventCard from '../EventCard'


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

        expect(screen.getByText(mockEvent.name)).toBeInTheDocument()
        expect(screen.getByText(mockEvent.description)).toBeInTheDocument()
        expect(screen.getByText(mockEvent.location_string)).toBeInTheDocument()
        expect(screen.getByText(`${new Date(mockEvent.start_date).toLocaleDateString()} — ${new Date(mockEvent.start_date).toLocaleDateString()}`)).toBeInTheDocument()
    })

    /**
     * Event card background image
     */
    test('Check image and alt text', () => {
        render(<EventCard large={false} event={mockEvent} />)
        const image = screen.getByAltText(mockEvent.name) as HTMLImageElement
        expect(image).toBeInTheDocument()
        expect(image.src).toBe(mockEvent.media[0])
    })


    /**
     * Check if button is correctly rendered if button is specified
     */
    test('Render button: Prop IS passed', () => {
        render(
            <EventCard
                large={false}
                event={mockEvent}
                btn={{ text: "View More", click: jest.fn() }}
            />
        )
        expect(screen.queryByText("View More")).toBeInTheDocument()
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

    /**
     * Button click
     */
    test('Button click', () => {
        const handleClick = jest.fn()
        render(
            <EventCard
                large={false}
                event={mockEvent}
                btn={{ text: "View More", click: handleClick }}
            />
        )

        const button = screen.getByText("View More")
        fireEvent.click(button)
        expect(handleClick).toHaveBeenCalled()
    })
})
