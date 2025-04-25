import { render, screen, waitFor } from "@testing-library/react";
import OrderCard from "@/components/Profile/Order/OrderCard";
import { fetchTicketEvent } from "@/utils/event";
import { Ticket, Purchase } from "@/utils/tickest_purchases";
import userEvent from "@testing-library/user-event";

jest.mock("@/utils/event", () => ({
    ...jest.requireActual("@/utils/event"),
    fetchTicketEvent: jest.fn(),
}));

const mockEvent = {
    id: 123,
    name: "Mock Event",
    description: "This is a mock description.",
    location_string: "Mock Location",
    start_date: new Date("2025-05-01T10:00:00").toISOString(),
    end_date: new Date("2025-05-01T14:00:00").toISOString(),
    media: ["mock-image.jpg"],
};

const mockTicket: Ticket = {
    id: 456,
    event_id: 123,
    is_valid: true,
    created_at: new Date("2025-04-20T09:00:00").getTime(),
};

const mockPurchase: Purchase = {
    id: 100,
    user_id: 1,
    ticket_id: 456,
    quantity: 2,
    unit_price: 10.00,
    total_price: 20.00,
    purchase_date: new Date("2025-04-20T09:00:00").getTime(),
};

describe("OrderCard", () => {
    // Disable console.log/error since the response from mocked API causes undesired error logs.
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        (console.log as jest.Mock).mockRestore();
        (console.error as jest.Mock).mockRestore();
    });
    
    beforeEach(() => {
        (fetchTicketEvent as jest.Mock).mockClear();
    });

    test("Shows loading message initially", () => {
        (fetchTicketEvent as jest.Mock).mockResolvedValueOnce(mockEvent);
        render(<OrderCard ticketData={mockTicket} purchaseData={mockPurchase} />);
        expect(screen.getByText("Loading data")).toBeInTheDocument();
    });

    test("Renders event and purchase data after loading", async () => {
        (fetchTicketEvent as jest.Mock).mockResolvedValueOnce(mockEvent);
        render(<OrderCard ticketData={mockTicket} purchaseData={mockPurchase} />);

        await waitFor(() => expect(screen.getByText("Mock Event")).toBeInTheDocument());

        expect(screen.getByText(/Amount Paid/i)).toBeInTheDocument();
        // 
        expect(screen.getByText((content) => 
            content.includes("20") && content.includes("$"))
        ).toBeInTheDocument();
        expect(screen.getByText(/Quantity/i)).toBeInTheDocument();
        expect(screen.getByText("2 ticket(s)")).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", "mock-image.jpg");

        expect(screen.getByRole("button", { name: /View Event/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /View Ticket/i })).toBeInTheDocument();
    });

    test("Shows error message if event data fails to load", async () => {
        (fetchTicketEvent as jest.Mock).mockResolvedValueOnce(undefined);
        render(<OrderCard ticketData={mockTicket} purchaseData={mockPurchase} />);

        await waitFor(() =>
            expect(
                screen.getByText(/Failed to load ticket information/)
            ).toBeInTheDocument()
        );
    });
});
