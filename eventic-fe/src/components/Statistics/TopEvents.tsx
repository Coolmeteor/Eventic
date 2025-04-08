import { EventStats } from "@/utils/statistics"
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/format";
import DefaultLinkButton from "../DefaultLinkButton";



type Props = {
    statsData: EventStats[];
}

export default function TopEvents({
    statsData,
}: Props){
    const [topEvents, setTopEvents] = useState<EventStats[]>([]);

    useEffect(() => {
        setTopEvents(statsData
            .slice()
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 3)
        );
    }, [])

    return (
        <div className="top-events">
            <ul className="list">
                {topEvents.map((e, i) => (
                    <div className="event-info">
                        <li key={e.name} className={`list-${i}`}>
                            {i + 1}. <a className="event-name">{e.name}</a> Sales: {formatCurrency(e.sales)}
                        </li>
                        <button 
                            onClick={() => {window.location.href = `/event/${e.id}`}}
                            className="button"
                        >
                            View event
                        </button>
                    </div>
                ))}
                    
                    
            </ul>

            <style jsx>{`
            .top-events {
                diplay: flex;
                justify-content: center;
                margin: 1rem 2rem 1rem 2rem;
            }

            .list {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: left;
            }

            .event-name {
                display: inline-block;
                width: 300px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                vertical-align: bottom;
            }

            .event-info {
                display: flex;
                justify-content: space-between;
                align-items: left;
                max-width: 700px;
            }

            .button {
                font-size: 1.5rem;
                font-weight: bold;
                color: #0091eb;
                font-family: var(--font-calps);
            }

            .button:hover {
                text-decoration: underline;
            }

            .list li {
                margin: 0.5rem 1rem 0.5rem 1rem;
            }

            .list-0 {
                font-size: var(--font-size-body-XXL);
                border-bottom: 2px solid black;
                font-weight: bold;
            }
            
            .list-1 {
                font-size: var(--font-size-body-XL);
            }

            .list-2 {
                font-size: var(--font-size-body-XL);
            }
            `}</style>
        </div>
    )
}