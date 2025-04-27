import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Section from "@/components/Section";
import { faCalendar, faLocationArrow, faSquarePersonConfined } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImageCarousell } from "@/components/ImageCarousell";
import { MiniHorizontalScroll } from "@/components/ScrollerLists/HorizontalScroll";
import { API, enableMockEvents, EventData, mockEvents } from "@/constants";
import { getEventIcon } from "@/utils/utils";
import { HorizontalEventList } from "@/components/ScrollerLists/HoritonalEventList";
import { extractEventCardData } from "@/utils/format";
import { EventItemProps, fetchAddCart } from "@/utils/event";
import { fetchProfile, fetchUserInfo, User } from "@/utils/profile-api";

export default function Event() {
    const router = useRouter();
    const { id } = router.query

    const [user, setUser] = useState<User>()

    const [eventData, setEventData] = useState<EventData | null>(null)
    const [quickPicksData, setQuickPicksData] = useState<EventItemProps[]>([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [addCartText, setAddCartText] = useState<string | null>(null);


    /**
     * Fetch personalized event recommendations from back end api
     */
    async function fetchRecommendations() {
        // setLoading(true) // this is background task
        const fetchCount = 5
        let fetchUrl = `${API}/event/recommendation/${fetchCount}`

        try {
            // use data from, api
            console.log(`fetching events from individual event page ${fetchUrl}`)
            const response = await fetch(fetchUrl)

            console.log(response)
            if (!response.ok) throw new Error(`Failed to fetch event "recommendation"`)
            console.log(response)

            const data: EventData[] = await response.json()
            setQuickPicksData(data.map(extractEventCardData)) // expect an array of data

        } catch (error) {
            setError((error as Error).message + ": " + (error as Error).name)
            console.error("Error in search request:", error)
        } finally {
            // setLoading(false) // this is background task
        }
    }

    const handleButtonClick = async () => {
        const isAdded = await fetchAddCart(eventData?.id as number, 1, eventData?.pricing as number);
        if (isAdded) {
            setAddCartText("Added to your cart");
            setTimeout(() => setAddCartText(null), 3000);
        }
        else {
            setAddCartText("Failed to add. Reloading page...");
            setTimeout(() => window.location.href = `/event/${id}`, 1000);
        }
    }

    useEffect(() => {
        if (!id) return;

        const fetchEvent = async () => {
            try {
                setLoading(true);

                if (enableMockEvents && (id == "100" || id == "101" || id == "102")) {
                    setEventData(mockEvents.filter((e) => e.id === parseInt(id))[0])
                    return
                }

                const fetchUrl = `${API}/event/events/${id}`
                // data from, api
                console.log(`fetching event ${fetchUrl}`)
                const response = await fetch(fetchUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                console.log(response)
                if (!response.ok) throw new Error("Failed to fetch event")
                const data: EventData = (await response.json())
                console.log("Data:", data);
                setEventData(data)


                // Fetch user info
                if (data.creator_id) {
                    const loadUser = async () => {
                        const userData = await fetchUserInfo(data.creator_id);

                        if (userData && "user" in userData) {
                            setUser(userData.user);

                        }
                    }
                    loadUser();
                }

                // use mock data instead
                // setEventData(
                //     mockEvents.filter((event) => event.id === parseInt(id))[0]
                // )



            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        };

        fetchEvent();
        fetchRecommendations()
    }, [id]);
    console.log("Event " + id, eventData)
    return (
        <>
            <Section>
                {loading && <p>Loading...</p>}
                {error && <p>Error loading event: {error}</p>}

                {eventData != undefined && eventData != null &&
                    <div>

                        <h1>{eventData?.name}</h1>

                        <div className="event-hero-container">
                            <img className="event-hero-image" src={eventData?.media[0]} alt="Event Image" />
                        </div>

                        <div className="event-content">

                            <div className="event-detail">

                                <div className="location-date">
                                    <div className="location-date-inner">
                                        <FontAwesomeIcon icon={faLocationArrow} />
                                        <p>{eventData.location_string}</p>
                                    </div>
                                    <div className="location-date-inner">
                                        <FontAwesomeIcon icon={faCalendar} />
                                        <p>{new Date(eventData.start_date).toDateString()}</p>
                                        <p>—</p>
                                        <p>{new Date(eventData.end_date).toDateString()}</p>
                                    </div>

                                </div>
                                <h2>Description</h2>
                                <p className="event-detail-text">{eventData.description}</p>
                                <div className="spacer"></div>


                                {/* category and tags in a horztoal list for both */}
                                <div className="category-tags">
                                    <h2>Category</h2>
                                    <MiniHorizontalScroll textWithIcons={
                                        [{ icon: getEventIcon(eventData.category), text: eventData.category }]
                                    } />
                                </div>

                                <div className="category-tags">
                                    <h2>Tags</h2>
                                    <MiniHorizontalScroll tags={
                                        eventData.tags
                                    } />

                                </div>


                                {/*  gallery here */}
                                <h2>Gallery</h2>
                                <div className="gallery">
                                    <ImageCarousell images={eventData.media} />
                                </div>

                            </div>

                            <div className="rsb">
                                <div className="ticket-detail">
                                    <h2>Ticket Details</h2>
                                    <p>Price: ${eventData.pricing}</p>
                                    <p>Max Participants: {eventData.max_participants}</p>
                                    <p>Current Participants: {eventData.current_participants}</p>
                                </div>

                                <div className="add-cart-container">
                                    {addCartText &&
                                        <h2 className="cart-text">{addCartText}</h2>
                                    }
                                    <button
                                        className="apply-button"
                                        onClick={handleButtonClick}
                                        disabled={new Date(eventData.start_date) < new Date()}
                                    >
                                        Add to cart
                                    </button>
                                </div>

                                <div className="organizer-detail">
                                    {user && <>
                                        <p>Posted: {new Date(eventData.created_at).toDateString()}</p>
                                        <p>Updated: {new Date(eventData.updated_at).toDateString()}</p>
                                        <div className="spacer"></div>


                                        <h2>Event organizer</h2>

                                        <div className="organizer-icon">
                                            <p>{user.user_name}</p>
                                            <FontAwesomeIcon icon={faSquarePersonConfined} fontSize={"170px"} />
                                        </div>


                                        <h2>Contact information</h2>
                                        <p>Email: {user.email}</p>
                                        <p>Phone: {user.phone}</p>
                                    </>}
                                </div>
                            </div>
                        </div>


                        <HorizontalEventList
                            title="Related Events"
                            EventCards={quickPicksData.filter((event) => event.id != eventData?.id)}
                        />
                    </div>
                }


                {process.env.NEXT_PUBLIC_DEV_MODE == "true" && <p>dev: Event ID: {id} visibility: {eventData?.visibility}</p>}
            </Section >

            <style jsx>{`

            .spacer {
                height: 2em;
            }
            h1 {
                font-size: var(--font-size-header-S);
                margin-bottom: 1em;
                padding-top: 28px;
            }

            .event-content {
                display: flex;
                flex-direction: row;
                width: 100%;
            }

            .rsb {
                min-width: 400px;
                display: flex;
                flex-direction: column;
                background-color: var(--color-background-mid);
            }
                .rsb div  {
                   margin-bottom: 3em;
                }
            @media (max-width: 1000px) {
                .rsb {
                    min-width: 250px;
                }
            }

            .event-detail {
                display: flex;
                flex-direction: column;
                   justify-content: left;
                align-items: top;
                 width: 100%;
                // background-color: coral;
            }

            .event-detail-text {
                padding-left: 1em;
                padding-right: 2em;
                font-size: var(--font-size-body-L);
            }

            .rsb p {
                padding-left: 1em;
                padding-right: 1em;
                font-size: var(--font-size-body-L);
            }

            .event-detail h2, .ticket-detail h2, .organizer-detail h2 {
                padding: 0.4em;
                padding-left: 0;
                font-size: var(--font-size-header-XS);
            }

            .location-date {
                display: flex;
                flex-direction: row;
                justify-content: left;
                align-items: top;
                background-color: rgb(189, 224, 214);
                padding: 1em;
            }


            .location-date-inner {
                display: flex;
                flex-direction: row;
                justify-content: left;
                align-items: top;
                background-color: yellow;
                padding: 1em;
                margin-right: 1em;
            }

            .location-date-inner * {
                margin-left: 1em;
            }



            .gallery {
                padding: 1em;
            }




            .ticket-detail {
                display: flex;
                flex-direction: column;
                justify-content: left;
                align-items: top;
                padding-left: 1em;
                // background-color: green
            }

            .organizer-detail {
                display: flex;
                flex-direction: column;
                justify-content: left;
                align-items: top;
                padding-left: 1em;
                // background-color: red;   
                }


                .organizer-icon {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding-right: 1em;
                    margin-top: 1em;
                }



                .event-hero-container {
                    margin-bottom: 1em;
                    width: 100%;
                    height: 400px;
                    overflow: hidden;
                    border-radius: 1rem;
                    border: 3px solid var(--color-background-dark);
                }

                .event-hero-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .add-cart-container {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;

                    margin: 1rem;
                    font-size: var(--font-size-body-L);
                }

                .cart-text {
                    font-size: 1.5rem;
                }

                .apply-button {
                    padding: 0.5rem;
                    width: 15rem;
                    background-color: var(--color-primary);
                    color: black;
                    border: none;
                    border-radius: 10px;
                    transition: .1s;
                }

                .apply-button:hover {
                    background-color: var(--color-primary-dark);
                }

                .apply-button:disabled {
                    background-color: #999999;
                    cursor: not-allowed;
                }

            `}</style>
        </>

    );
}
