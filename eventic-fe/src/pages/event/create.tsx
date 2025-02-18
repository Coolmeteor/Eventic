import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Section from "@/components/Section";
import MediaUploadBox from "@/components/MediaUploadBox";
import DefaultButton from "@/components/DefaultButton";
import InputMultiLine from "@/components/InputMultiLine";
import TagEditor from "@/components/TagEditor";
import { API } from "@/constants";

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


export default function CreateEvent() {
    const router = useRouter();
    const { id } = router.query // use same form for event edit id

    // form data. Media goes in images, the rest goes in eventData
    const [eventData, setEventData] = useState<EventData | null>(null)
    const [images, setImages] = useState<string[]>([]);

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        if (!id) {
            // blank form

            setEventData(
                {
                    id: -1,
                    name: "",
                    description: "",
                    media: [],
                    tags: [],
                    category: "",

                    startDate: 0,
                    endDate: 0,
                    locationString: "",
                    locationLong: 0,
                    locationLat: 0,

                    visibility: "public",
                    maxParticipants: 0,
                    currentParticipants: 0,
                    pricing: 0,

                    creator: "",
                    createdAt: 0,
                    updatedAt: 0,
                }
            )
        } else {
            const fetchEvent = async () => {
                try {
                    setLoading(true);

                    // console.log(`fetching event ${API}/event/${id}`)
                    // const response = await fetch(`${API}/event/${id}`)
                    // if (!response.ok) throw new Error("Failed to fetch event")
                    // const data: EventData = (await response.json())[0]

                    // make loading status show for now
                    // setTimeout(() => {
                    // console.log(data );
                    // setEventData(data)

                    setEventData(
                        mockEvents.filter((event) => event.id === parseInt(id))[0]
                    )
                    setLoading(false)
                    // }, 2000);

                } catch (err) {
                    setError((err as Error).message)
                    setLoading(false)
                }
            };

            fetchEvent();
        }


    }, [id]);


    /**
 * Upload form to server
 */
    async function submitForm() {
        console.log("submitting form", eventData, images);

        try {
            const response = await fetch(`${API}/event/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
                mode: "no-cors"
            });

            if (!response.ok) {
                throw new Error(`Failed to upload data to server: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            setError((error as Error).message);
            console.error("Error posting event:", error);
            return null;
        }

    }


    return (
        <>
            <Section>
                {/* {loading && <p>Loading...</p>} */}
                {error && <p>Error loading event: {error}</p>}

                {eventData != undefined && eventData != null &&
                    <div>

                        <h1>Create new event</h1>

                        <div className="event-content">

                            <div className="event-detail">
                                <h2>Title</h2>
                                <InputMultiLine initialValue={eventData.name} onChange={(e) => {
                                    setEventData({ ...eventData, name: e.target.value })
                                }} />
                                <div className="spacer"></div>


                                <h2>Description</h2>
                                <InputMultiLine initialValue={eventData.description} onChange={(e) => {
                                    setEventData({ ...eventData, description: e.target.value })
                                }} />
                                <div className="spacer"></div>


                                {/* category and tags in a horztoal list for both */}
                                <div className="category-tags">
                                    <h2>Category</h2>

                                </div>

                                <div className="category-tags">
                                    <h2>Tags</h2>

                                    <TagEditor tags={eventData.tags} setTags={(tags) => {
                                        setEventData({ ...eventData, tags: tags })
                                    }
                                    } />
                                </div>


                                {/*  gallery here */}
                                <h2>Gallery</h2>
                                <MediaUploadBox images={images} setImages={setImages} />



                                <div className="action-buttons">
                                    {/* no edit event support yet. */}
                                    <DefaultButton onClick={submitForm}>Save</DefaultButton>
                                    <DefaultButton onClick={submitForm}>Publish</DefaultButton>
                                </div>

                                {error && <p className="errortext">{error}</p>}

                            </div>

                            <div className="rsb">
                                {/*  put some extra stuff here */}
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

            .gallery {
                padding: 1em;
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