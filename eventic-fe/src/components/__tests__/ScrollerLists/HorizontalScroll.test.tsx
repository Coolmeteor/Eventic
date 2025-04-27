import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { faCoffee, faPersonBiking, faWallet } from "@fortawesome/free-solid-svg-icons";


import type { TextWithIcon } from "@/constants";
import { HorizontalScroll, HorizontalScrollList, MiniHorizontalScroll } from "@/components/ScrollerLists/HorizontalScroll";


// we use <style> tags, jest does not support this well. Throws css parse errors, and this is non-fatal error anyways so ignore it
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation((msg) => {
        if (typeof msg === 'string' && msg.includes('Could not parse CSS stylesheet')) {
            return;
        }
        console.log("Ignoring css error");
        // console.log("Ignoring css error", msg);
    });
});

afterAll(() => {
    jest.restoreAllMocks();
});

const mockItems: TextWithIcon[] = [
    { icon: faPersonBiking, text: "hi" },
    { icon: faCoffee, text: "this" },
    { icon: faWallet, text: "yes" },
];
const tags = ["Never gonna", "give you up", "never gonna let you down"];


describe("HorizontalScroll rendering items", () => {

    test("renders one MiniCard per textWithIcons entry", () => {
        const { container } = render(<HorizontalScroll textWithIcons={mockItems} />);

        // test if everything is rendered and list correct size
        mockItems.forEach(({ text }) => {
            expect(screen.getByText(text)).toBeInTheDocument();
        });
        const check = container.querySelectorAll("li.smallCardli");
        expect(check).toHaveLength(mockItems.length);

    });
});

describe("MiniHorizontalScroll rendering items", () => {


    test("renders one MicroCard per textWithIcons and per tag", () => {
        const { container } = render(
            <MiniHorizontalScroll textWithIcons={mockItems} tags={tags} />
        );

        // under normal use, shouldnt have both tag and regular icon, but it tehcnically supports both
        const check = container.querySelectorAll("li.smallCardli");
        expect(check).toHaveLength(mockItems.length + tags.length);

        // now check everything renders
        mockItems.forEach(({ text }) => {
            expect(screen.getByText(text)).toBeInTheDocument();
        });
        tags.forEach((tag) => {
            expect(screen.getByText(tag)).toBeInTheDocument();
        });
    });

    test("Render if only tags", () => {
        const { container } = render(
            <MiniHorizontalScroll textWithIcons={mockItems} />
        );
        const check = container.querySelectorAll("li.smallCardli");
        expect(check).toHaveLength(mockItems.length);
    });

    test("Render if only textWithIcons", () => {
        const { container } = render(
            <MiniHorizontalScroll tags={tags} />
        );
        const check = container.querySelectorAll("li.smallCardli");
        expect(check).toHaveLength(tags.length);
    });
});
