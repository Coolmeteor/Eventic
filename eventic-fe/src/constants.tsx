export const API = "http://127.0.0.1:5000"

export const eventCategories = [
    "Music",
    "Food & Drink",
    "Arts",
    "Sports",
    "Business",
    "Networking",
    "Charity",
    "Other"
]

export type EventData = {
    id: number;
    name: string;
    description: string;
    media: string[]; // url or base64
    tags: string[]; // aka keywords
    category: string; // aka generes

    startDate: number; // use iso whatever ms since 1970 i guess
    endDate: number; // use iso whatever ms since 1970 i guess
    locationString: string; // human readable address
    locationLong: number;
    locationLat: number;

    visibility: string; // private, public
    maxParticipants: number;
    currentParticipants: number;
    pricing: number;

    creator: string; // organizer info. maybe later pass a user object
    createdAt: number;
    updatedAt: number;
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
            "eventmock.png",
            "eventmock2.jpg"
        ],
        tags: ["technology", "conference", "networking"],
        category: "Technology",

        startDate: 1735689600000, // 1 Jan 2025, in milliseconds
        endDate: 1735776000000, // 2 Jan 2025
        locationString: "San Francisco, CA",
        locationLong: -122.4194,
        locationLat: 37.7749,

        visibility: "public",
        maxParticipants: 500,
        currentParticipants: 320,
        pricing: 99.99,

        creator: "Tech Corp",
        createdAt: 1735000000000,
        updatedAt: 1735500000000,
    },
    {
        id: 101,
        name: "Jazz Music Night",
        description: "A night filled with soulful jazz performances.",
        media: [

            "eventmock2.jpg"
        ],
        tags: ["music", "jazz", "concert"],
        category: "Music",

        startDate: 1737000000000, // 15 Jan 2025
        endDate: 1737086400000, // 16 Jan 2025
        locationString: "New Orleans, LA",
        locationLong: -90.0715,
        locationLat: 29.9511,

        visibility: "public",
        maxParticipants: 300,
        currentParticipants: 250,
        pricing: 49.99,

        creator: "Jazz Events Inc.",
        createdAt: 1735000000000,
        updatedAt: 1735500000000,
    },
    {
        id: 102,
        name: "Startup Pitch Competition",
        description: "Pitch your startup idea and win funding. Open to all entrepreneurs. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        media: [

            "eventmock2.jpg"
        ],
        tags: ["startup", "entrepreneurship", "business"],
        category: "Business",

        startDate: 1738200000000, // 1 Feb 2025
        endDate: 1738286400000, // 2 Feb 2025
        locationString: "New York, NY",
        locationLong: -74.006,
        locationLat: 40.7128,

        visibility: "private",
        maxParticipants: 100,
        currentParticipants: 75,
        pricing: 0,

        creator: "VC Fund",
        createdAt: 1735000000000,
        updatedAt: 1735500000000,
    }
];