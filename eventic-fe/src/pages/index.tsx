import { HorizontalEventList } from "@/components/ScrollerLists/HoritonalEventList";
import { HorizontalScroll } from "@/components/ScrollerLists/HorizontalScroll";
import Section from "@/components/Section";
import React from "react";

import { mockEvents } from "@/constants"; // For debugging
import { extractEventCardData } from "@/utils/format";
import { EventCardProps } from "@/components/Event/EventCard";


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

// You-might-like events must be fetched from backend in release
const mockEventCards : EventCardProps[] = mockEvents.map(extractEventCardData);


export default function Homepage() {
    return (
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
            <HorizontalScroll textWithIcons={
                [
                    { icon: mockIcons[Math.floor(Math.random() * mockIcons.length)], text: "Artist" },
                    { icon: mockIcons[Math.floor(Math.random() * mockIcons.length)], text: "Movie" },
                    { icon: mockIcons[Math.floor(Math.random() * mockIcons.length)], text: "Show" },
                    { icon: mockIcons[Math.floor(Math.random() * mockIcons.length)], text: "Chill" },
                    { icon: mockIcons[Math.floor(Math.random() * mockIcons.length)], text: "Trip" },
            ]
            } />
            <HorizontalEventList 
                title="You might like..."
                EventCards={mockEventCards}
            />

        </Section>
    );
}