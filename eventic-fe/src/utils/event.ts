/**
 * Utilities for events
 */
import { API } from "@/constants";
import { convertResponse } from "./auth-api";

export type EventItemProps = {
    name: string;
    thumbnail: string; // URL or data string
    description: string;
    date: number;
    id: number;
    location: string;
    isSimple?: Boolean;
}

export interface Event {
    id: number;
    name: string;
    description: string;
    media: string[];
    tags: string[];
    category: string;

    start_date: number;
    end_date: number;
    location_string: string;
    location_long: number;
    location_lat: number;

    visibility: string;
    max_participants: number;
    current_participants: number;
    pricing: number;

    creator_id: string;
    created_at: number;
    updated_at: number;
}


/**
 *  This function might not be neccessary if the media are stored as URLs.
 *  Defined just in case that the media are binary data.
 * @param data 
 * @returns 
 */
export const extractEventItemData = (data: Event) : EventItemProps => {
    return {
        name: data.name,
        thumbnail: data.media[0],
        description: data.description,
        date: data.start_date,
        id: data.id,
        location: data.location_string
    };
}

export async function fetchTicketEvent(ticket_id: number){
    const fetchUrl = `${API}/ticket/get-event/${ticket_id}`

    const response = await fetch(fetchUrl);

    const data = await convertResponse(response);

    if(!response.ok){
        console.log(data.message || data);
        return;
    }

    if(data && "event" in data){
        return data.event;
    } else {
        console.log(data);
        return;
    }
}

export async function fetchAddCart(event_id: number, quantity: number, unit_price: number) {
    const fetchUrl = `${API}/payment/cart/add`
    const fecthBody = {
        "event_id": event_id,
        "quantity": quantity,
        "unit_price": unit_price,
    }

    const response = await fetch(fetchUrl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fecthBody),
    });

    const data = await convertResponse(response);

    if (response.ok){
        console.log(data.message);
        return true;
    }
    else {
        console.log(data.error | data.msg | data);
        return false;
    }
}

export async function fetchDeleteCart() {
    const response = await fetch(`${API}/payment/cart/delete`,{
        method: "DELETE",
        credentials: "include",
    });

    const data = await convertResponse(response);

    if (response.ok){
        console.log(data.message);
        return true;
    } else {
        console.log(data.error | data.msg | data);
        return false;
    }
}

export async function fetchCartItems() {
    const response = await fetch(`${API}/payment/cart`,{
        method: "GET",
        credentials: "include",
    });

    const data = await convertResponse(response);

    if (response.ok){
        console.log(data.message);
        return data;
    } else {
        console.log(data.error | data.msg | data);
        return undefined;
    }
}

export async function fetchCartPurchase() {
    const response = await fetch(`${API}/payment/cart/purchase`, {
        method: "PATCH",
        credentials: "include",
    });

    const data = await convertResponse(response);

    if (response.ok){
        console.log(data.message);
        return true;
    }
    else {
        console.log(data.error | data.msg | data);
        return false;
    }
}
