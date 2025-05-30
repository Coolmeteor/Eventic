/**
 * Function library for formatting value
 */
import { EventData } from "@/constants";
import { EventItemProps } from "@/utils/event";


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

export const formatPrice = (value: string): string => {
    if(!value) return "";

    console.log(value);

    value = value.replace(/[^0-9.]/g, "");  // Remove characters except for number and period
    value = value.replace(/^\.|\.{2.}|(\..*)\./g, "$1"); // Remove multiple period
    value = value.replace(/^\./, ""); // Remove ending period
    value = value.replace(/(\.\d{2})\d+/g, "$1"); // Don't accept 2 more number after period

    return value;
}

/**
 *  This function might not be neccessary if the media are stored as URLs.
 *  Defined just in case that the media are binary data.
 * @param data 
 * @returns 
 */
export const extractEventCardData = (data: EventData) : EventItemProps => {
    return {
        name: data.name,
        thumbnail: data.media[0],
        description: data.description,
        date: data.start_date,
        id: data.id,
        location: data.location_string
    };
}

export function getMonthDayYear(date: string){
    const parts = date.split(' ');
    const formattedDate = `${parts[1]} ${parts[2]}, ${parts[3]}`;

    return formattedDate;
}

export const formatCurrency = (value: number) => {
    if (value === undefined || value === null) {
        return "$0.00";
    }
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};