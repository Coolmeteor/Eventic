import { useEffect, useState } from "react"
import { fetchTicketEvent } from "@/utils/event";
import { Ticket, Purchase } from "@/utils/tickest_purchases";
import { Event } from "@/utils/event";
import { getMonthDayYear } from "@/utils/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faMapLocation, faQuoteLeftAlt } from "@fortawesome/free-solid-svg-icons";
import { LoadingMessage } from "@/components/LoadingMessage";

type Props = {
    ticketData: Ticket,
    purchaseData: Purchase,
}

const border_radius = "1rem";

export default function OrderCard({
    ticketData,
    purchaseData,
}: Props){
    const [event, setEvent] = useState<Event>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch event data
    useEffect(() => {
        const loadData = async () => {
            const data = await fetchTicketEvent(ticketData.id);
            if(data){
                setEvent(data);
            }

            setIsLoading(false);
        }
        
        loadData();
    }, [])

    if(isLoading){
        return (
            <LoadingMessage>Loading data</LoadingMessage>
        )
    }
    

    return (
        <>
            { event ? (
            <div className="card-container">
                <div className="info-container">
                    <div className="info-text">
                        <p>Event Date</p>
                        <p>
                            {getMonthDayYear(new Date(event.start_date).toDateString())}
                            {/* {' - '}
                            {getMonthDayYear(new Date(event.end_date).toDateString())} */}
                        </p>
                    </div>

                    <div className="info-text">
                        <p>Paid Amount</p>
                        <p>{purchaseData.total_price}$</p>
                    </div>

                    <div className="info-text">
                        <p>Quantity</p>
                        <p>{purchaseData.quantity} ticket{'('}s{')'}</p>
                    </div>
                    
                    <div className="info-text">
                        <p>Ordered Date</p>
                        <p>
                            {getMonthDayYear(new Date(purchaseData.purchase_date).toDateString())}
                        </p>
                    </div>

                </div>
                <h2 className="event-name">{event.name}</h2>
                <div className="separator">
                    <div className="left-box">
                        <div className="img-container">
                            <img src={event.media[0]}/>
                        </div>
                        <div className="description-container">
                            <h2 className="label">
                                <FontAwesomeIcon style={{marginRight: '0.5rem'}} fontSize={'1rem'} icon={faQuoteLeftAlt}/>
                                Description
                            </h2>
                            <p className="description">{event.description}</p>
                            <h2 className="label">
                                <FontAwesomeIcon style={{marginRight: '0.5rem'}} fontSize={'1rem'} icon={faMapLocation}/>
                                Location
                            </h2>
                            <p className="one-line-desc">
                                {event.location_string}
                            </p>
                            <h2 className="label">
                                <FontAwesomeIcon style={{marginRight: '0.5rem'}} fontSize={'1rem'} icon={faCalendarCheck}/>
                                Date
                            </h2>
                            <p className="one-line-desc">
                                {new Date(event.start_date).toLocaleString()}
                                {' - '}
                                {new Date(event.end_date).toLocaleString()}
                            </p>


                        </div>
                    </div>
                    <div className="right-box">
                        <button className="button" onClick={() => {window.location.href = `/event/${event.id}`}}>
                            View Event
                        </button>
                        <button className="button" onClick={() => {window.location.href = `/customer/ticket/${ticketData.id}`}}>
                            View Ticket
                        </button>
                    </div>
                </div>
                

            </div>
            ) : (
                <h1>Failed to load ticket information. Please reload page.</h1>
            )}

            <style jsx>{`
            .card-container {
                width: 100%;
                height: 360px;
                border: 2px solid var(--color-background-dark);
                border-radius: ${border_radius};
            }

            .info-container {
                display: flex;
                width: 100%;
                height: 20%;
                border-top-left-radius: ${border_radius};
                border-top-right-radius: ${border_radius};
                border-bottom: 2px solid var(--color-background-dark);
                
                background: var(--color-background-gray);
            }

            .event-name {
                display: flex;
                min-height: 15%;
                max-height: 15%;
                font-size: 1.5rem;
                font-weight: bold;
                padding: 1rem;
            }

            .separator {
                display: flex;
                height: 65%;
            }

            .left-box {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: left;
                width: 70%;
                
                height: 100%;
            }

            .right-box {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
                height: 100%;
                width: 30%;
            }

            .right-box button{
                padding: 0.5rem;
                margin: 0.5rem 0.5rem 0.5rem 0.5rem;
                width: 10rem;
                height: 2rem;
                background-color: var(--color-primary);
                color: black;
                border: none;
                border-radius: 10px;
                transition: .1s;
            }

            .right-box button:hover {
                background-color: var(--color-primary-dark);
            }

            .info-text {
                display: flex;
                flex-direction: column;
                margin: 1rem 1rem 1rem 2rem;
            }

            .info-text p {
                margin: 0 auto 0.1rem 0;
            }

            .description-container {
                display: flex;
                flex-direction: column;
                align-items: left;
                height: 100%;
                width: 67%;
            }

            .label {
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: 1.1rem;
                height: 1.7rem;
            }

            .description {
                display: -webkit-box;
                -webkit-line-clamp: 5;
                -webkit-box-orient: vertical;
                word-break: break-word;
                line-height: 1rem;
                overflow: hidden;

                text-align: left;
                height: 5rem;
                margin-left: 1rem;
            }

            .one-line-desc {
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                word-break: break-word;
                height: 1.5rem;
                text-align: left;
                margin-left: 1rem;
            }

            .img-container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 33%;
            }

            .img-container img {
                width: 200px;
                height: 200px;
                border-radius: ${border_radius};
            }
            `}</style>
        </>
    )
}