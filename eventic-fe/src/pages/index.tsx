import { HorizontalEventList } from "@/components/ScrollerLists/HoritonalEventList";
import { HorizontalScroll } from "@/components/ScrollerLists/HorizontalScroll";
import Section from "@/components/Section";
import React, { useEffect, useState } from "react";

import { API, eventCategoriesWithIcons, EventData } from "@/constants"; // For debugging
import { extractEventCardData } from "@/utils/format";
import { EventItemProps } from "@/utils/event";
import DefaultButton from "@/components/DefaultButton";

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

export default function Homepage() {

    const [quickPicksData, setQuickPicksData] = useState<EventItemProps[]>([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    /**
     * Fetch personalized event recommendations from back end api
     */
    async function fetchRecommendations() {
        setLoading(true)
        const fetchCount = 5
        let fetchUrl = `${API}/event/recommendation/${fetchCount}`

        try {
            // use data from, api
            console.log(`fetching events from home page ${fetchUrl}`)
            const response = await fetch(fetchUrl)

            console.log(response)
            if (!response.ok) throw new Error(`Failed to fetch event "recommendation"`)
            console.log(response)

            const data: EventData[] = await response.json()
            setQuickPicksData(data.map(extractEventCardData)) // expect an array of data

        } catch (error) {
            setError((error as Error).message + ": " + (error as Error).name)
            console.error("Error in search request:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true)
                await fetchRecommendations()
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        };

        fetchEvent();
    }, [])

    return (
        <>
            <Section fullWidth={true}>
                <div className="hero-container">

                    <img
                        src="hero.jpg"
                        alt="Hero"
                        className="hero-image"
                    />

                    <div className="hero-text-container">
                        <p className="hero-text">
                            Explore local happenings, from concerts and food festivals to business meetups and charity events. Find your vibe, get the details, and RSVP in seconds.
                        </p>
                    </div>


                </div>
                <div className="browse-button-container">
                    <DefaultButton className="home-browse-button" onClick={() => window.location.href = "/event"}>Start Browsing Events</DefaultButton>
                </div>
                <HorizontalScroll textWithIcons={eventCategoriesWithIcons} />
                <HorizontalEventList
                    title="You might like..."
                    EventCards={quickPicksData}
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