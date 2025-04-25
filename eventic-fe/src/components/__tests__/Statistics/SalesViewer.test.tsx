import { render, screen, waitFor } from "@testing-library/react";
import SalesViewer from "@/components/Statistics/SalesViewer";
import { FetchEventStats } from "@/utils/statistics";

// Mock a fetch function
jest.mock("@/utils/statistics", () => ({
    ...jest.requireActual("@/utils/statistics"),
    FetchEventStats: jest.fn(),
    FetchChart: jest.fn(),
    FetchWeeklyChart: jest.fn(),
    FetchDailyChart: jest.fn(),
}));

describe("SalesViewer", () => {
    beforeAll(() => {
        // Mock window.location
        Object.defineProperty(window, "location", {
            writable: true,
            value: {
                href: "",
            },
        });
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Displays loading message while fetching", async () => {
        (FetchEventStats as jest.Mock).mockImplementation(() => new Promise(() => {}));
        render(<SalesViewer organizerId={1} />);
        expect(screen.getByText(/loading data/i)).toBeInTheDocument();
    });

    it("Displays error message on fetch failure", async () => {
        (FetchEventStats as jest.Mock).mockResolvedValue({});
        render(<SalesViewer organizerId={1} />);

        await waitFor(() => {
            expect(screen.getByText(/failed to load data/i)).toBeInTheDocument();
            expect(screen.getByText(/reloading data/i)).toBeInTheDocument();
        });
    });

    it("Displays event statistics after loading", async () => {
        (FetchEventStats as jest.Mock).mockResolvedValue({
        stats_data: [{ id: 1, name: "Mock Event", sales: 100 }],
        total_stats: { id: 0, name: "Total", sales: 1000 }
        });

        render(<SalesViewer organizerId={1} />);

        await waitFor(() => {
            expect(screen.getByText(/your event statistics/i)).toBeInTheDocument();
            expect(screen.getByText(/top event by sales/i)).toBeInTheDocument();
            expect(screen.getByText(/sales chart/i)).toBeInTheDocument();
            expect(screen.getByText(/event sales table/i)).toBeInTheDocument();
            expect(screen.getByText(/weekly & daily chart/i)).toBeInTheDocument();
        });
    });
});
