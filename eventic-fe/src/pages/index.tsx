import { HorizontalEventList } from "@/components/ScrollerLists/HoritonalEventList";
import { HorizontalScroll } from "@/components/ScrollerLists/HorizontalScroll";
import Section from "@/components/Section";
import React from "react";

import { eventCategoriesWithIcons, mockEvents } from "@/constants"; // For debugging
import { extractEventCardData } from "@/utils/format";
import { EventCardProps } from "@/components/Event/EventCard";
import DefaultButton from "@/components/DefaultButton";

// You-might-like events must be fetched from backend in release
const mockEventCards: EventCardProps[] = mockEvents.map(extractEventCardData);


export default function Homepage() {
    return (
        <>
            <Section fullWidth={true}>
                <div className="hero-container">
                    <img
                        src="hero.jpg"
                        alt="Hero"
                        className="hero-image"
                    />

                    <p className="hero-text">
                        Welcome to the site! We are a site that is dedicated to providing you with the latest and greatest.
                    </p>


                </div>
                <div className="browse-button-container">
                    <DefaultButton className="home-browse-button" onClick={() => window.location.href = "/event"}>Start Browsing Events</DefaultButton>
                </div>
                <HorizontalScroll textWithIcons={eventCategoriesWithIcons} />
                <HorizontalEventList
                    title="You might like..."
                    EventCards={mockEventCards}
                />

            </Section>


            <style jsx>{`
        .browse-button-container {   
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top: 2rem;
        }
        `}</style>
        </>
    );
}