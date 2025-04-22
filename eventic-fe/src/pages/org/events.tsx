import { useEffect, useState, useMemo } from "react";
import { EventCard } from "@/components/EventCard";
import { EventData } from "@/constants";
import { FetchOrgEvents, OrgEventFetchParam } from "@/utils/statistics";
import { LoadingMessage } from "@/components/LoadingMessage";
import ProfileLayout from "@/components/Layouts/ProfileLayout";
import RightContainer from "@/components/Profile/RightContainer";
import { fetchProfile } from "@/utils/profile-api";
import { Forbidden } from "@/components/Forbidden";

type Props = {
    fetchParam: OrgEventFetchParam;
}
export default function OrgEvents({
    fetchParam = "all",
}: Props) {
    const [events, SetEvents] = useState<EventData[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOrg, setIsOrg] = useState(true);




    // Check permission status
    useEffect(() => {
        fetchProfile()
            .then((userData) => {
                if (userData && "user" in userData) {
                    setIsOrg(userData.user.is_org);
                }
                else {
                    window.location.href = '/';
                }
            });
    }, [])


    useEffect(() => {
        const loadData = async () => {
            const events = await FetchOrgEvents(fetchParam);

            if (events && "events" in events) {
                console.log(events);
                SetEvents(events.events);
            }

            setIsLoading(false);
        };

        loadData();
    }, []);


    if (events == null) {
        if (!isLoading) {
            setTimeout(() => { window.location.href = "/" }, 2000);
        }
    }

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEvents = events?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = events ? Math.ceil(events.length / itemsPerPage) : 0;


    const pageButtons = useMemo(() => {
        const maxVisibleButtons = 5;
        const buttons: (number | string)[] = [];

        const half = Math.floor(maxVisibleButtons / 2);
        let start = Math.max(currentPage - half, 1);
        let end = Math.min(start + maxVisibleButtons - 1, totalPages);

        if (end - start + 1 < maxVisibleButtons) {
            start = Math.max(end - maxVisibleButtons + 1, 1);
        }

        if (start > 1) {
            buttons.push(1);
            if (start > 2) buttons.push("...");
        }

        for (let i = start; i <= end; i++) {
            buttons.push(i);
        }

        if (end < totalPages) {
            if (end < totalPages - 1) buttons.push("...");
            buttons.push(totalPages);
        }

        return buttons;
    }, [currentPage, events?.length]);

    return (
        <RightContainer pageName="Your events">
            <div className="event-container">
                <h2>Your events</h2>
                {!isOrg ? (
                    <div className='error-text'>
                        <Forbidden />
                        <LoadingMessage>
                            Redirecting to home
                        </LoadingMessage>
                    </div>
                ) : isLoading ? (
                    <div className='error-text'>
                        <LoadingMessage>
                            Loading
                        </LoadingMessage>
                    </div>
                ) : events == null ? (
                    <div className='error-text'>
                        <LoadingMessage>
                            Redirecting to home
                        </LoadingMessage>
                    </div>

                ) : events?.length && currentEvents?.length ? (
                    <div>
                        <div className="pagination">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
                                &laquo;
                            </button>
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                                &lt;
                            </button>

                            {pageButtons.map((btn, index) => (
                                typeof btn === "number" ? (
                                    <button
                                        key={index}
                                        className={currentPage === btn ? "active" : ""}
                                        onClick={() => setCurrentPage(btn)}
                                    >
                                        {btn}
                                    </button>
                                ) : (
                                    <span key={index} className="ellipsis">...</span>
                                )
                            ))}

                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                                &gt;
                            </button>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>
                                &raquo;
                            </button>
                        </div>
                        <div className="event-list">
                            {currentEvents.map((event) => (
                                <EventCard btn={{ href: `/event/edit/${event.id}`, text: "Edit" }}
                                    key={event.id} event={event} large={false} />
                            ))
                            }
                        </div>
                    </div>
                ) : (
                    <p>No events found</p>
                )}
            </div>

            <style jsx>{`
            .event-container {
                width: 100%;
                height: 100%;
                padding: 1rem;
            }

            .event-container h2 {
                font-size: 2rem;
                margin: 1rem;
            }

            .event-list {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                
                gap: 2em;
                justify-content: space-evenly;
                align-items: flex-start;
                width: 100%;
                padding: 1em;
            }

            .error-text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            p {
                font-size: 2rem;
                margin: 2rem;
            }

            .pagination {
                display: flex;
                justify-content: center;
                gap: 0.5rem;
                margin: 1rem;
            }
            .pagination button {
                font-size: 1rem;
                padding: 0.4rem 0.8rem;
                border: none;
                border-radius: 5px;
                background-color: #ddd;
                cursor: pointer;
            }
            .pagination button.active {
                background-color: #0070f3;
                color: white;
            }
            .pagination button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            `}</style>



        </RightContainer>
    )
}

OrgEvents.getLayout = function getLayout(page: React.ReactNode) {
    return <ProfileLayout>{page}</ProfileLayout>
}