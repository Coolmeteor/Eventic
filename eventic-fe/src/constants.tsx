import { faBaseballBatBall, faBowlFood, faBrush, faBuildingNgo, faDice, faHandHoldingHeart, faMusic, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { image1, image2 } from "./constants_mockimages";
// export const API = `http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}`;
export const enableMockEvents = process.env.NEXT_PUBLIC_ENABLE_MOCK_EVENTS == "true"


export const API = `http://127.0.0.1:5000`;
// export const API = `https://192.168.2.146:5000`;

export const eventCategories = [
    "Music",
    "Dining",
    "Arts",
    "Sports",
    "Business",
    "Networking",
    "Charity",
    "Other"
]

const eventCategoriesIcons = [
    faMusic,
    faBowlFood,
    faBrush,
    faBaseballBatBall,
    faBuildingNgo,
    faPeopleGroup,
    faHandHoldingHeart,
    faDice
]

export const eventCategoriesWithIcons: TextWithIcon[] = eventCategories.map((category, index) => {
    // console.log("category: ", category, eventCategoriesIcons[index]);
    return {
        icon: eventCategoriesIcons[index],
        text: category,
    }
})

export type TextWithIcon = {
    icon: any;
    text: string;
}

export type EventData = {
    id: number;
    name: string;
    description: string;
    media: string[]; // url or base64
    tags: string[]; // aka keywords
    category: string; // aka generes

    start_date: number; // use iso whatever ms since 1970 i guess
    end_date: number; // use iso whatever ms since 1970 i guess
    location_string: string; // human readable address
    location_long: number;
    location_lat: number;

    visibility: string; // private, public
    max_participants: number;
    currentParticipants: number;
    pricing: number;

    creator_id: number;
    creator: string; // organizer info. maybe later pass a user object
    created_at: number;
    updated_at: number;
}



/**
 * Mock data for testing purposes. Oh chatgpt my beloved...
 */
export const mockEvents: EventData[] = [
    {
        id: 100,
        name: "Tech Conference 2025",
        description: "A gathering of tech enthusiasts and professionals.",
        media: [
            image1, image2
        ],
        tags: ["technology", "conference", "networking"],
        category: "Technology",

        start_date: 1735689600000, // 1 Jan 2025, in milliseconds
        end_date: 1735776000000, // 2 Jan 2025
        location_string: "San Francisco, CA",
        location_long: -122.4194,
        location_lat: 37.7749,

        visibility: "public",
        max_participants: 500,
        currentParticipants: 320,
        pricing: 99.99,

        creator_id: 1,
        creator: "Tech Corp",
        created_at: 1735000000000,
        updated_at: 1735500000000,
    },
    {
        id: 101,
        name: "Jazz Music Night",
        description: "A night filled with soulful jazz performances.",
        media: [
            image2
        ],
        tags: ["music", "jazz", "concert"],
        category: "Music",

        start_date: 1737000000000, // 15 Jan 2025
        end_date: 1737086400000, // 16 Jan 2025
        location_string: "New Orleans, LA",
        location_long: -90.0715,
        location_lat: 29.9511,

        visibility: "public",
        max_participants: 300,
        currentParticipants: 250,
        pricing: 49.99,

        creator_id: 1,
        creator: "Jazz Events Inc.",
        created_at: 1735000000000,
        updated_at: 1735500000000,
    },
    {
        id: 102,
        name: "Startup Pitch Competition",
        description: "Pitch your startup idea and win funding. Open to all entrepreneurs. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        media: [
            image2
        ],
        tags: ["startup", "entrepreneurship", "business"],
        category: "Business",

        start_date: 1738200000000, // 1 Feb 2025
        end_date: 1738286400000, // 2 Feb 2025
        location_string: "New York, NY",
        location_long: -74.006,
        location_lat: 40.7128,

        visibility: "private",
        max_participants: 100,
        currentParticipants: 75,
        pricing: 0,

        creator_id: 1,
        creator: "VC Fund",
        created_at: 1735000000000,
        updated_at: 1735500000000,
    }
];