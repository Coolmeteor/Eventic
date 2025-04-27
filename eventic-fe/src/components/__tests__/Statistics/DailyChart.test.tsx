import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import DailyChart from "@/components/Statistics/DailyChart";
import { FetchDailyChart } from "@/utils/statistics";

const mockChartData = [
    { hour: 0, sales: 100 },
    { hour: 1, sales: 200 },
];

// Create mock function and type for testing purpose
jest.mock('@/utils/statistics', () => ({
    FetchDailyChart: jest.fn(),
    SortType: {
        PURCHASE_DATE: "purchase_date",
        START_DATE: "start_date"
    },
}));


describe("DailyChart", () => {
    // Need to create mock for ResizeObserver recharts since Jest does not have the function.
    beforeAll(() => {
        global.ResizeObserver = class {
            observe() {}
            unobserve() {}
            disconnect() {}
        } as any;

        // Mock the console.warn/error since the message shown by console.warn/error in testing is unneccessary
        jest.spyOn(console, 'warn').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        // For console mock functions
        (console.warn as jest.Mock).mockRestore();
        (console.error as jest.Mock).mockRestore();
    });

    beforeEach(() => {
        (FetchDailyChart as jest.Mock).mockClear();
    });

    it("Renders loading message initially", () => {
        (FetchDailyChart as jest.Mock).mockResolvedValueOnce({ chart_data: mockChartData });
        render(<DailyChart />);
        expect(screen.getByText("Loading daily chart data")).toBeInTheDocument();
    });

    it("Displays chart when data is loaded", async () => {
        (FetchDailyChart as jest.Mock).mockResolvedValueOnce({ chart_data: mockChartData });
        render(<DailyChart />);

        await waitFor(() => {
            // Check the essential parts
            expect(screen.getByText("Daily")).toBeInTheDocument();
            expect(screen.getByText("Select data by:")).toBeInTheDocument();
        });
    });

    it("Calls FetchDailyChart with correct sort type on dropdown change", async () => {
        (FetchDailyChart as jest.Mock).mockResolvedValue({ chart_data: mockChartData });

        render(<DailyChart />);
        await waitFor(() => screen.getByText("Select data by:"));

        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "start_date" } });

        await waitFor(() => {
            expect(FetchDailyChart).toHaveBeenCalledWith("start_date");
        });
    });

    it("Retries loading up to 3 times when data is missing", async () => {
        (FetchDailyChart as jest.Mock).mockResolvedValue({});

        render(<DailyChart />);

        await waitFor(() => {
            expect(screen.getByText("Try to reload...")).toBeInTheDocument();
        });
    });
});
