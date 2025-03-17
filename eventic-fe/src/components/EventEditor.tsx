import { useEffect, useState } from "react";
import Section from "@/components/Section";
import MediaUploadBox from "@/components/MediaUploadBox";
import DefaultButton from "@/components/DefaultButton";
import InputMultiLine from "@/components/InputMultiLine";
import TagEditor from "@/components/TagEditor";
import DefaultInputForm from "./DefaultInputForm";
import { formatPrice } from "@/utils/format";
import { CustomDatePicker } from "./Event/CustomDatePicker";
import { API, DEV_MODE, eventCategories, EventData, mockEvents } from "@/constants";
import { isAuthenticated } from "@/utils/auth-api";
import { PriceInput } from "./Event/PriceInput";


export default function EventEditor({ eventId = undefined }: { eventId?: string }) {
    const isCreate = eventId === undefined || eventId === null;

    // form data. Media goes in images, the rest goes in eventData
    const [eventData, setEventData] = useState<EventData | null>(null)
    const [images, setImages] = useState<string[]>([]);

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [isLogin, setIsLogin] = useState(false)


    useEffect(() => {
        console.log("Edit page: got event id", eventId === undefined, eventId === null)

        // this page for logged in user only
        async function checkAuth(): Promise<{ status: Boolean } | void> {
            console.log("Check authorization");
            const isAuth: Boolean = await isAuthenticated();

            if (!isAuth) {
                window.location.href = "/login";
                return
            }

            setIsLogin(true)
        }
        checkAuth()


        if (!isLogin) {
            return;
        }
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

                    visibility: "private",
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

                    // data from, api
                    console.log(`fetching event ${API}/events/${eventId}`)
                    const response = await fetch(`${API}/events/${eventId}`)
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
        }

    }, [eventId, isLogin]);


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

                {!loading && isLogin && eventData != undefined && eventData != null &&
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

                                {/* Date select section */}
                                <h2>Date</h2>
                                <CustomDatePicker
                                    setDate={([start, end]: [number, number])=>{
                                        setEventData({...eventData, 
                                            startDate: start,
                                            endDate: end})
                                    }}
                                />
                                <div className="spacer"/>

                                {/* Price section */}
                                <h2>Ticket Price</h2>
                                <div className="price-input"> 
                                <PriceInput
                                    // className="price-input"
                                    setData={value => setEventData({ ...eventData, pricing: value.valueOf() })}
                                    data={eventData.pricing}
                                />
                                </div>
                                <div className="spacer"/>


                                {/* category and tags in a horztoal list for both */}
                                <div className="category-tags">
                                    <h2>Category</h2>

                                    <div className="category-selector">
                                        {eventCategories.map((category) => (
                                            <label key={category} className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value={category}
                                                    checked={eventData.category === category}
                                                    onChange={(e) => {
                                                        setEventData({ ...eventData, category: e.target.value })
                                                    }
                                                    }
                                                    className="radio-input"
                                                />
                                                {category}
                                            </label>
                                        ))}
                                    </div>
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


                {DEV_MODE && <p>dev: Event ID: {eventId} visibility: {eventData?.visibility}</p>}
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

            .category-selector {
                display: flex;
                flex-direction: column;
                gap: 8px;
                }

                .radio-label {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                }

                .radio-input {
                accent-color: #3b82f6; /* Tailwind blue-500 */
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

            .price-input {
                margin: 1rem;
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
