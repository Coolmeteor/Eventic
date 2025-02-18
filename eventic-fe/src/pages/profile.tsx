import { useState, useEffect } from "react";
import Split from "react-split";
import { 
    faChartLine, faUserAlt, faShieldAlt, 
    faPlusCircle, faRunning, faCalendarAlt, faTicket,
    faIdCard
} from '@fortawesome/free-solid-svg-icons';

import DashboardList from "@/components/Profile/DashboardList";
import PersonalForm from "@/components/Profile/PersonalForm";
import DefaultIconButton from "@/components/DefaultIconButton";

const API = 'http://127.0.0.1:5000'

const enum DISPLAY{
    home,
    personalInfo
}

export default function Profile(){
    const [display, setDisplay] = useState<DISPLAY>(DISPLAY.home);
    
    const [isUser, setIsUser] = useState<boolean>(true); // Should be set with data from DB

    const [errorText, setErrorText] = useState<string>("");
    ///////////////////////////////////////////////////////////
    /** 
     * For debug until profile-page branch merged into main.
    */
    // const user_name = "profileTester";
    const email = "profile_test@example.com";
    const password = "abcd1234";

    const data = {email, password};

    const createUserToken = async () => {
        try{
            const response = await fetch(`${API}/profile/testUser`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(data),
            });
    
            const received = await response.json();
            
            if(response.ok){
                console.log(received);
                localStorage.setItem("access_token", received.access_token);
                localStorage.setItem("user", JSON.stringify(received.user));
                fetchProfile();
            } else {
                console.log(received.message);
                setErrorText("Failed");
            }
        }
        catch(error){
            console.error('Error', error);
            window.alert("Failed to fetch");
            setErrorText("Failed");
        }
    }
    ////////////////////////////////////////////////////////////

    /*
    Fetch user information using token stored in localStorage
    If there is no access_token in localStorage, go back to login page
     */
    const [user, setUser] = useState(null);

    const fetchProfile = async () => {
        const token = localStorage.getItem("access_token");
        if(!token){
            window.alert("token error");
            window.location.href = "/login";
            return;
        }

        const response = await fetch(`${API}/profile/authorization`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        const _data = await response.json();


        if(response.ok){
            setUser(_data.user);
            localStorage.setItem("user", JSON.stringify(_data.user));
        } else {
            const text = response.text();
            console.log(text);

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
    };

    useEffect(() => {
        if(!localStorage.getItem("access_token") || !localStorage.getItem("user"))
            createUserToken();
        else
        fetchProfile();
    }, []); // For debugging

    // This is the actual code for release
    // Load profile
    // useEffect(() => {
    //     fetchProfile();
    // })


    if (!user)
        return <h1 style={{fontSize: "4rem", display: "block", textAlign: "center"}}>Loading...</h1>

    
    

    const notDefined = () => {
        setErrorText("The link/action event is not defined");
        setTimeout(()=>{setErrorText("")}, 2000);
    } // Just for debugging

    

    // For both account
    const profileList = [
        {text: "Edit personal information", url: '', onClick:()=>setDisplay(DISPLAY.personalInfo)},
        {text: "Saved payment option", url: "", onClick:notDefined},
        {text: "Setup your preference", url: "", onClick:notDefined},
        {text: "Notification settings", url: "", onClick: notDefined}
    ]

    // User
    const ticketList = [
        {text: "Upcoming event tickets", url: "", onClick:notDefined},
        {text: "Ordered tickets", url: "", onClick:notDefined}
    ]

    const userAccountIcons = [
        {label: "Ordered Tickets", url: "url1", icon: faTicket},
        {label: "Upcoming Events", url: "url2", icon: faCalendarAlt},
        {label: "Payment Method", url: "url1", icon: faIdCard}
    ]

    // Event Organizer
    const organizerList = [
        {text: "Manage events", url: "", onClick:notDefined},
        {text: "Upcoming events", url: "", onClick:notDefined},
        {text: "Previous events", url: "", onClick:notDefined},
        {text: "Event analytics", url: "", onClick:notDefined},
    ]

    const managementIcons = [
        {label: "Manage Events", url: "url1", icon: faCalendarAlt},
        {label: "Upcoming Events", url: "url2", icon: faRunning},
        {label: "Create New Events", url: "url2", icon: faPlusCircle},
        {label: "Payment Method", url: "url1", icon: faIdCard},
        {label: "Analytics", url: "url3", icon: faChartLine},
    ]
    
        const orgAccountIcons = [
        {label: "Edit Profile", url: "url1", icon: faUserAlt},
        {label: "Security Information", url: "url2", icon: faShieldAlt}
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
                    display==DISPLAY.home ? (
                        
                        <div className="iconList">
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
                                            <DefaultIconButton title={item.label} icons={item.icon}></DefaultIconButton>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <h1 className="listLabel">Event Management</h1>
                                            {managementIcons.map((item) => (
                                                <DefaultIconButton title={item.label} icons={item.icon}></DefaultIconButton>
                                            ))}
                                        </div>
                                        <div>
                                            <h1 className="listLabel">Your Account</h1>
                                            {orgAccountIcons.map((item) => (
                                                <DefaultIconButton title={item.label} icons={item.icon}></DefaultIconButton>
                                            ))}
                                        </div>
                                    </>
                                    
                                )
                            }
                        </div>
                    ) : display==DISPLAY.personalInfo ? (
                        <PersonalForm username={user["user_name"]} toHome={()=>setDisplay(DISPLAY.home)}/>
                    ) : (
                        <h2> Error </h2>
                    )
                }
            </Split>
        </>
    )
}