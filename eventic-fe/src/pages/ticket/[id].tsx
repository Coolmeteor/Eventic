import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Section from "@/components/Section";
import { EventData } from "@/constants";
import { faCalendar, faLocationArrow, faSquarePersonConfined } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mockEvents } from "@/constants";
import { MiniHorizontalScroll } from "@/components/ScrollerLists/HorizontalScroll";
import { ImageCarousell } from "@/components/ImageCarousell";
import GenerateTicketPDF from "@/components/Ticket/GenerateTicketPDF";
import { fetchProfile } from "@/utils/profile-api";
import { User } from "@/utils/profile-api";
import { extractEventItemData } from "@/utils/event";


export default function ticket() {
    const router = useRouter();
    const { id } = router.query;

    const [user, setUser] = useState<User>();
    
        useEffect(()=>{
            fetchProfile()
            .then((user) => {
                if(user && "user" in user){
                    setUser(user.user);
                }
            });
        }, [])

    const [eventData, setEventData] = useState<EventData>();
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
        if (!id)    return;

        // Authorize user and ticket

        setEventData(mockEvents[1]);

    }, [id]);

    
    return (
        <Section>
            {
                (eventData && user) ? (
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

                                <GenerateTicketPDF 
                                    userID={user.id} 
                                    ticketID={1} 
                                    eventItemProps={extractEventItemData(eventData)}
                                />

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
                                </div>
                            </div>
                        </div>

                        
                    </div>
                ) : (
                    <h1>Data is not ready yet.</h1>
                )
            }

            <style jsx>{`

            .spacer {
                height: 2em;
            }
            h1 {
                font-size: var(--font-size-header-S);
                margin-bottom: 1em;
                padding-top: 28px;
            }

            .print-container {
                margin: 2rem;
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
        </Section>
    );
}