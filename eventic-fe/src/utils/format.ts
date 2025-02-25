/**
 * Function library for formatting value
 */
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