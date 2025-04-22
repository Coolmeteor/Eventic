import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faDollar, faLocationArrow, faSquarePersonConfined, } from '@fortawesome/free-solid-svg-icons'
import {  EventData } from '@/constants'
import DefaultButton from './DefaultButton'

type Props = {
    large: boolean,
    event: EventData,
    btn?: {
        // click: () => void | undefined,
        href?: string | undefined,
        text?: string | undefined,
    }
}

const borderRadius = "15px";

export function EventCard({ large = false, event, btn }: Props) {
    return (
        <>
            <div className="eventContainer">
                {/* event image */}

                {/* event title and location */}
                <div className='top'>

                    <div className="location-text">
                        <FontAwesomeIcon icon={faLocationArrow} />
                        <p>{event.location_string}</p>
                    </div>
                    <h3>{event.name}</h3>
                </div>


                {/* decription and other detail */}
                <div className='event-content'>
                    <div>
                        {process.env.NEXT_PUBLIC_DEV_MODE == "true" && <p>Dev: event ID is {event.id}</p>}



                        <div className="date-text">
                            <FontAwesomeIcon icon={faCalendar} />
                            <p>{new Date(event.start_date).toLocaleDateString()} — {new Date(event.start_date).toLocaleDateString()}</p>

                        </div>
                        <div className="date-text">
                            <FontAwesomeIcon icon={faDollar} />
                            <p>{event.pricing}</p>
                        </div>
                        <div className='spacer'></div>


                        <p className='event-desc'>{event.description}</p>

                    </div>
                    {btn &&
                        <DefaultButton textColor='var(--color-onPrimary)' bgColor={['000000', '000000', '000000']} link={true} href={btn.href}>{btn.text}</DefaultButton>
                    }
                </div>


            </div>


            <style jsx>
                {`
                .spacer {
                 height: 8px;
                }
                .icon {
                    {/* width: 60px;
                    height: 40px; */}

                    align-self: start;
                    position: relative;

                    margin: 20px 20px 0px 0px;
                    font-size: 30px;
                }

                .eventContainer {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;


                    min-width: 250px;
                    max-width: 250px;
                    height: 400px;
                    

                  
                    box-shadow: var(--shadow-large);
                    border-radius: ${borderRadius};
        
                    font-size: var(--font-size-body-S);
                    font-family: var(--font-roboto);
                }

                .event-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 12px 20px 10px 20px;

                    width: 100%;
                    height: 50%;
                    border-radius: 0px 0px ${borderRadius} ${borderRadius};
                    background-color: var(--color-background-mid);
                }

                .see-more {
            
                    justify-self: end;
                    
                    justify-content: center;
                
                }

                h3 {
                    font-size: var(--font-size-header-XS);
                
                    align-self: start;
                    max-width: 300px;
                

                    // all this is for max 2 lines
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .event-desc {
                    // all this is for max 6 lines
                    display: -webkit-box;
                    -webkit-line-clamp: 6;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                p {
                    width: 100%;
                }


                span {
                    display: flex;
                    margin-top: 40px;
                    width: 100%;
                }


                .top {
                    display: flex;
                    flex-direction: column;

                    width: 100%;
                    height: 50%;
                 
                    padding-right: 20px;
                    padding-left: 30px;

                    color: white;

                    border-radius: ${borderRadius} ${borderRadius} 0px 0px;
                    background-image: linear-gradient(to top, rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0) 35%, rgba(0, 0, 0, 0.09) 50%, rgba(0, 0, 0, 0.61) 90%, rgba(0, 0, 0, 0.8) 100%),
                    url(${event.media[0]});
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                
                    }

                
                .location-text {
                    display: flex;
                    flex-direction: row;
                    justify-content: end;
                    padding: 1em 0em 1em 0.5em;

                    align-self: end;
                }
                .location-text p {
                    margin-left: 10px;

              
                }

                .date-text {
                    display: flex;
                    flex-direction: row;
                
                    padding: 0.2em 0.5em 0.2em 0.5em;

                    align-self: start;
                }
                .date-text p {
                    margin-left: 10px;
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
            
                    padding: 1em;
                    margin-right: 1em;
                }

                .location-date-inner * {
                    margin-left: 1em;
                }

                `}
            </style>
        </>
    )
}



export function EventCardLarge({ event }: Props) {
    return (
        <>
            <div className="eventContainer">
                <div className='left'>
                    {/* event image */}
                    <div className="image-wrapper">
                        <img src={event.media[0]} alt={event.name} className="event-image" />
                        <div className="image-overlay"></div>
                    </div>

                    {/* event title and location */}
                    <div className='top'>

                        <div className="location-text">
                            <FontAwesomeIcon icon={faLocationArrow} />
                            <p>{event.location_string}</p>
                        </div>
                        <h3>{event.name}</h3>
                    </div>
                </div>


                {/* decription and other detail */}
                <div className='event-content'>

                    <div className='organizer'>
                        <FontAwesomeIcon icon={faSquarePersonConfined} fontSize={"70px"} />
                        <p>{event.creator}</p>
                    </div>
                    <div className="date-text">
                        <FontAwesomeIcon icon={faCalendar} />
                        <p>{new Date(event.start_date).toLocaleDateString()} — {new Date(event.start_date).toLocaleDateString()}</p>
                    </div>

                    <p className='event-desc'>{event.description}</p>
                </div>
            </div>


            <style jsx>
                {`
                .icon {
                    {/* width: 60px;
                    height: 40px; */}

                    align-self: start;
                    position: relative;

                    margin: 20px 20px 0px 0px;
                    font-size: 30px;
                }

                .eventContainer {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;

                    min-width: 250px;
                    max-width: 1000px;
                    height: 250px;
                  
                    box-shadow: var(--shadow-large);
                    border-radius: ${borderRadius};
        
                    font-size: var(--font-size-body-S);
                    font-family: var(--font-roboto);
                }

                .event-content {
                    display: flex;
                    flex-direction: column;
                    padding: 0px 20px 10px 20px;

                    width: 100%;
                    height: 100%;
                    border-radius: ${borderRadius};
                    background-color: var(--color-background-mid);
                }

                h3 {
                    font-size: var(--font-size-header-XS);
                
                    align-self: start;
                    max-width: 300px;
                

                    // all this is for max 2 lines
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .event-desc {
                    // all this is for max 8 lines
                    display: -webkit-box;
                    -webkit-line-clamp: 6;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                p {
                    width: 100%;
                }


                span {
                    display: flex;
                    margin-top: 40px;
                    width: 100%;
                }

                .left {

                    display: flex;
                    flex-direction: column;
                    
                    width: 100%;
                    max-width: 230px;
                    height: 100%;
                    border-radius: ${borderRadius};
                }
                .top {
                    display: flex;
                    flex-direction: column;

                    width: 100%;
                    margin-bottom: ${borderRadius};
                    margin-top: 10px;
                    padding-right: 20px;
                    padding-left: 30px;

                    color: white;

                    border-radius: ${borderRadius} ${borderRadius} 0px 0px;
                }


                .organizer {
                    display: flex;
                    flex-direction: row;
                    justify-content: left;
                    align-items: center;
                    padding: 0.5em 0.2em 0.5em 0em;
                    gap: 1em;
                    font-size: 1.6em;
                }

                
                .location-text {
                    display: flex;
                    flex-direction: row;
                    justify-content: end;
                    padding: 1em 0em 1em 0.5em;

                    align-self: end;
                }
                .location-text p {
                    margin-left: 10px;

              
                }

                .date-text {
                    display: flex;
                    flex-direction: row;
                
                    padding: 1em 1em 1em 0.5em;

                    align-self: start;
                }
                .date-text p {
                    margin-left: 10px;
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
            
                    padding: 1em;
                    margin-right: 1em;
                }

                .location-date-inner * {
                    margin-left: 1em;
                }



                .image-wrapper {
                    position: absolute;
                    width: 250px;
                    height: 250px;
                    overflow: hidden;
                    z-index: -9999999;
                }

                .event-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: ${borderRadius} 0px 0px ${borderRadius};
                }

                .image-overlay {
                    position: absolute;
                    top: 0;
                    width: 100%;

                    height: 100%;
                    background: linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.61) 50%, rgba(0, 0, 0, 0.8) 100%);
                    
                    // height: 60%;
                    // background: linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
                    border-radius: ${borderRadius} ${borderRadius} 0px 0px;
                }
                `}
            </style>
        </>
    )
}