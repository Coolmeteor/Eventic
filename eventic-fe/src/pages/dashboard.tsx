import DefaultButton from "@/components/DefaultButton";
import EventCard from "@/components/EventCard";
import Section from "@/components/Section";
import { API, mockEvents } from "@/constants";



export default function Dashboard() {

    return (
        <>
            <Section fullWidth={true} usePadding={false}>
                <h1>Dashboard</h1>

                {/* <div className="top-header">
                        
                    </div> */}

                <div className="main-content">

                    <div className="left">
                        <h2>Recently visited</h2>
                        <div className="event-list">
                            {mockEvents.map((event) => (
                                <EventCard btn={{ click: () => { window.location.href = `/event/${event.id}`; }, text: "View more" }}
                                    key={event.id} event={event} large={false} />
                            ))
                            }
                        </div>


                        <h2>Comming soon</h2>
                        <div className="event-list">
                            {mockEvents.map((event) => (
                                <EventCard btn={{ click: () => { window.location.href = `/event/${event.id}`; }, text: "View more" }}
                                    key={event.id} event={event} large={false} />
                            ))
                            }
                        </div>



                        <h2>Your events</h2>
                        <div className="event-list">

                            {mockEvents.map((event) => (
                                <EventCard btn={{ click: () => { window.location.href = `/event/edit/${event.id}`; }, text: "Edit" }}
                                    key={event.id} event={event} large={false} />
                            ))
                            }
                        </div>
                    </div>


                    <div className="rsb">
                        {/*  put some extra stuff here */}
                        <div className="action-buttons">
                            <DefaultButton textColor="var(--color-primary)" onClick={() => window.location.href = "/event/create"}>Create new</DefaultButton>
                            <DefaultButton textColor="var(--color-primary)" onClick={() => window.location.href = "/event"}>Something else</DefaultButton>
                        </div>

                        <div className="spacer"></div>

                    </div>
                </div>


            </Section>


            <style jsx>{`

.full-w {
    width: 100%;
    flex-direction: column;
    display: flex;
}
.spacer {
    height: 2em;
}

.vertical-spacer {
    width: 2em;
}


h1 {
    font-size: var(--font-size-header-S);
    margin-bottom: 1em;
    padding-top: 28px;
}


h2 {
    font-size: var(--font-size-header-XS);
    margin-bottom: 0.5em;
    padding-top: 0.2em;
}


.top-header {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;

    color: white;
    background-color: var(--color-onPrimary);
    padding: 1em;
}
    




.main-content {
    display: flex;
    flex-direction: row;
    width: 100%;

    padding: 1em;
}

.left {
    display: flex;
    flex-direction: column;
    gap: 1em;
    
}

.event-list {
    display: flex;
    flex-direction: row;
    // flex-wrap: scroll;
    
    gap: 1em;
    justify-content: left;
    align-items: top;
    width: 100%;
    padding: 1em;
}





.rsb {
    min-width: 400px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-background-mid);

    padding: 1em;
    }
.rsb div  {
    // margin-bottom: 3em;
}
@media (max-width: 1000px) {
    .rsb {
        min-width: 250px;
    }
}
.rsb h2 {
    padding: 0.4em;
    padding-left: 0;
    font-size: var(--font-size-header-XS);
}
.rsb p {
    padding-left: 1em;
    padding-right: 1em;
    font-size: var(--font-size-body-L);
}



.action-buttons {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: top;
    margin: 1em;
    gap: 1em;
}
.errortext {
    color: red;
    font-size: var(--font-size-body-L);
}
             
            `}</style>
        </>
    )
}