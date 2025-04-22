import { EventStats, FetchEventStats } from "@/utils/statistics"
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/format";
import DefaultLinkButton from "../DefaultLinkButton";



type Props = {
    statsData: EventStats[];
}

const durations = [
    { value: "oneweek", label: "This week"},
    { value: "onemonth", label: "1 Month"},
    { value: "threemonths", label: "3 Months"},
    { value: "oneyear", label: "1 Year"},
    { value: "all", label: "All" },
];

export default function TopEvents({
    statsData,
}: Props){
    const [topEvents, setTopEvents] = useState<EventStats[]>([]);
    const [duration, setDuration] = useState("all");

    const getTopStats = (stats: EventStats[]) => {
        return stats
            .slice()
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 3);
    }
    useEffect(() => {
        setTopEvents(getTopStats(statsData));
    }, [])

    const handleDurationChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDuration(e.target.value);
        const fetchedStatsData = await FetchEventStats(e.target.value);
        if (fetchedStatsData && "stats_data" in fetchedStatsData) {
            setTopEvents(getTopStats(fetchedStatsData.stats_data as EventStats[]));
        }
    };

    return (
        <div className="top-events">
            <div className="duration-container">
                <label className="duration-label">Change Duration:</label>
                <select
                    value={duration}
                    onChange={handleDurationChange}
                    className="select-box"
                >
                    {
                        durations.map((item) => (
                            <option value={item.value}>{item.label}</option>
                        ))
                    }
                </select>
            </div>
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

            .duration-container {
                display: flex;
                flex-diretion: row;
                margin: 1rem;
                gap: 8px;
            }

            .duration-label {
                font-size: 1.2rem;
            }

            .select-box {
                font-size: 1.2rem;
            }
            `}</style>
        </div>
    )
}