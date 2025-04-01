/**
 * Utilities for tickets and purchases
 */
import { API } from "@/constants";
export type Ticket = {
    id: number;
    event_id: number;
    is_valid: boolean;
    created_at: number;
}

export type Purchase = {
    id: number;
    user_id: number;
    ticket_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
    purchase_date: number;
}

export async function AuthorizeTicket(ticketId: number): Promise<boolean> {
    try {
        const response = await fetch(`${API}/ticket/authorize-user-ticket/${ticketId}`,{
            method: "GET",
            credentials: "include",
        });

        return response.ok;
    }
    catch (error) {
        console.error("Error authorizing ticket:", error);
        return false;
    }
}

