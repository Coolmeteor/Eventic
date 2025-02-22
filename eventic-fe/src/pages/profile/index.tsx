import { useState, useEffect } from "react";

import { 
    faChartLine, faUserAlt, faShieldAlt, 
    faPlusCircle, faRunning, faCalendarAlt, faTicket,
    faIdCard
} from '@fortawesome/free-solid-svg-icons';

import ProfileLayout from "@/components/Layouts/ProfileLayout";
import DefaultIconButton from "@/components/DefaultIconButton";
import { fetchProfile, User } from "@/utils/profile-api";
import { logout } from "@/utils/auth-api";
import { useRouter } from "next/router";


export default function ProfileMain(){    
    const [isUser, setIsUser] = useState<boolean>(true); // Should be set with data from DB

    const [errorText, setErrorText] = useState<string>("");

    /*
    Fetch user information
     */
    const [user, setUser] = useState<User>();

    useEffect(() => {
        fetchProfile()
        .then((userData) => {
            if(userData && "user" in userData){
                setUser(userData.user);
            }
        });
    }, []);

    // Page transition variables and functions
    const router = useRouter();

    const goToEdit = () => {
        router.push("/profile/edit");
    }

    const goToSecurityEdit = () => {
        router.push("/profile/edit-security");
    }


    if (!user)
        return <h1 style={{fontSize: "4rem", display: "block", textAlign: "center"}}>Loading...</h1>

    // User
    const userAccountIcons = [
        {label: "Edit Profile", onClick:goToEdit, icon: faUserAlt},
        {label: "Security Information", onClick:goToSecurityEdit, icon: faShieldAlt},
        {label: "Ordered Tickets", onClick:undefined, icon: faTicket},
        {label: "Upcoming Events", onClick:undefined, icon: faCalendarAlt},
        {label: "Payment Method", onClick:undefined, icon: faIdCard}
    ]

    // Event Organizer
    const managementIcons = [
        {label: "Manage Events", onClick:undefined, icon: faCalendarAlt},
        {label: "Upcoming Events", onClick:undefined, icon: faRunning},
        {label: "Create New Events", onClick:undefined, icon: faPlusCircle},
        {label: "Payment Method", onClick:undefined, icon: faIdCard},
        {label: "Analytics", onClick:undefined, icon: faChartLine},
    ]
    
        const orgAccountIcons = [
        {label: "Edit Profile", onClick:goToEdit, icon: faUserAlt},
        {label: "Security Information", onClick:goToSecurityEdit, icon: faShieldAlt}
    ]

    return(
        <>       
            <div className="iconList">
                <div><button style={{border: "2px solid black", width: "10rem", background: "Red"}} onClick={logout}>Logout</button></div>
                {
                    isUser ? (<div><button style={{border: "2px solid black", width: "10rem", background: "yellow"}} onClick={()=>setIsUser(false)}>To organizer profile</button></div>)
                    : (<div><button style={{border: "2px solid black", width: "10rem", background: "yellow"}} onClick={()=>setIsUser(true)}>To user profile</button></div>)
                }
                <div className="errorMessage">{errorText}</div>
                <h1 className="greeting">Hello {user["user_name"]}!</h1>
                {
                    isUser ? (
                        <div>
                            <h1 className="listLabel">Your account</h1>
                            {userAccountIcons.map((item) => (
                                <DefaultIconButton title={item.label} icons={item.icon} onClick={item.onClick}></DefaultIconButton>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div>
                                <h1 className="listLabel">Event Management</h1>
                                {managementIcons.map((item) => (
                                    <DefaultIconButton title={item.label} icons={item.icon} onClick={item.onClick}></DefaultIconButton>
                                ))}
                            </div>
                            <div>
                                <h1 className="listLabel">Your Account</h1>
                                {orgAccountIcons.map((item) => (
                                    <DefaultIconButton title={item.label} icons={item.icon} onClick={item.onClick}></DefaultIconButton>
                                ))}
                            </div>
                        </>
                        
                    )
                }
            </div>
        </>
    )
};

ProfileMain.getLayout = function getLayout(page: React.ReactNode){
    return <ProfileLayout>{page}</ProfileLayout>
}