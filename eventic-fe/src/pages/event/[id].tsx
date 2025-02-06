import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Section from "@/components/Section";

// const API = "http://localhost:25753/apitest";
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

    useEffect(() => {
        if (!id) return;

        const fetchEvent = async () => {
            try {
                setLoading(true);

                // console.log(`fetching event ${API}/event/${id}`)
                // const response = await fetch(`${API}/event/${id}`)
                // if (!response.ok) throw new Error("Failed to fetch event")
                // const data: EventData = (await response.json())[0]

                // make loading status show for now
                setTimeout(() => {
                    // console.log(data);
                    // setEventData(data)

                    setEventData(
                        mockEvents.filter((event) => event.id === parseInt(id))[0]
                    )
                    setLoading(false)
                }, 2000);

            } catch (err) {
                setError((err as Error).message)
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

                        <div className="event-hero-img">
                            <img src={"../" + eventData?.media[0]} alt="Event Image" />
                        </div>

                        <div className="event-content">

                            <div className="event-detail">

                                <h2>Event Details</h2>
                                <p>{eventData.description}</p>
                                <p>{eventData.category}</p>
                                <p>{eventData.tags}</p>
                                <p>{eventData.startDate}</p>
                                <p>{eventData.endDate}</p>
                                <p>{eventData.locationString}</p>
                                <p>{eventData.pricing}</p>
                                {/* <p>{eventData?.visibility}</p> */}
                                <p>{`${eventData.currentParticipants}/${eventData.maxParticipants}`}</p>
                                <p>{ }</p>

                                {/*  gallery here */}

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
                                    <p>{eventData.createdAt}</p>
                                    <p>{eventData.updatedAt}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }


                <p>dev: Event ID: {id} visibility: {eventData?.visibility}</p>
            </Section>

            <style jsx>{`
            h1 {
                font-size: 2em;
                margin-bottom: 1em;
            }

            .event-content {
                display: flex;
                flex-direction: row;
                width: 100%;
            }

            .rsb {
                display: flex;
                flex-direction: column;
            }
            .event-detail {
                display: flex;
                flex-direction: column;
                   justify-content: left;
                align-items: top;
                 width: 100%;
                background-color: coral;
            }

            .ticket-detail {
                display: flex;
                flex-direction: column;
                justify-content: left;
                align-items: top;
                background-color: green
        
            }

            .organizer-detail {
                display: flex;
                flex-direction: column;
                justify-content: left;
                align-items: top;
                background-color: red;   
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
      description: "Pitch your startup idea and win funding.",
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