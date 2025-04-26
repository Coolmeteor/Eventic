import { getAccessCSRFToken, getRefreshCSRFToken, convertResponse, 
        logout, isAuthenticated, refreshToken 
} from "@/utils/auth-api";

// Mock fetch and window.location
global.fetch = jest.fn();

delete (window as any).location;
(window as any).location = { href: "" };

beforeEach(() => {
jest.clearAllMocks();
});

describe("CSRF Token functions", () => {
    it("Should return access token from cookie", () => {
        document.cookie = "csrf_access_token=test-access-token";
        expect(getAccessCSRFToken()).toBe("test-access-token");
    });

    it("Should return refresh token from cookie", () => {
        document.cookie = "csrf_refresh_token=test-refresh-token";
        expect(getRefreshCSRFToken()).toBe("test-refresh-token");
    });
});

describe("convertResponse", () => {
    it("Should return json if content-type is application/json", async () => {
        // Use custom response type instead of Response since Node.js does not have it
        const fakeResponse = {
            headers: { get: () => "application/json" },
            json: async () => ({ message: "ok" }),
            text: async () => "",
        } as any;
        
        const data = await convertResponse(fakeResponse);
        expect(data).toEqual({ message: "ok" });
    });

    it("Should return text if content-type is not application/json", async () => {
        const fakeResponse = {
            headers: { get: () => "text/plain" },
            json: async () => ({}),
            text: async () => "plain text",
        } as any;

        const data = await convertResponse(fakeResponse);
        expect(data).toBe("plain text");
    });
});

describe("logout", () => {
    it("Should redirect to /login on successful logout", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            headers: { get: () => "application/json" },
            json: async () => ({ message: "Logged out" }),
            text: async () => "",
        });

        await logout();
            expect(window.location.href).toBe("/login");
    });
});

describe("isAuthenticated", () => {
    it("Should return true if access token works", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            headers: { get: () => "application/json" },
            json: async () => ({ message: "Access OK" }),
            text: async () => "",
        });

        const result = await isAuthenticated();
        expect(result).toBe(true);
    });

    it("Should try refresh token if access token fails, and succeed", async () => {
        (fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: false,
                status: 401,
                headers: { get: () => "text/plain" },
                json: async () => ({}),
                text: async () => "Unauthorized",
            }) // Fail first using refresh token
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: { get: () => "application/json" },
                json: async () => ({ message: "Refresh OK" }),
                text: async () => "",
            }); // Refresh the token

        const result = await isAuthenticated();
        expect(result).toBe(true);
    });

    it("Should return false if both access and refresh fail", async () => {
        (fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: false,
                status: 401,
                headers: { get: () => "text/plain" },
                json: async () => ({}),
                text: async () => "Unauthorized",
            }) // Fail
            .mockResolvedValueOnce({
                ok: false,
                status: 401,
                headers: { get: () => "text/plain" },
                json: async () => ({}),
                text: async () => "Unauthorized",
            }); // Fail again

        const result = await isAuthenticated();
        expect(result).toBe(false);
    });
});

describe("refreshToken", () => {
    it("Should return response on success", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            status: 200,
            headers: { get: () => "application/json" },
            json: async () => ({ message: "Refreshed" }),
            text: async () => "",
        });

        const result = await refreshToken();
        expect(result?.ok).toBe(true);
    });

    it("Should return undefined on failure", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 401,
            headers: { get: () => "text/plain" },
            json: async () => ({}),
            text: async () => "Unauthorized",
        });

        const result = await refreshToken();
        expect(result).toBeUndefined();
    });
});