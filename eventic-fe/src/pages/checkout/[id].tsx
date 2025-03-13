import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Section from "@/components/Section";
import { faSquarePersonConfined } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API, EventData } from "@/constants";
import { EventCardLarge } from "@/components/EventCard";


export default function Event() {
    const router = useRouter();
    const { id } = router.query // intend to get data from server, but that isnt set up yet
    // so then this just tells what mock data to use.
    // ex: 102 loads event 102
    // 000 loads all events
    // 002 loads two events
    // 003 loads 3 events

    const [eventData, setEventData] = useState<EventData[]>([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        if (!id) return;


        const fetchEvent = async () => {
            try {
                setLoading(true);

                // data from, api
                // console.log(`fetching event ${API}/events/${id}`)
                // const response = await fetch(`${API}/events/${id}`)
                // console.log(response)
                // if (!response.ok) throw new Error("Failed to fetch event")
                // const data: EventData = (await response.json())[0]
                // setEventData(data)

                // use mock data instead
                if (id === "000") {
                    setEventData(mockEvents)
                }
                else if (id === "002") {
                    setEventData(mockEvents.slice(0, 2))
                }
                else if (id === "003") {
                    setEventData(mockEvents.slice(0, 3))
                } else {
                    setEventData(
                        mockEvents.filter((event) => event.id === parseInt(id))
                    )
                }

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







                        <div className="event-content">



                            <div className="event-detail">

                                <h1>RSVP Checkout</h1>


                                <p>Please confirm your order to proceed with the event checkout.</p>

                                {eventData.map((event) => (
                                    <EventCardLarge event={event} large={true} />
                                ))}


                                <h2>Terms and Conditions</h2>
                                <p>By using our platform, you agree to the following terms and conditions:</p>

                                <ol>
                                    <li><strong>1. Event Information:</strong> All event details, including dates, pricing, and availability, are subject to change without prior notice.</li>
                                    <li><strong>2. Booking & Payment:</strong> Payments must be completed at checkout. Refunds are subject to the event organizer's policy.</li>
                                    <li><strong>3. Cancellations:</strong> If an event is canceled, you may be eligible for a refund based on the organizer’s refund policy.</li>
                                    <li><strong>4. User Responsibility:</strong> You are responsible for ensuring that the information you provide is accurate and up to date.</li>
                                    <li><strong>5. Privacy & Data:</strong> Your personal information will be handled in accordance with our <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</li>
                                    <li><strong>6. Prohibited Activities:</strong> Unauthorized reselling of tickets, fraudulent activity, or misuse of the platform may result in account suspension.</li>
                                </ol>

                                <div className="next-steps-list">
                                    <h2>What to do after checkout</h2>
                                    <ol>
                                        <li><strong>1. Review Event Details:</strong> Double-check the event information before proceeding.</li>
                                        <li><strong>2. Confirm Order:</strong> Click <strong>"Confirm Order"</strong> to finalize your booking.</li>
                                        <li><strong>3. Receive Confirmation:</strong> You’ll receive a confirmation email with event details.</li>
                                        <li><strong>4. Prepare for the Event:</strong> Follow any instructions from the organizer, such as venue guidelines or entry requirements.</li>
                                    </ol>
                                </div>

                            </div>

                            <div className="rsb">
                                <div className="cart-detail">
                                    <h2>Your cart</h2>

                                    <p>Price: {eventData.pricing}</p>
                                  
                                </div>
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

            .event-detail h2, .cart-detail h2, .organizer-detail h2 {
                padding: 0.4em;
                padding-left: 0;
                font-size: var(--font-size-header-XS);
            }

        


            .gallery {
                padding: 1em;
            }




            .cart-detail {
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



        


                .next-steps-list {
                    margin-top: 20px;
                    padding: 15px;
                    background: #f8f9fa;
                    border-left: 5px solid #007bff;
                }

                 ul {
            padding-left: 20px;
        }

        h2 {
        
            font-size: var(--font-size-header-XS);
            }

        ul li {
                
            margin-bottom: 10px;
        }

        a {
            color: #007bff;
            text-decoration: underline;

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