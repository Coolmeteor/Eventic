import { useState, useEffect, ReactNode } from "react";
import Split from "react-split";
import DashboardList from "@/components/Profile/DashboardList";
import { organizerList, profileList, ticketList } from "@/utils/profile-page-mng";
import { fetchProfile, User } from "@/utils/profile-api";
import { LoadingMessage } from "../LoadingMessage";

interface ProfileLayoutProps {
    children: ReactNode;
}

export default function ProfileLayout({ 
    children,
}: ProfileLayoutProps){

    const [user, setUser] = useState<User>();
    
    useEffect(()=>{
        fetchProfile()
        .then((userData) => {
            if(userData && "user" in userData){
                setUser(userData.user as User);
            }
        });
    }, []);

    if (!user)
        return <LoadingMessage>Loading</LoadingMessage>

    return(
        <>  
            <Split className="flex" sizes={[25, 75]}>
                {/* Left Component*/}
                
                {
                    !user.is_org ? (
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
                    <div className="right-container">
                        {children}
                    </div>
                }
            </Split>

            <style jsx>{`
            .right-container {
                min-height: 500px;
                width: 100%;
            }
            `}</style>
        </>
    )
}