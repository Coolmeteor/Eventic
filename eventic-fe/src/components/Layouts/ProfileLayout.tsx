import { useState, ReactNode } from "react";
import Split from "react-split";
import { useRouter } from "next/router";
import DashboardList from "@/components/Profile/DashboardList";

const API = 'http://127.0.0.1:5000'

interface ProfileLayoutProps {
    children: ReactNode;
    isUser?: boolean;
}

export default function ProfileLayout({ 
    children,
    isUser=true
}: ProfileLayoutProps){

    const [errorText, setErrorText] = useState<string>("");

    // Page transition variables and functions
    const router = useRouter();

    const goToEdit = () => {
        router.push("/profile/edit");
    }

    const goToSecurityEdit = () => {
        router.push("/profile/edit-security");
    }

    const goToOrders = () => {
        router.push("/profile/orders");
    }

    const notDefined = () => {
        setErrorText("The link/action event is not defined");
        setTimeout(()=>{setErrorText("")}, 2000);
    } // Just for debugging


    // For both account
    const profileList = [
        {text: "Edit personal information", onClick:goToEdit},
        {text: "Edit security information", onClick:goToSecurityEdit},
        {text: "Saved payment option", onClick:notDefined},
        {text: "Setup your preference", onClick:notDefined},
        {text: "Notification settings", onClick: notDefined}
    ]

    // User
    const ticketList = [
        {text: "Upcoming event tickets", onClick:notDefined},
        {text: "Ordered tickets", onClick:goToOrders}
    ]

    // Event Organizer
    const organizerList = [
        {text: "Manage events", onClick:notDefined},
        {text: "Upcoming events", onClick:notDefined},
        {text: "Previous events", onClick:notDefined},
        {text: "Event analytics", onClick:notDefined},
    ]

    return(
        <>  
            <Split className="flex" sizes={[25, 75]}>
                {/* Left Component*/}
                
                {
                    isUser ? (
                        <div>
                            <div className="dashboard">
                                <div className="box">
                                    <span>Personal Information</span>
                                    <DashboardList list={profileList}></DashboardList>
                                </div>
                                <div className="box">
                                    <span>Tickets</span>
                                    <DashboardList list={ticketList}></DashboardList>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="dashboard">
                                <div className="box">
                                    <span>Personal Information</span>
                                    <DashboardList list={profileList}></DashboardList>
                                </div>
                                <div className="box">
                                    <span>Your Events</span>
                                    <DashboardList list={organizerList}></DashboardList>
                                </div>
                            </div>
                        </div>
                    )
                }
                

                {/* Right Component*/}
                {
                    <>
                        {children}
                    </>
                }
            </Split>
        </>
    )
}