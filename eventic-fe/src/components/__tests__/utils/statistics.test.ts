import { 
    sortStatsData, 
    FetchEventStats, 
    FetchChart, 
    FetchDailyChart, 
    FetchWeeklyChart, 
    FetchOrgEvents 
} from "@/utils/statistics";

import { convertResponse } from "@/utils/auth-api";

// Mock fetch and convertResponse
global.fetch = jest.fn();
jest.mock("@/utils/auth-api", () => ({
    convertResponse: jest.fn()
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe("sortStatsData", () => {
    const sampleData = [
        { id: 1, name: "B Event", sold_num: 20, rem_num: 80, total_num: 100, date: 2, sales: 1000, profit: 500 },
        { id: 2, name: "A Event", sold_num: 50, rem_num: 50, total_num: 100, date: 1, sales: 2000, profit: 1000 }
    ];

    it("Should sort by name ascending", () => {
        const sorted = sortStatsData(sampleData, { key: "name", direction: "asc" });
        expect(sorted[0].name).toBe("A Event");
        expect(sorted[1].name).toBe("B Event");
    });

    it("Should sort by sales descending", () => {
        const sorted = sortStatsData(sampleData, { key: "sales", direction: "desc" });
        expect(sorted[0].sales).toBe(2000);
        expect(sorted[1].sales).toBe(1000);
    });
});

describe("FetchEventStats", () => {
    it("Should fetch all stats when duration is 'all'", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ data: "all stats" });

        const result = await FetchEventStats("all");
        expect(result).toEqual({ data: "all stats" });
    });

    it("Should fetch stats by duration when duration is not 'all'", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ data: "duration stats" });

        const result = await FetchEventStats("threeMonths");
        expect(result).toEqual({ data: "duration stats" });
    });

    it("Should return undefined when fetch fails", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        (convertResponse as jest.Mock).mockResolvedValueOnce({});

        const result = await FetchEventStats("all");
        expect(result).toBeUndefined();
    });
});

describe("FetchChart", () => {
    it("Should return chart data on success", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce([{ date: 1, sales: 100 }]);

        const result = await FetchChart({ duration: "threeWeeks", interval: "day" });
        expect(result).toEqual([{ date: 1, sales: 100 }]);
    });

    it("Should return empty array on failure", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        (convertResponse as jest.Mock).mockResolvedValueOnce([]);

        const result = await FetchChart({ duration: "threeWeeks", interval: "day" });
        expect(result).toEqual([]);
    });
});

describe("FetchDailyChart", () => {
    it("Should return daily chart data on success", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce([{ hour: 10, sales: 200 }]);

        const result = await FetchDailyChart("purchase_date");
        expect(result).toEqual([{ hour: 10, sales: 200 }]);
    });

    it("Should return undefined on failure", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        (convertResponse as jest.Mock).mockResolvedValueOnce([]);

        const result = await FetchDailyChart("purchase_date");
        expect(result).toBeUndefined();
    });
});

describe("FetchWeeklyChart", () => {
    it("Should return weekly chart data on success", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce([{ date: 123, sales: 500 }]);

        const result = await FetchWeeklyChart("start_date");
        expect(result).toEqual([{ date: 123, sales: 500 }]);
    });

    it("Should return undefined on failure", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        (convertResponse as jest.Mock).mockResolvedValueOnce([]);

        const result = await FetchWeeklyChart("start_date");
        expect(result).toBeUndefined();
    });
});

describe("FetchOrgEvents", () => {
    it("Should fetch all events when param is 'all'", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce([{ id: 1, name: "Event 1" }]);

        const result = await FetchOrgEvents("all");
        expect(result).toEqual([{ id: 1, name: "Event 1" }]);
    });

    it("Should fetch upcoming events when param is 'upcoming'", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce([{ id: 2, name: "Upcoming Event" }]);

        const result = await FetchOrgEvents("upcoming");
        expect(result).toEqual([{ id: 2, name: "Upcoming Event" }]);
    });

    it("Should fetch previous events when param is 'previous'", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce([{ id: 3, name: "Previous Event" }]);

        const result = await FetchOrgEvents("previous");
        expect(result).toEqual([{ id: 3, name: "Previous Event" }]);
    });

    it("Should return undefined on failure", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        (convertResponse as jest.Mock).mockResolvedValueOnce([]);

        const result = await FetchOrgEvents("all");
        expect(result).toBeUndefined();
    });
});
