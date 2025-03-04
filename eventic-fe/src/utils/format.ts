/**
 * Function library for formatting value
 */
import { EventData } from "@/constants";
import { EventCardProps } from "@/components/Event/EventCard";


export const formatPhoneNumber = (phone: string) => {
    if(!phone) return "";

    phone = phone.replace(/\D/g, ""); // Remove value except for number
    if (phone.length > 3 && phone.length <= 6) {
        return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    } else if (phone.length > 6) {
        return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
    }
    return phone;
};

export const unformatPhoneNumber = (formattedPhone: string) => {
    return formattedPhone.replace(/\D/g, "");
}

/**
 *  This function might not be neccessary if the media are stored as URLs.
 *  Defined just in case that the media are binary data.
 * @param data 
 * @returns 
 */
export const extractEventCardData= (data: EventData) : EventCardProps => {
    return {
        name: data.name,
        thumbnail: data.media[0],
        description: data.description,
        date: data.startDate,
        location: data.locationString
    };
}