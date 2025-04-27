import { render, screen } from "@testing-library/react";
import { HorizontalEventList } from "@/components/ScrollerLists/HoritonalEventList";
import { EventItemProps } from "@/utils/event";
jest.mock("@/components/Event/EventItem", () => ({
    EventItem: ({ name }: any) => <div>{name}</div>,
}));

const mockEvents: EventItemProps[] = [
    {
        id: 1,
        name: "Sample Event 1",
        thumbnail: "thumbnail1.jpg",
        description: "Description 1",
        date: new Date(2025, 5, 1).getTime(),
        location: "Location 1",
    },
    {
        id: 2,
        name: "Sample Event 2",
        thumbnail: "thumbnail2.jpg",
        description: "Description 2",
        date: new Date(2025, 6, 1).getTime(),
        location: "Location 2",
    },
];

describe("HorizontalEventList", () => {
    it("Renders the title", () => {
        render(<HorizontalEventList title="Upcoming Events" EventCards={mockEvents} />);
        expect(screen.getByText("Upcoming Events")).toBeInTheDocument();
    });

    it("Renders all event cards", () => {
        render(<HorizontalEventList title="Events" EventCards={mockEvents} />);
        
        expect(screen.getByText(/Sample Event 1/)).toBeInTheDocument();
        expect(screen.getByText(/Sample Event 2/)).toBeInTheDocument();
    });

    it("Renders inside HorizontalScrollContainer", () => {
        const { container } = render(<HorizontalEventList title="Scroll Test" EventCards={mockEvents} />);
        const list = container.querySelector("ul.scroll-list");
        expect(list).toBeInTheDocument();
        expect(list?.children.length).toBe(2);
    });
});
