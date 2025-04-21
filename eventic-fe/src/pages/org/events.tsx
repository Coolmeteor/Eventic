import { useEffect, useState } from "react";
import { EventCard } from "@/components/EventCard";
import { EventData } from "@/constants";
import { FetchOrgEvents, OrgEventFetchParam } from "@/utils/statistics";
import { LoadingMessage } from "@/components/LoadingMessage";
import ProfileLayout from "@/components/Layouts/ProfileLayout";
import RightContainer from "@/components/Profile/RightContainer";
import { fetchProfile } from "@/utils/profile-api";
import { Forbidden } from "@/components/Forbidden";

type Props = {
    fetchParam: OrgEventFetchParam;
}
export default function OrgEvents({
    fetchParam="all",
}: Props){
    const [events, SetEvents] = useState<EventData[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOrg, setIsOrg] = useState(true);

    // Check permission status
    useEffect(() => {
        fetchProfile()
                .then((userData) => {
                    if(userData && "user" in userData){
                        setIsOrg(userData.user.is_org);
                    }
                    else {
                        window.location.href = '/';
                    }
                });
    }, [])


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
            setTimeout(() => { window.location.href = "/" }, 2000);
        }
    }

    return (
        <RightContainer pageName="Your events">
            <div className="event-container">
                <h2>Your events</h2>
                {!isOrg ? (
                    <div className='error-text'>
                        <Forbidden/>
                        <LoadingMessage>
                            Redirecting to home
                        </LoadingMessage>
                    </div>
                ) : isLoading ? (
                    <div className='error-text'>
                        <LoadingMessage>
                            Loading
                        </LoadingMessage>
                    </div>
                ) : events == null ? (
                    <div className='error-text'>
                        <LoadingMessage>
                            Redirecting to home
                        </LoadingMessage>
                    </div>
                    
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
                flex-wrap: wrap;
                
                gap: 2em;
                justify-content: space-evenly;
                align-items: flex-start;
                width: 100%;
                padding: 1em;
                border: 3px solid black;
            }

            .error-text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
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