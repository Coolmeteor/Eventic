import DefaultLinkButton from "../../DefaultLinkButton"
import DashboardList from "../DashboardList";
import {useState, useEffect} from 'react';

export default function OProfileDashboard(){
    const width = "300px";
    const [testText, setText] = useState<string>("");
    const profileList = [
        {text: "Username and passward", url: "", onClick:setText},
        {text: "Saved payment option", url: "", onClick:setText},
        {text: "Setup your preference", url: "", onClick:setText},
        {text: "Mail address / phone number", url: "", onClick: setText},
        {text: "Edit notification and mail subscription", url: "", onClick: setText}
    ]

    const ticketList = [
        {text: "Upcoming event tickets", url: "", onClick:setText},
        {text: "Ordered tickets", url: "", onClick:setText}
    ]

    return (
        <>
            <div className="dashboard">
                <div className="box">
                    <span className="listName">Personal Information</span>
                    <DashboardList list={profileList}></DashboardList>
                </div>
                <div className="box">
                    <span className="listName">Tickets</span>
                    <DashboardList list={ticketList}></DashboardList>
                </div>
            </div>

            <style jsx>{`
                .box{
                    margin: 10px;
                    background: var(--color-background-light)
                }

                .listName{
                    margin: 20px;
                }
                
            `}
            </style>
        </>
    )
}