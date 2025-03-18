/**
 * Utilities for events
 */
import { EventData } from "@/constants";
import { PrintProps } from "@/components/Ticket/GenerateTicketPDF";

export type EventItemProps = {
    name: string;
    thumbnail: string; // URL or data string
    description: string;
    date: number;
    id: number;
    location: string;
    isSimple?: Boolean;
}

/**
 *  This function might not be neccessary if the media are stored as URLs.
 *  Defined just in case that the media are binary data.
 * @param data 
 * @returns 
 */
export const extractEventItemData = (data: EventData) : EventItemProps => {
    return {
        name: data.name,
        thumbnail: data.media[0],
        description: data.description,
        date: data.startDate,
        id: data.id,
        location: data.locationString
    };
}