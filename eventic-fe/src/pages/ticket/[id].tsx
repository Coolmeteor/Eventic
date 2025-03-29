import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Section from "@/components/Section";
import { faCalendar, faLocationArrow, faSquarePersonConfined } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenerateTicketPDF from "@/components/Ticket/GenerateTicketPDF";
import { extractEventItemData } from "@/utils/event";
import { fetchTicketEvent } from "@/utils/event";

import { Event } from "@/utils/event";
import { AuthorizeTicket } from "@/utils/tickest_purchases";
import { Forbidden } from "@/components/Forbidden";
import { LoadingMessage } from "@/components/LoadingMessage";


export default function ticket() {
    const router = useRouter();
    const { id } = router.query;

    const [ticketId, setTicketId] = useState<number>(-1);
    const [isIdDefined, setIsIdDefined] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [eventData, setEventData] = useState<Event>();

    useEffect(() => {
        // Store ticket_id as number type
        if(id){
            setTicketId(Number(id));
            setIsIdDefined(true);
        }
    }, [id]);


    useEffect(() => {
        console.log(isIdDefined);
        if(isIdDefined){
            // Authorize user and ticket
            const loadData = async () => {
                const authorized = await AuthorizeTicket(ticketId);
                setIsAuthorized(authorized);
                console.log("Ticket Authorized:", authorized);
                if(!authorized) {
                    setTimeout(() => {window.location.href = "/profile";}, 2000);
                    setIsLoading(false);
                    return;
                }

                 // fetch event using ticket id
                const data = await fetchTicketEvent(ticketId);
                if(data) {
                    setEventData(data);
                }

                setIsLoading(false);
            };

            loadData();
        }
    }, [isIdDefined]);
    
    if(!isLoading && !isAuthorized){
        return ( 
            <Forbidden>
                <LoadingMessage>Automatically redirecting to your profile page</LoadingMessage>
            </Forbidden>
        );
    }

    
    return (
        <Section>
            {
                (eventData && isIdDefined) ? (
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

                                <GenerateTicketPDF 
                                    ticketID={ticketId}
                                    eventItemProps={extractEventItemData(eventData)}
                                />

                            </div>

                            <div className="rsb">
                                <div className="ticket-detail">
                                    <h2>Ticket Details</h2>
                                    <p>Price: {eventData.pricing}</p>
                                    <p>Max Participants: {eventData.max_participants}</p>
                                    <p>Current Participants: {eventData.current_participants}</p>
                                </div>

                                <div className="organizer-detail">
                                    <h2>Organizer</h2>
                                    <p>{eventData.creator_id}</p>
                                    <div className="organizer-icon">
                                        <FontAwesomeIcon icon={faSquarePersonConfined} fontSize={"170px"} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                ) : (
                    <LoadingMessage>Loading</LoadingMessage>                   
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