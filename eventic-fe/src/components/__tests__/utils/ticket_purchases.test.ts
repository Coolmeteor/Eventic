import { AuthorizeTicket } from "@/utils/tickest_purchases"

// Mock fetch only for this test
global.fetch = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

describe("AuthorizeTicket", () => {
    it("Should return true if fetch is successful and response is ok", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

        const result = await AuthorizeTicket(123);
        expect(result).toBe(true);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining("/ticket/authorize-user-ticket/123"),
            expect.objectContaining({
                method: "GET",
                credentials: "include"
            })
        );
    });

    it("Should return false if fetch response is not ok", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

        const result = await AuthorizeTicket(456);
        expect(result).toBe(false);
    });

    it("Should return false if fetch throws an error", async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

        const result = await AuthorizeTicket(789);
        expect(result).toBe(false);
    });
});
