import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import SalesLineChart from "@/components/Statistics/SalesChart";
import { FetchChart } from "@/utils/statistics";

const mockChartData = [
    { interval: "2025-01-01", sales: 100 },
    { interval: "2025-02-01", sales: 200 },
];

jest.mock('@/utils/statistics', () => ({
    FetchChart: jest.fn(),
}));

describe("SalesLineChart", () => {
    beforeAll(() => {
        // Need to create mock for ResizeObserver recharts since Jest does not have the function.
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
    })

    beforeEach(() => {
        (FetchChart as jest.Mock).mockClear();
    });

    it("Shows loading initially", () => {
        (FetchChart as jest.Mock).mockResolvedValueOnce({ chart_data: mockChartData });
        render(<SalesLineChart organizerId={1} />);
        expect(screen.getByText("Loading chart")).toBeInTheDocument();
    });

    it("Renders chart and controls after loading", async () => {
        (FetchChart as jest.Mock).mockResolvedValueOnce({ chart_data: mockChartData });
        render(<SalesLineChart organizerId={1} />);

        await waitFor(() => {
            expect(screen.getByRole("button", { name: /apply/i })).toBeInTheDocument();
            expect(screen.getByText("Chart Settings")).toBeInTheDocument();
        });
    });

    it("Changes duration and interval on select change", async () => {
        (FetchChart as jest.Mock).mockResolvedValue({ chart_data: mockChartData });
        render(<SalesLineChart organizerId={1} />);

        await waitFor(() => screen.getByRole("combobox", { name: /duration/i }));

        const durationSelect = screen.getByLabelText(/duration/i);
        fireEvent.change(durationSelect, { target: { value: "threeYears" } });

        const intervalSelect = screen.getByLabelText(/interval/i);
        fireEvent.change(intervalSelect, { target: { value: "day" } });

        expect(durationSelect).toHaveValue("threeYears");
        expect(intervalSelect).toHaveValue("day");
    });

    it("Fetches data again when apply button is clicked", async () => {
        (FetchChart as jest.Mock).mockResolvedValue({ chart_data: mockChartData });
        render(<SalesLineChart organizerId={1} />);

        await waitFor(() => screen.getByRole("button", { name: /apply/i }));

        fireEvent.click(screen.getByRole("button", { name: /apply/i }));

        // Detect 2 times for the initial fetch and clicked fetch, not once.
        await waitFor(() => {
            expect(FetchChart).toHaveBeenCalledTimes(2);
        });
    });

    it("Redirects to /org/stats if fetch fails", async () => {
        const locationAssignMock = jest.fn();
        delete (window as any).location;
        (window as any).location = { href: "", assign: locationAssignMock };

        (FetchChart as jest.Mock).mockResolvedValueOnce(undefined);

        render(<SalesLineChart organizerId={1} />);
        await waitFor(() => {
            expect(window.location.href).toBe("/org/stats");
        });
    });
});
