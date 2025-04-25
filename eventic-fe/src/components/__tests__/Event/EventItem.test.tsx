import { render, screen, fireEvent } from "@testing-library/react";
import { EventItem } from "@/components/Event/EventItem";
import { EventItemProps } from "@/utils/event";

const mockEventItemProps: EventItemProps = {
    isSimple: false,
    name: "Test Event",
    thumbnail: "https://example.com/image.jpg",
    date: new Date(2025, 4, 1).getTime(),
    location: "Toronto",
    description: "",
    id: 123,
};


describe("EventItem", () => {
    // Override 'window.location'
    beforeAll(() => {
        Object.defineProperty(window, 'location', {
            value: {
                href: '',
            },
            writable: true,
        });
    });

    test("Renders name and thumbnail", () => {
        render(<EventItem {...mockEventItemProps} isSimple={false} />);
        expect(screen.getByText("Test Event")).toBeInTheDocument();
        expect(screen.getByAltText("Thumbnail")).toHaveAttribute("src", mockEventItemProps.thumbnail);
    });

    test("Does not show detail info in simple mode", () => {
        render(<EventItem {...mockEventItemProps} isSimple={true} />);
        expect(screen.queryByText("Toronto")).not.toBeInTheDocument();
        expect(screen.queryByText(new Date(mockEventItemProps.date).toDateString())).not.toBeInTheDocument();
    });

    test("Shows date and location when isSimple is false", () => {
        render(<EventItem {...mockEventItemProps} isSimple={false}/>);
        // Use lambda expression for <a> element
        expect(screen.getByText("Toronto")).toBeInTheDocument();
        expect(screen.getByText(new Date(mockEventItemProps.date).toDateString())).toBeInTheDocument();
    });

    test("Navigates to event detail on image click", () => {
        render(<EventItem {...mockEventItemProps} isSimple={false}/>);
        fireEvent.click(screen.getByRole("button"));

        expect(window.location.href).toBe("/event/123");
    });
});
