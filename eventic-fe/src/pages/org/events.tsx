import { useEffect, useState } from "react";
import { EventCard } from "@/components/EventCard";
import { EventData } from "@/constants";
import { FetchOrgEvents } from "@/utils/statistics";
import { LoadingMessage } from "@/components/LoadingMessage";
import ProfileLayout from "@/components/Layouts/ProfileLayout";
import RightContainer from "@/components/Profile/RightContainer";

export default function OrgEvents(){
    const [events, SetEvents] = useState<EventData[]>([]);


    useEffect(() => {
        const loadData = async () => {
            const events = await FetchOrgEvents();

            if(events && "events" in events){
                console.log(events);
                SetEvents(events.events);
            }
        };

        loadData();
    }, []);


    if(events.length == 0){
        return <LoadingMessage>Loading</LoadingMessage>
    }

    return (
        <RightContainer pageName="Your events">
            <div className="event-container">
                <h2>Your events</h2>
                <div className="event-list">

                    {events.map((event) => (
                        <EventCard btn={{ click: () => { window.location.href = `/event/edit/${event.id}`; }, text: "Edit" }}
                            key={event.id} event={event} large={false} />
                    ))
                    }
                </div>
            </div>

            <style jsx>{`
            .event-container {
                width: 100%;
                height: 100%;
                padding: 1rem;
            }

            .event-container h2 {
                font-size: 2rem;
                margin: 1rem;
            }

            .event-list {
                display: flex;
                flex-direction: row;
                // flex-wrap: scroll;
                
                gap: 1em;
                justify-content: left;
                align-items: top;
                width: 100%;
                padding: 1em;
            }
            `}</style>
            
        
        
        </RightContainer>
    )
}

OrgEvents.getLayout = function getLayout(page: React.ReactNode) {
    return <ProfileLayout>{page}</ProfileLayout>
}