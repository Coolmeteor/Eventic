import ProfileLayout from "@/components/Layouts/ProfileLayout"
import PersonalForm from "@/components/Profile/PersonalForm";
import { useEffect, useMemo, useState } from "react";
import { EventData, mockEvents } from "@/constants";
import EventCard from "@/components/EventCard";
import { User, fetchProfile } from "@/utils/profile-api";


const tickets = mockEvents;
export default function orders(){
    const [tickets, setTickets] = useState<EventData[]>([]);

    const [user, setUser] = useState<User>();

    useEffect(()=>{
        fetchProfile()
        .then((user) => {
            if(user && "user" in user){
                setUser(user.user);
            }
        });
    }, [])

    // Fetch purchased tickets/event data
    // const tickets = await fetch(######);
    // const error;

    useEffect(() => {
        setTickets(mockEvents);
    });

    if(!tickets || !user)
        return <h1>Loading...</h1>;

    return (
        <>
            <PersonalForm pageName="Orders" user={user}>
                <div className="order-container">
                    <h1 className="listLabel">Ordered Tickets</h1>
                    <div className="order-list">
                        {tickets.map((event) => {
                            console.log("Event id: ", event.id);
                            return <EventCard key={event.id} event={event} large={false} />
                        })}
                    </div>
                </div>
            </PersonalForm>
            <style jsx>{`
                .order-container{
                    text-align: center;
                    
                    width: 90%;
                    min-height: 500px;
                    margin: 10px;
                    border: 1px solid black;
                }
                    
                .order-list {
                    display: flex;
                    padding: 0 2rem 0 2rem;
                    gap: 1em;
                    justify-content: left;
                    align-items: top;
                    width: 100%;
                }
            `}</style>
        </>
    );
}

orders.getLayout = function getLayout(page: React.ReactNode){
    return <ProfileLayout>{page}</ProfileLayout>
}