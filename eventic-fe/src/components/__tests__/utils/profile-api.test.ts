import { 
    fetchProfile, 
    fetchUserInfo, 
    changeRequest, 
    fetchOrders, 
    fetchUpcomingOrders, 
    isValidGender
} from "@/utils/profile-api";

import { refreshToken, convertResponse } from "@/utils/auth-api";

// Mock fetch, refreshToken, and convertResponse
global.fetch = jest.fn();
jest.mock("@/utils/auth-api", () => ({
    refreshToken: jest.fn(),
    convertResponse: jest.fn()
}));

delete (window as any).location;
(window as any).location = { href: "" };

beforeEach(() => {
    jest.clearAllMocks();
});

describe("isValidGender", () => {
    it("Should return true for valid genders", () => {
        expect(isValidGender("Male")).toBe(true);
        expect(isValidGender("Female")).toBe(true);
        expect(isValidGender("Other")).toBe(true);
    });

    it("Should return false for invalid genders", () => {
        expect(isValidGender("Unknown")).toBe(false);
    });
});

describe("fetchProfile", () => {
    it("Should return user if response ok", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ status: 200, ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ message: "success", user: {} });

        const result = await fetchProfile();
        expect(result).toEqual({ message: "success", user: {} });
    });

    it("Should refresh token if 401 and succeed", async () => {
        (fetch as jest.Mock)
            .mockResolvedValueOnce({ status: 401 })  // access token expired
            .mockResolvedValueOnce({ status: 200, ok: true });  // after refresh
        (refreshToken as jest.Mock).mockResolvedValueOnce(true);
        (convertResponse as jest.Mock).mockResolvedValueOnce({ message: "refreshed", user: {} });

        const result = await fetchProfile();
        expect(result).toEqual({ message: "refreshed", user: {} });
    });

    it("Should redirect if refresh fails", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ status: 401 });
        (refreshToken as jest.Mock).mockResolvedValueOnce(false);

        await fetchProfile();
        expect(window.location.href).toBe("/login");
    });
});

describe("fetchUserInfo", () => {
    it("Should return user if response ok", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ message: "info", user: {} });

        const result = await fetchUserInfo(1);
        expect(result).toEqual({ message: "info", user: {} });
    });

    it("Should return void if response not ok", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ error: "Not found" });

        const result = await fetchUserInfo(1);
        expect(result).toBeUndefined();
    });
});

describe("changeRequest", () => {
    const resetText = jest.fn();
    const setErrorText = jest.fn();
    const fetchPath = "http://example.com";
    const fetchMethod = "POST";
    const fetchHeaders = { "Content-Type": "application/json" };
    const fetchBody = JSON.stringify({ data: "test" });

    it("Should succeed without token refresh", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ status: 200, ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ message: "Updated" });

        const result = await changeRequest(resetText, fetchPath, fetchMethod, fetchHeaders, fetchBody, setErrorText);

        expect(result).toEqual({ message: "Updated" });
        expect(resetText).toHaveBeenCalled();
        expect(setErrorText).toHaveBeenCalledWith("Updated");
    });

    it("Should refresh token if 401 and succeed", async () => {
        (fetch as jest.Mock)
            .mockResolvedValueOnce({ status: 401 })
            .mockResolvedValueOnce({ status: 200, ok: true });
        (refreshToken as jest.Mock).mockResolvedValueOnce(true);
        (convertResponse as jest.Mock).mockResolvedValueOnce({ message: "Updated after refresh" });

        const result = await changeRequest(resetText, fetchPath, fetchMethod, fetchHeaders, fetchBody, setErrorText);

        expect(result).toEqual({ message: "Updated after refresh" });
    });

    it("Should redirect if refresh fails", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ status: 401 });
        (refreshToken as jest.Mock).mockResolvedValueOnce(false);

        await changeRequest(resetText, fetchPath, fetchMethod, fetchHeaders, fetchBody, setErrorText);
        expect(window.location.href).toBe("/login");
    });
});

describe("fetchOrders", () => {
    it("Should return data if ok", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ message: "orders" });

        const result = await fetchOrders();
        expect(result).toEqual({ message: "orders" });
    });

    it("Should refresh if 401 and succeed", async () => {
        (fetch as jest.Mock)
            .mockResolvedValueOnce({ ok: false, status: 401 })
            .mockResolvedValueOnce({ ok: true });
        (refreshToken as jest.Mock).mockResolvedValueOnce(true);
        (convertResponse as jest.Mock).mockResolvedValueOnce({ message: "orders after refresh" });

        const result = await fetchOrders();
        expect(result).toEqual({ message: "orders after refresh" });
    });

    it("Should redirect if refresh fails", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 401 });
        (refreshToken as jest.Mock).mockResolvedValueOnce(false);

        await fetchOrders();
        expect(window.location.href).toBe("/login");
    });
});

describe("fetchUpcomingOrders", () => {
    it("Should return data if ok", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ message: "upcoming" });

        const result = await fetchUpcomingOrders();
        expect(result).toEqual({ message: "upcoming" });
    });

    it("Should refresh if 401 and succeed", async () => {
        (fetch as jest.Mock)
            .mockResolvedValueOnce({ ok: false, status: 401 })
            .mockResolvedValueOnce({ ok: true });
        (refreshToken as jest.Mock).mockResolvedValueOnce(true);
        (convertResponse as jest.Mock).mockResolvedValueOnce({ message: "upcoming after refresh" });

        const result = await fetchUpcomingOrders();
        expect(result).toEqual({ message: "upcoming after refresh" });
    });

    it("Should redirect if refresh fails", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 401 });
        (refreshToken as jest.Mock).mockResolvedValueOnce(false);

        await fetchUpcomingOrders();
        expect(window.location.href).toBe("/login");
    });
});
