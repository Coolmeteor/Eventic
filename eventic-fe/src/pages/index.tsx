import { HorizontalScroll } from "@/components/ScrollerLists/HorizontalScroll";
import Section from "@/components/Section";
import React from "react";




export default function Homepage() {
    return (
        <Section fullWidth = {true}>
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
            <HorizontalScroll />
        </Section>
    );
}