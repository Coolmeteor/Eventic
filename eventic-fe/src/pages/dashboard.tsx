import DefaultButton from "@/components/DefaultButton";
import { EventCard } from "@/components/EventCard";
import { HorizontalScrollList } from "@/components/ScrollerLists/HorizontalScroll";
import Section from "@/components/Section";
import { API, mockEvents } from "@/constants";
import { EventData } from "@/constants";
import { useEffect, useState } from "react";



export default function Dashboard() {
    // Shoei - I temporarily put the event data as events<EventData[]> to fix the hydration error
    // This useState-useEffect solution works even if we fetch event data from the backend at least in my local environment.
    const [events, setEvents] = useState<EventData[]>([]);

    const [yourEvents, setYourEvents] = useState<EventData[]>([])



    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)



    /**
         * Get data from backend for the page to load.
         * This also sends the search parameters for database queries
         */
    async function searchRequest() {
        const fetchCount = 10
        setLoading(true)
        let fetchUrl = `${API}/event/recommendation/${fetchCount}`


        try {
            // use data from, api
            console.log(`fetching event ${fetchUrl}`)
            let response

            response = await fetch(fetchUrl)

            console.log(response)
            if (!response.ok) throw new Error(`Failed to fetch event ${isSearch ? "search" : "recommendation"}`)
            console.log(response)

            const data: EventData[] = await response.json()
            setYourEvents(data) // expect an array of data


            // use mock data instead
            // setEventData([...mockEvents, ...mockEvents, ...mockEvents, ...mockEvents])
            // console.log("Using mock data instead of backend")

        } catch (error) {
            setError((error as Error).message + ": " + (error as Error).name)
            console.error("Error in search request:", error)
        } finally {
            setLoading(false)
        }
    }



    useEffect(() => {
        setEvents(mockEvents);

        const fetchEvent = async () => {
            try {
                setLoading(true)
                await searchRequest()
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        };

        fetchEvent();
    }, []);
    // Shoei - You can delete this code block between the two Shoei comments if you find a better solution!

    return (
        <>
            <Section fullWidth={true} usePadding={false}>
                <h1>Dashboard</h1>

                {/* <div className="top-header">
                        
                    </div> */}

                <div className="main-content">

                    <div className="left">
                        <h2>Recently visited</h2>
                        <HorizontalScrollList>
                            {events.map((event) => (
                                <li className="scroll-list">
                                    <EventCard btn={{ click: () => { window.location.href = `/event/${event.id}`; }, text: "View more" }}
                                        key={event.id} event={event} large={false} />
                                </li>
                            ))
                            }
                        </HorizontalScrollList>

                        <h2>Comming soon</h2>
                        <HorizontalScrollList>
                            {events.map((event) => (
                                <li className="scroll-list">
                                    <EventCard btn={{ click: () => { window.location.href = `/event/${event.id}`; }, text: "View more" }}
                                        key={event.id} event={event} large={false} />
                                </li>
                            ))
                            }
                        </HorizontalScrollList>




                        <h2>Your events</h2>
                        <HorizontalScrollList>
                            {yourEvents.map((event) => (
                                <li className="scroll-list">
                                    <EventCard btn={{ click: () => { window.location.href = `/event/edit/${event.id}`; }, text: "Edit" }}
                                        key={event.id} event={event} large={false} />
                                </li>
                            ))
                            }
                        </HorizontalScrollList>

                    </div>


                    <div className="rsb">
                        {/*  put some extra stuff here */}
                        <div className="action-buttons">
                            <DefaultButton textColor="var(--color-primary)" onClick={() => window.location.href = "/event/create"}>Create new</DefaultButton>
                            <DefaultButton textColor="var(--color-primary)" onClick={() => window.location.href = "/event"}>Something else</DefaultButton>
                        </div>

                        <div className="spacer"></div>

                    </div>
                </div>


            </Section>


            <style jsx>{`

.full-w {
    width: 100%;
    flex-direction: column;
    display: flex;
}
.spacer {
    height: 2em;
}

.vertical-spacer {
    width: 2em;
}


h1 {
    font-size: var(--font-size-header-S);
    margin-bottom: 1em;
    padding-top: 28px;
}


h2 {
    font-size: var(--font-size-header-XS);
    margin-bottom: 0.5em;
    padding-top: 0.2em;
}


.top-header {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;

    color: white;
    background-color: var(--color-onPrimary);
    padding: 1em;
}
    




.main-content {
    display: flex;
    flex-direction: row;
    width: 100%;

    padding: 1em;
}

.left {
    display: flex;
    flex-direction: column;
    gap: 1em;

    overflow-x: hidden;
    
}




.rsb {
    min-width: 400px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-background-mid);

    padding: 1em;
    }
.rsb div  {
    // margin-bottom: 3em;
}
@media (max-width: 1000px) {
    .rsb {
        min-width: 250px;
    }
}
.rsb h2 {
    padding: 0.4em;
    padding-left: 0;
    font-size: var(--font-size-header-XS);
}
.rsb p {
    padding-left: 1em;
    padding-right: 1em;
    font-size: var(--font-size-body-L);
}



.action-buttons {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: top;
    margin: 1em;
    gap: 1em;
}
.errortext {
    color: red;
    font-size: var(--font-size-body-L);
}
             
            `}</style>
        </>
    )
}