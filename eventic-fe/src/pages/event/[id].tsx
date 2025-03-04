import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Section from "@/components/Section";
import { faCalendar, faLocationArrow, faSquarePersonConfined } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImageCarousell } from "@/components/ImageCarousell";
import { MiniHorizontalScroll, TextWithIcon } from "@/components/ScrollerLists/HorizontalScroll";
import { API } from "@/constants";

// event id 100, 101, 102 are avalible currently.
type EventData = {
    id: number;
    name: string;
    description: string;
    media: string[]; // url or base64
    tags: string[]; // aka keywords
    category: string; // aka generes

    startDate: number; // use iso whatever ms since 1970 i guess
    endDate: number; // use iso whatever ms since 1970 i guess
    locationString: string; // human readable address
    locationLong: number;
    locationLat: number;

    visibility: string; // private, public
    maxParticipants: number;
    currentParticipants: number;
    pricing: number;


    creator: string; // organizer info. maybe later pass a user object
    createdAt: number;
    updatedAt: number;
}

// create list of mock eveent data


export default function Event() {
    const router = useRouter();
    const { id } = router.query


    const [eventData, setEventData] = useState<EventData | null>(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const mockIcons = [
        "file.svg",
        "globe.svg",
        "next.svg",
        "vercel.svg",
        "window.svg",
        "file.svg",
        "globe.svg",
        "next.svg",
        "vercel.svg",
        "window.svg",
        "file.svg",
        "globe.svg",
        "next.svg",
        "vercel.svg",
        "window.svg",
        "file.svg",
        "globe.svg",
        "next.svg",
        "vercel.svg",
        "window.svg",
    ]




    useEffect(() => {
        if (!id) return;

        const fetchEvent = async () => {
            try {
                setLoading(true);

                // data from, api
                console.log(`fetching event ${API}/events/${id}`)
                const response = await fetch(`${API}/events/${id}`)
                console.log(response)
                if (!response.ok) throw new Error("Failed to fetch event")
                const data: EventData = (await response.json())[0]
                setEventData(data)

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
    }, [id]);

    return (
        <>
            <Section>
                {loading && <p>Loading...</p>}
                {error && <p>Error loading event: {error}</p>}

                {eventData != undefined && eventData != null &&
                    <div>

                        <h1>{eventData?.name}</h1>

                        <div className="event-hero-container">
                            <img className="event-hero-image" src={"../" + eventData?.media[0]} alt="Event Image" />
                        </div>

                        <div className="event-content">

                            <div className="event-detail">

                                <div className="location-date">
                                    <div className="location-date-inner">
                                        <FontAwesomeIcon icon={faLocationArrow} />
                                        <p>{eventData.locationString}</p>
                                    </div>
                                    <div className="location-date-inner">
                                        <FontAwesomeIcon icon={faCalendar} />
                                        <p>{new Date(eventData.startDate).toDateString()}</p>
                                        <p>—</p>
                                        <p>{new Date(eventData.startDate).toDateString()}</p>
                                    </div>

                                </div>
                                <h2>Description</h2>
                                <p className="event-detail-text">{eventData.description}</p>
                                <div className="spacer"></div>


                                {/* category and tags in a horztoal list for both */}
                                <div className="category-tags">
                                    <h2>Category</h2>
                                    <MiniHorizontalScroll textWithIcons={
                                        [{ icon: mockIcons[Math.floor(Math.random() * mockIcons.length)], text: eventData.category }]
                                    } />
                                </div>

                                <div className="category-tags">
                                    <h2>Tags</h2>
                                    <MiniHorizontalScroll textWithIcons={
                                        eventData.tags.map((tag, index) => (
                                            { icon: mockIcons[Math.floor(Math.random() * mockIcons.length)], text: tag }
                                        ))
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
                                    <p>Price: {eventData.pricing}</p>
                                    <p>Max Participants: {eventData.maxParticipants}</p>
                                    <p>Current Participants: {eventData.currentParticipants}</p>
                                </div>

                                <div className="organizer-detail">
                                    <h2>Organizer</h2>
                                    <p>{eventData.creator}</p>
                                    <div className="organizer-icon">
                                        <FontAwesomeIcon icon={faSquarePersonConfined} fontSize={"170px"} />
                                    </div>
                                    <p>Posted: {new Date(eventData.createdAt).toDateString()}</p>
                                    <p>Updated: {new Date(eventData.updatedAt).toDateString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="related-events">
                            <div className="placeholder-related-events">
                            </div>
                            <div className="placeholder-related-events">
                            </div>
                            <div className="placeholder-related-events">
                            </div>
                            <div className="placeholder-related-events">
                            </div>
                            <div className="placeholder-related-events">
                            </div>


                        </div>
                    </div>
                }


                <p>dev: Event ID: {id} visibility: {eventData?.visibility}</p>
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



                .related-events {
                    display: flex;
                    flex-direction: row;
                    justify-content: left;
                    align-items: top;

                    margin-top: 2em;
                    background-color: purple;
                    padding: 2em;

                    overflow-x: scroll;
                   
                }

                .placeholder-related-events {
                    width: 400px;
                    height: 250px;
                    margin-right: 3em;
                    background-color: pink;
                }
            `}</style>
        </>

    );
}







































const mockEvents: EventData[] = [
    {
        id: 100,
        name: "Tech Conference 2025",
        description: "A gathering of tech enthusiasts and professionals.",
        media: [
            "eventmock.png",
            "eventmock2.jpg"
        ],
        tags: ["technology", "conference", "networking"],
        category: "Technology",

        startDate: 1735689600000, // 1 Jan 2025, in milliseconds
        endDate: 1735776000000, // 2 Jan 2025
        locationString: "San Francisco, CA",
        locationLong: -122.4194,
        locationLat: 37.7749,

        visibility: "public",
        maxParticipants: 500,
        currentParticipants: 320,
        pricing: 99.99,

        creator: "Tech Corp",
        createdAt: 1735000000000,
        updatedAt: 1735500000000,
    },
    {
        id: 101,
        name: "Jazz Music Night",
        description: "A night filled with soulful jazz performances.",
        media: [

            "eventmock2.jpg"
        ],
        tags: ["music", "jazz", "concert"],
        category: "Music",

        startDate: 1737000000000, // 15 Jan 2025
        endDate: 1737086400000, // 16 Jan 2025
        locationString: "New Orleans, LA",
        locationLong: -90.0715,
        locationLat: 29.9511,

        visibility: "public",
        maxParticipants: 300,
        currentParticipants: 250,
        pricing: 49.99,

        creator: "Jazz Events Inc.",
        createdAt: 1735000000000,
        updatedAt: 1735500000000,
    },
    {
        id: 102,
        name: "Startup Pitch Competition",
        description: "Pitch your startup idea and win funding. Open to all entrepreneurs. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        media: [

            "eventmock2.jpg"
        ],
        tags: ["startup", "entrepreneurship", "business"],
        category: "Business",

        startDate: 1738200000000, // 1 Feb 2025
        endDate: 1738286400000, // 2 Feb 2025
        locationString: "New York, NY",
        locationLong: -74.006,
        locationLat: 40.7128,

        visibility: "private",
        maxParticipants: 100,
        currentParticipants: 75,
        pricing: 0,

        creator: "VC Fund",
        createdAt: 1735000000000,
        updatedAt: 1735500000000,
    }
];