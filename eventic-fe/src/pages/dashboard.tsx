import DefaultIconButton from "@/components/DefaultIconButton";
import { EventCard } from "@/components/EventCard";
import { LoadingMessage } from "@/components/LoadingMessage";
import { HorizontalScrollList } from "@/components/ScrollerLists/HorizontalScroll";
import Section from "@/components/Section";
import { API, mockEvents } from "@/constants";
import { EventData } from "@/constants";
import { fetchProfile, User } from "@/utils/profile-api";
import { dashboardIcons, managementIcons } from "@/utils/profile-page-mng";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";



export default function Dashboard() {

    // event data
    const [fillerevents, setFillerEvents] = useState<EventData[]>([]);
    const [yourEvents, setYourEvents] = useState<EventData[]>([])
    const [newEvents, setNewrEvents] = useState<EventData[]>([])
    const [happenSoonEvents, setHappenSoonEvents] = useState<EventData[]>(fillerevents.filter((event) => event.start_date > Date.now()).slice(0, 10))


    // user 
    const [isOrganizer, setIsOrganizer] = useState<boolean>(true)
    const [user, setUser] = useState<User>()


    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [loading3, setLoading3] = useState(false)
    const [error, setError] = useState<string | null>(null)



    /**
         * Get data from backend for the page to load.
         * This also sends the search parameters for database queries
         */
    async function fetchYourEvents() {
        const fetchCount = 7
        setLoading3(true)
        let fetchUrl = `${API}/event/recommendation/${fetchCount}`


        try {
            // use data from, api
            console.log(`fetching event ${fetchUrl}`)
            let response

            response = await fetch(fetchUrl)

            console.log(response)
            if (!response.ok) throw new Error(`Failed to fetch event recommendation`)
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
            setLoading3(false)
        }
    }

    async function fetchtNewEvents() {

       
        let fetchUrl = `${API}/event/new_postings`
        try {

            setLoading1(true)
            // use data from, api
            console.log(`fetching event ${fetchUrl}`)
            let response = await fetch(fetchUrl)

            console.log(response)
            if (!response.ok) throw new Error(`Failed to fetch event recommendation`)
            console.log(response)

            const data: EventData[] = await response.json()
            setNewrEvents(data) // expect an array of data



            // use mock data instead
            // setNewrEvents(mockEvents)

        } catch (error) {
            setError((error as Error).message + ": " + (error as Error).name)
            console.error("Error in search request:", error)
            setNewrEvents(mockEvents)
        } finally {
            setLoading1(false)
        }
    }

    async function fetchtHappenSoonEvents() {


        let fetchUrl = `${API}/event/happening_soon`
        try {
            setLoading2(true)
            // use data from, api
            console.log(`fetching event ${fetchUrl}`)
            let response = await fetch(fetchUrl)

            console.log(response)
            if (!response.ok) throw new Error(`Failed to fetch event recommendation`)
            console.log(response)

            const data: EventData[] = await response.json()
            setHappenSoonEvents(data) // expect an array of data



            // use mock data instead
            // setHappenSoonEvents(mockEvents)

        } catch (error) {
            setError((error as Error).message + ": " + (error as Error).name)
            console.error("Error in search request:", error)
            setHappenSoonEvents(mockEvents)
        } finally {
            setLoading2(false)
        }
    }




    useEffect(() => {
        setFillerEvents(mockEvents);

        const fetchEvent = async () => {
            try {
                setLoading(true)
              
                // Fetch user info
                const loadUser = async () => {
                    const userData = await fetchProfile();

                    if (userData && "user" in userData) {
                        setUser(userData.user);
                        setIsOrganizer(userData.user.is_org);
                    }
                }

                loadUser();
                setLoading(false)

                setLoading1(true)
                setLoading2(true)
                setLoading3(true)
                fetchYourEvents()
                fetchtNewEvents()
                fetchtHappenSoonEvents()
            } catch (err) {
                setError((err as Error).message)
            } finally {
                // setLoading(false)
            }
        };

        fetchEvent();
    }, []);

    if (!user)
        return <h1 style={{ fontSize: "4rem", display: "block", textAlign: "center" }}>Loading...</h1>

    let avalibleIcons: {
        label: string;
        onClick: () => void;
        icon: IconDefinition;
    }[] = []
    avalibleIcons = avalibleIcons.concat(dashboardIcons)
    if (isOrganizer) {
        avalibleIcons = avalibleIcons.concat(managementIcons.filter((item) => item.label != "Payment Method"))

    } else {
        avalibleIcons = avalibleIcons.concat(managementIcons.filter((item) => (item.label !== "Payment Method" && item.label !== "Create New Event" && item.label !== "Manage Events" && item.label !== "Analytics")))
    }
    return (
        <>
            <Section fullWidth={true} usePadding={true}>
                <h1>Dashboard</h1>

                {/* <div className="top-header">
                        
                    </div> */}

                <div className="main-content">

                    <div className="left">

                        {isOrganizer && <h2>Your events</h2>}
                        {isOrganizer &&
                            <HorizontalScrollList>
                                {loading3 && <LoadingMessage>Loading</LoadingMessage>}
                                {yourEvents.map((event) => (
                                    <li className="scroll-list">
                                        <EventCard btn={{ click: () => { window.location.href = `/event/edit/${event.id}`; }, text: "Edit" }}
                                            key={event.id} event={event} large={false} />
                                    </li>
                                ))
                                }
                            </HorizontalScrollList>
                        }

                        <h2>Recently posted</h2>
                        <HorizontalScrollList>
                            {loading1 && <LoadingMessage>Loading</LoadingMessage>}
                            {newEvents.map((event) => (
                                <li className="scroll-list">
                                    <EventCard btn={{ click: () => { window.location.href = `/event/${event.id}`; }, text: "View more" }}
                                        key={event.id} event={event} large={false} />
                                </li>
                            ))
                            }
                        </HorizontalScrollList>

                        <h2>Happening soon</h2>

                        <HorizontalScrollList>
                            {loading2 && <LoadingMessage>Loading</LoadingMessage>}

                            {happenSoonEvents.map((event) => (
                                <li className="scroll-list">
                                    <EventCard btn={{ click: () => { window.location.href = `/event/${event.id}`; }, text: "View more" }}
                                        key={event.id} event={event} large={false} />
                                </li>
                            ))
                            }
                        </HorizontalScrollList>


                        <div className="spacer"></div>

                    </div>

                    <div className="rsb">
                        {/*  put some extra stuff here */}
                        <h2>Control center</h2>
                        <div className="cc-button">
                            {avalibleIcons.map((item) => (
                                <DefaultIconButton title={item.label} icons={item.icon} iconSize="20px" onClick={item.onClick} className="small"></DefaultIconButton>
                            ))}
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
    width: 100%;
}




.rsb {
    // max-width: 400px;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    align-content: center;
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

.cc-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}

.action-buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
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