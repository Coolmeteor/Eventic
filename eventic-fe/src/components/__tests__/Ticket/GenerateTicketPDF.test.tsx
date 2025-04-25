import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import GenerateTicketPDF from "@/components/Ticket/GenerateTicketPDF";
import { EventItemProps } from "@/utils/event";

global.fetch = jest.fn(() =>
    Promise.resolve({
        blob: () => Promise.resolve(new Blob(["test-qr-code"], { type: "image/png" })),
    })
) as jest.Mock;

const mockPdfOpen = jest.fn();

// Create mock for pdfmake/build/pdfmake for testing purpose
jest.mock("pdfmake/build/pdfmake", () => ({
    createPdf: () => ({
        open: mockPdfOpen,
    }),
    vfs: {},
}));

const mockEvent: EventItemProps = {
    id: 1,
    name: "Mock Event",
    thumbnail: "thumb.jpg",
    description: "Mock Description",
    date: new Date(2025, 0, 1).getTime(),
    location: "Mock Location",
};

describe("GenerateTicketPDF", () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
        mockPdfOpen.mockClear();
    });

    it("Displays loading text initially", () => {
        render(<GenerateTicketPDF ticketID={123} eventItemProps={mockEvent} />);
        expect(screen.getByText("Loading QR code...")).toBeInTheDocument();
    });

    it("Renders QR image after fetch and enables button", async () => {
        render(<GenerateTicketPDF ticketID={123} eventItemProps={mockEvent} />);

        await waitFor(() => {
            const img = screen.getByAltText("QR Code");
            expect(img).toBeInTheDocument();
            expect(screen.getByRole("button")).not.toBeDisabled();
        });
    });

    it("Calls pdfMake.createPdf().open() when button is clicked", async () => {
        render(<GenerateTicketPDF ticketID={123} eventItemProps={mockEvent} />);

        await waitFor(() => screen.getByAltText("QR Code"));

        fireEvent.click(screen.getByRole("button"));
        expect(mockPdfOpen).toHaveBeenCalled();
    });
});
