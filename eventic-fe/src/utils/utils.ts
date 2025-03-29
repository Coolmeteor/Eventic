import { eventCategories, eventCategoriesWithIcons } from "@/constants";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export function getEventIcon(category: string): IconDefinition {
    let found = eventCategoriesWithIcons[eventCategoriesWithIcons.length - 1].icon;
    eventCategoriesWithIcons.forEach((cat, i) => {
        if (cat.text.toLowerCase() === category.toLowerCase()) {
            found = cat.icon;
        }
    })

    return found
}