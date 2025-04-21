/*
    Profile page transition utilities
*/
import { 
    faChartLine, faUserAlt, faShieldAlt, 
    faPlusCircle, faRunning, faCalendarAlt, faTicket,
    faIdCard
} from '@fortawesome/free-solid-svg-icons';

const goToEdit = () => {
    window.location.href = "/profile/edit";
}

const goToSecurityEdit = () => {
    window.location.href = "/profile/edit-security";
}

const goToOrders = () => {
    window.location.href = "/customer/orders";
}

const goToUpcomingEvents = () => {
    window.location.href = "/customer/upcoming";
}

// const goToHistory = () => {
//     return;
// }

// const goToPaymentMethod = () => {
//     return;
// }

const goToManageEvent = () => {
    window.location.href = "/org/events";
}

const goToOrgUpcoming = () => {
    window.location.href = "/org/upcoming";
}

const goToOrgPrevEvent = () => {
    window.location.href = "/org/previous";
}

const goToCreateEvent = () => {
    window.location.href = "/event/create";
}

const goToAnalitics = () => {
    window.location.href = "/org/stats";
}

// const goToPreferenceSetting = () => {
//     return;
// }

// const goToNotificationSetting = () => {
//     return;
// }

// All user
export const userAccountIcons = [
    {label: "Edit Profile", onClick:goToEdit, icon: faUserAlt},
    {label: "Security Information", onClick:goToSecurityEdit, icon: faShieldAlt},
    {label: "Ordered Tickets", onClick:goToOrders, icon: faTicket},
    {label: "Upcoming Events", onClick:goToUpcomingEvents, icon: faCalendarAlt},
    // {label: "Payment Method", onClick:goToPaymentMethod, icon: faIdCard},
]

// Event Organizer
export const managementIcons = [
    {label: "Manage Events", onClick:goToManageEvent, icon: faCalendarAlt},
    {label: "Upcoming Events", onClick:goToOrgUpcoming, icon: faRunning},
    {label: "Create New Events", onClick:goToCreateEvent, icon: faPlusCircle},
    // {label: "Payment Method", onClick:goToPaymentMethod, icon: faIdCard},
    {label: "Analytics", onClick:goToAnalitics, icon: faChartLine},
]

export const orgAccountIcons = [
    {label: "Edit Profile", onClick:goToEdit, icon: faUserAlt},
    {label: "Security Information", onClick:goToSecurityEdit, icon: faShieldAlt},
    {label: "Ordered Tickets", onClick:goToOrders, icon: faTicket},
    {label: "Upcoming Events", onClick:goToUpcomingEvents, icon: faCalendarAlt},
]

export const organizerList = [
    {text: "Manage events", onClick:goToManageEvent},
    {text: "Upcoming events", onClick:goToOrgUpcoming},
    {text: "Previous events", onClick:goToOrgPrevEvent},
    {text: "Event analytics", onClick:goToAnalitics},
]

// Customer
export const profileList = [
    {text: "Edit personal information", onClick:goToEdit},
    {text: "Edit security information", onClick:goToSecurityEdit},
    // {text: "Saved payment option", onClick:goToPaymentMethod},
    // {text: "Setup your preference", onClick:goToPreferenceSetting},
    // {text: "Notification settings", onClick: goToNotificationSetting}
]
export const ticketList = [
    {text: "Ordered tickets", onClick:goToOrders},
    {text: "Upcoming event tickets", onClick:goToUpcomingEvents},
]


export const dashboardIcons = [
    // {label: "History", onClick:goToHistory, icon:faCalendarAlt},
    {label: "Ordered tickets", onClick:goToOrders, icon:faTicket},
]
