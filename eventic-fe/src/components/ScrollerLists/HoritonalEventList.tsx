import { EventItem, EventItemProps } from "../Event/EventItem";
import React from 'react';
import { HorizontalScrollContainer } from "./HorizontalScrollContainer";

type Props = {
    title: string;
    EventCards: EventItemProps[];
}
export function HorizontalEventList({ 
    title,
    EventCards, 
}: Props) {
    

    return (
        <>
            <h1 className="title">{title}</h1>
            <HorizontalScrollContainer>
                <ul className="scroll-list">
                    {EventCards?.map((eventProps, index) => (
                        <li key={index} className="listed-card">
                            <EventItem key={index} {...eventProps} />
                        </li>
                    ))}
                    {EventCards?.map((eventProps, index) => (
                        <li key={index} className="listed-card">
                            <EventItem key={index} {...eventProps} />
                        </li>
                    ))}
                </ul>
            </HorizontalScrollContainer>

            <style jsx>{`
            
            .title {
                font-size: 3rem;
                margin: 2rem 1rem 0 1rem;
                font-weight: bold;
            }

            .scroll-list-container {
                display: flex;
                justify-content: center;
                margin: 2rem;
            }

            .scroll-list {
                display: flex;
                flex-wrap: nowrap;
                padding: 0;
                margin: 0;
                list-style: none;
            }

            .lsited-card {
                margin-right: 5px;
                display: inline-block;
            }

            `}</style>


        </>
    );
}