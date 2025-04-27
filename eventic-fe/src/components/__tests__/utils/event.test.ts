import { 
    extractEventItemData, 
    fetchTicketEvent, 
    fetchAddCart, 
    fetchDeleteCart, 
    fetchCartItems, 
    fetchCartPurchase 
} from "@/utils/event";

import { Event } from "@/utils/event";
import { convertResponse } from "@/utils/auth-api";

// Mock fetch and convertResponse
global.fetch = jest.fn();
jest.mock("@/utils/auth-api", () => ({
    convertResponse: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe("extractEventItemData", () => {
    it("Should correctly extract event item data", () => {
        const sampleEvent: Event = {
        id: 1,
        name: "Test Event",
        description: "Test Description",
        media: ["image_url"],
        tags: [],
        category: "Test",
        start_date: 12345678,
        end_date: 12345679,
        location_string: "Test Location",
        location_long: 0,
        location_lat: 0,
        visibility: "public",
        max_participants: 100,
        current_participants: 50,
        pricing: 10,
        creator_id: "creator",
        created_at: 123456,
        updated_at: 123457
        };

        const extracted = extractEventItemData(sampleEvent);
        expect(extracted).toEqual({
        name: "Test Event",
        thumbnail: "image_url",
        description: "Test Description",
        date: 12345678,
        id: 1,
        location: "Test Location"
        });
    });
});

describe("fetchTicketEvent", () => {
    it("Should return event data if response is ok", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ event: { id: 1 } });
    
        const result = await fetchTicketEvent(123);
        expect(result).toEqual({ id: 1 });
    });

    it("Should return undefined if response is not ok", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ message: "error" });
    
        const result = await fetchTicketEvent(123);
        expect(result).toBeUndefined();
    });
});

describe("fetchAddCart", () => {
    it("Should return true if add cart succeeds", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ message: "added" });
    
        const result = await fetchAddCart(1, 2, 30);
        expect(result).toBe(true);
    });

    it("Should return false if add cart fails", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ error: "fail" });
    
        const result = await fetchAddCart(1, 2, 30);
        expect(result).toBe(false);
    });
});

describe("fetchDeleteCart", () => {
    it("Should return true if delete cart succeeds", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ message: "deleted" });
    
        const result = await fetchDeleteCart();
        expect(result).toBe(true);
    });

    it("Should return false if delete cart fails", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ error: "fail" });
    
        const result = await fetchDeleteCart();
        expect(result).toBe(false);
    });
});

describe("fetchCartItems", () => {
    it("Should return data if fetch cart items succeeds", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ message: "cart", items: [1,2,3] });
    
        const result = await fetchCartItems();
        expect(result).toEqual({ message: "cart", items: [1,2,3] });
        });
    
        it("should return undefined if fetch cart items fails", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ error: "fail" });
    
        const result = await fetchCartItems();
        expect(result).toBeUndefined();
    });
});

describe("fetchCartPurchase", () => {
    it("Should return true if purchase succeeds", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ message: "purchased" });
    
        const result = await fetchCartPurchase();
        expect(result).toBe(true);
    });

    it("Should return false if purchase fails", async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
        (convertResponse as jest.Mock).mockResolvedValueOnce({ error: "fail" });
    
        const result = await fetchCartPurchase();
        expect(result).toBe(false);
    });
});
