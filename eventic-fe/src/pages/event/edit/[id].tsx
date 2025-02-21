import { useRouter } from "next/router";
import Section from "@/components/Section";
import EventEditor from "@/components/EventEditor";


export default function EventEditorPage() {
    const router = useRouter();
    const { id } = router.query // use same form for event edit id

    return (
        <>
            <Section>
                {id != undefined && <EventEditor eventId={id} />}
            </Section >
        </>

    );
}
