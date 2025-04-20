import { useEffect, useState } from "react";
import { EventCard } from "@/components/EventCard";
import { EventData } from "@/constants";
import { FetchOrgEvents, OrgEventFetchParam } from "@/utils/statistics";
import { LoadingMessage } from "@/components/LoadingMessage";
import ProfileLayout from "@/components/Layouts/ProfileLayout";
import RightContainer from "@/components/Profile/RightContainer";

type Props = {
    fetchParam: OrgEventFetchParam;
}
export default function OrgEvents({
    fetchParam="all",
}: Props){
    const [events, SetEvents] = useState<EventData[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [messageContent, setMessageContent] = useState<React.ReactNode | null>(null);


    useEffect(() => {
        const loadData = async () => {
            const events = await FetchOrgEvents(fetchParam);

            if(events && "events" in events){
                console.log(events);
                SetEvents(events.events);
            }
            
            setIsLoading(false);
        };

        loadData();
    }, []);


    if(events == null){
        if (!isLoading) {
            setTimeout(() => { window.location.href = "/org" }, 2000);
            return;
        }
    }

    return (
        <RightContainer pageName="Your events">
            <div className="event-container">
                <h2>Your events</h2>
                {isLoading ? (
                    <LoadingMessage>
                        <p>Loading</p>
                    </LoadingMessage>
                ) : events == null ? (
                    <LoadingMessage>
                        <p>Redirecting to home</p>
                    </LoadingMessage>
                ) : events?.length ? (
                    <div className="event-list">
                        {events.map((event) => (
                            <EventCard btn={{ click: () => { window.location.href = `/event/edit/${event.id}`; }, text: "Edit" }}
                                key={event.id} event={event} large={false} />
                        ))
                        }
                    </div>
                ) : (
                    <p>No events found</p>
                )}
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

            p {
                font-size: 2rem;
                margin: 2rem;
            }
            `}</style>
            
        
        
        </RightContainer>
    )
}

OrgEvents.getLayout = function getLayout(page: React.ReactNode) {
    return <ProfileLayout>{page}</ProfileLayout>
}