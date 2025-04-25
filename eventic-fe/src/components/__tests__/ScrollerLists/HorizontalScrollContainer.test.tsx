import { render, screen, fireEvent } from "@testing-library/react";
import {HorizontalScrollContainer} from "@/components/ScrollerLists/HorizontalScrollContainer";
import React from "react";

describe("HorizontalScrollContainer", () => {
    it("Renders children", () => {
        render(
            <HorizontalScrollContainer>
                <div>Test Child</div>
            </HorizontalScrollContainer>
        );
        expect(screen.getByText("Test Child")).toBeInTheDocument();
    });

    it("Shows scroll buttons", () => {
        render(
            <HorizontalScrollContainer>
                <div>Test</div>
            </HorizontalScrollContainer>
        );
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(2); // Left and right buttons
    });

    it("Scrolls right when right button is clicked", () => {
        render(
            <HorizontalScrollContainer>
                <div style={{ width: "2000px" }}>Scrollable Content</div>
            </HorizontalScrollContainer>
        );

        const scrollContainer = screen.getByText("Scrollable Content").parentElement!;
        Object.defineProperty(scrollContainer, "scrollLeft", {
            writable: true,
            value: 0,
        });

        const rightBtn = screen.getAllByRole("button")[1];
        fireEvent.click(rightBtn);

        expect(scrollContainer.scrollLeft).toBeGreaterThan(0);
    });

    it("Respects scrollAmount prop", () => {
        render(
            <HorizontalScrollContainer scrollAmount={999}>
                <div style={{ width: "2000px" }}>Scroll me</div>
            </HorizontalScrollContainer>
        );

        const scrollContainer = screen.getByText("Scroll me").parentElement!;
        Object.defineProperty(scrollContainer, "scrollLeft", {
            writable: true,
            value: 0,
        });

        const rightBtn = screen.getAllByRole("button")[1];
        fireEvent.click(rightBtn);

        expect(scrollContainer.scrollLeft).toBe(999);
    });
});
