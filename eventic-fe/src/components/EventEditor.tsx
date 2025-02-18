import { useEffect, useState } from "react";
import Section from "@/components/Section";
import MediaUploadBox from "@/components/MediaUploadBox";
import DefaultButton from "@/components/DefaultButton";
import InputMultiLine from "@/components/InputMultiLine";
import TagEditor from "@/components/TagEditor";
import { API, EventData, mockEvents } from "@/constants";


export default function EventEditor({ eventId = undefined }: { eventId?: string }) {
    const isCreate = eventId === undefined || eventId === null;

    // form data. Media goes in images, the rest goes in eventData
    const [eventData, setEventData] = useState<EventData | null>(null)
    const [images, setImages] = useState<string[]>([]);

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        console.log("uhiwqduh", eventId === undefined, eventId === null)
        if (isCreate) {
            // blank form
            setLoading(true);

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

            setLoading(false)
        } else {
            const fetchEvent = async () => {
                try {
                    setLoading(true);

                    console.log(`fetching event ${API}/event/${eventId}`)
                    // const response = await fetch(`${API}/event/${id}`)
                    // if (!response.ok) throw new Error("Failed to fetch event")
                    // const data: EventData = (await response.json())[0]

                    // make loading status show for now
                    // setTimeout(() => {
                    // console.log(data );
                    // setEventData(data)

                    setEventData(
                        mockEvents.filter((event) => event.id === parseInt(eventId))[0]
                    )
                    console.log("set event", mockEvents.filter((event) => event.id === parseInt(eventId))[0])
                    // }, 1000);

                } catch (err) {
                    setError((err as Error).message)
                } finally {
                    setLoading(false)
                }
            };

            fetchEvent();
        }


    }, [eventId]);


    /**
 * Upload form to server
 */
    async function submitForm(visibility: string = "private") {
        console.log("submitting form", eventData, images);

        try {
            const response = await fetch(`${API}/event/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...eventData, visibility: visibility }),
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
                {loading && <p>Please wait</p>}
                {error && <p>Error loading event: {error}</p>}

                {!loading && eventData != undefined && eventData != null &&
                    <div>

                        <h1>Create new event</h1>

                        <div className="event-content">

                            <div className="event-detail">
                                <h2>Title</h2>
                                <InputMultiLine
                                    initialValue={eventData.name}
                                    onChange={(e) => {
                                        setEventData({ ...eventData, name: e.target.value })
                                    }} />
                                <div className="spacer"></div>


                                <h2>Description</h2>
                                <InputMultiLine
                                    initialValue={eventData.description}
                                    defaultLines={6}
                                    onChange={(e) => {
                                        setEventData({ ...eventData, description: e.target.value })
                                    }} />
                                <div className="spacer"></div>


                                {/* category and tags in a horztoal list for both */}
                                <div className="category-tags">
                                    <h2>Category</h2>

                                </div>

                                <div className="spacer"></div>

                                <div className="category-tags">
                                    <h2>Tags</h2>

                                    <TagEditor tags={eventData.tags} setTags={(tags) => {
                                        setEventData({ ...eventData, tags: tags })
                                    }
                                    } />
                                </div>

                                <div className="spacer"></div>

                                {/*  gallery here */}
                                <h2>Gallery</h2>
                                <MediaUploadBox images={images} setImages={setImages} />



                                <div className="action-buttons">
                                    {/* Save draft and publish for events that are currently private . For public events, user can update or make private*/}
                                    {eventData.visibility === "private" && <DefaultButton onClick={() => submitForm("public")}>Save draft</DefaultButton>}
                                    {eventData.visibility === "private" && <DefaultButton onClick={() => submitForm("public")}>Publish</DefaultButton>}

                                    {eventData.visibility === "public" && <DefaultButton onClick={() => submitForm("public")}>Update</DefaultButton>}
                                    {eventData.visibility === "public" && <DefaultButton onClick={() => submitForm("private")}>Unpublish</DefaultButton>}

                                </div>

                                {error && <p className="errortext">{error}</p>}

                            </div>

                            <div className="rsb">
                                {/*  put some extra stuff here */}
                            </div>
                        </div>


                    </div>
                }


                <p>dev: Event ID: {eventId} visibility: {eventData?.visibility}</p>
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
