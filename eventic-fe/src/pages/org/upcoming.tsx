import ProfileLayout from "@/components/Layouts/ProfileLayout";
import OrgEvents from "./events";

export default function OrgUpcomingEvents(){
    return <OrgEvents fetchParam="upcoming"/>
}

OrgUpcomingEvents.getLayout = function getLayout(page: React.ReactNode) {
    return <ProfileLayout>{page}</ProfileLayout>
}