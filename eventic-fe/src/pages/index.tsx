import { HorizontalEventList } from "@/components/ScrollerLists/HoritonalEventList";
import { HorizontalScroll } from "@/components/ScrollerLists/HorizontalScroll";
import Section from "@/components/Section";
import React, { useEffect, useState } from "react";

import { API, eventCategoriesWithIcons, EventData } from "@/constants"; // For debugging
import { extractEventCardData } from "@/utils/format";
import { EventCardProps } from "@/components/Event/EventCard";
import DefaultButton from "@/components/DefaultButton";

export default function Homepage() {

    const [quickPicksData, setQuickPicksData] = useState<EventCardProps[]>([])

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