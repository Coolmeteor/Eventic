import { getEventIcon } from "@/utils/utils"

jest.mock("@/constants", () => ({
    eventCategoriesWithIcons: [
        { text: "Music", icon: { iconName: "music" } },
        { text: "Art", icon: { iconName: "paint-brush" } },
        { text: "Default", icon: { iconName: "question-circle" } }
    ],
    eventCategories: []
}));

describe("getEventIcon", () => {
    it("Should return the correct icon for a matching category", () => {
        const result = getEventIcon("Music");
        expect(result.iconName).toBe("music");
    });

    it("Should be case insensitive", () => {
        const result = getEventIcon("art");
        expect(result.iconName).toBe("paint-brush");
    });

    it("Should return the default icon if no match is found", () => {
        const result = getEventIcon("Unknown Category");
        expect(result.iconName).toBe("question-circle");
    });
});
