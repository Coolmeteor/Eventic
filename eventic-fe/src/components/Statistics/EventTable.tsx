import { useEffect, useState } from "react";
import { currencyKey, dateKey, EventStats, SortConfig, SortKey, sortKeys, sortStatsData } from "@/utils/statistics";
import { LoadingMessage } from "../LoadingMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faSort, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "@/utils/format";

const labels: {key: SortKey, label: string}[] = [
    { key: 'name', label: 'Event name' },
    { key: 'sold_num', label: 'Sold#' },
    { key: 'rem_num', label: 'Remaining#' },
    { key: 'total_num', label: 'Total#'},
    { key: 'date', label: 'Event Date'},
    { key: 'sales', label: 'Sales' },
    { key: 'profit', label: 'Expected Profit'},
]

const iconMap = Object.fromEntries(
    sortKeys.map((key) => [key, faSort])
) as Record<SortKey, IconDefinition>; 

type Props = {
    organizerId?: number;
    statsData: EventStats[];
    totalStats: EventStats;
}

export default function EventTable({
    statsData,
    totalStats,
}: Props){
    const [isLoading, setIsLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });
    const [sortedData, setSortedData] = useState<EventStats[]>([]);

    // Handle sorting button
    const handleSortButton = (key: SortKey) => {
        let tempSortConfig: SortConfig;
        console.log("Pressed key", key);
        if(sortConfig.key === key){
            if(sortConfig.direction === 'asc'){
                tempSortConfig = { key: key, direction: 'desc' };
                console.log("Make it desc for", key);
            }
            else {
                tempSortConfig = { key: key, direction: 'asc' };
                console.log("Make it asc for", key);
            }
        }
        else {
            tempSortConfig = { key: key, direction: 'asc' };
            console.log("Change sort key", key);
        }

        // Applt the temporary sortConfig
        setSortConfig(tempSortConfig);

        // Sort data
        setSortedData(sortStatsData(statsData, tempSortConfig));

        // Change icons
        Object.entries(iconMap).forEach(([key, icon]) => {
            if (key === tempSortConfig.key) {
                if(tempSortConfig.direction === 'asc'){
                    iconMap[key] = faSortUp;
                }
                else {
                    iconMap[key] = faSortDown;
                }
            }
            else {
                iconMap[key as SortKey] = faSort;
            }
        });
    }

    // Initialization (Fetch Data)
    useEffect(() => {
        const loadStats = async () => {
            setSortedData(statsData);
            setIsLoading(false);
        };

        loadStats();
    }, []);


    if(!totalStats || !sortedData) {
        if(isLoading){
            return <LoadingMessage>Loading event stats</LoadingMessage>;
        }
        else {
            return <LoadingMessage>No data</LoadingMessage>
        }
    }

    return (
        <div className="table-container">
            <table className="sales-table">
                <thead className="table-head">
                    <tr>
                        {labels.map(({key: key, label: label}) => (
                            <th key={key} className={`table-label-${key}`}>
                                {label}
                                <button onClick={() => handleSortButton(key)} style={{marginLeft: '0.5rem'}}>
                                    <FontAwesomeIcon icon={iconMap[key]} />
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="table-body">
                    {sortedData.map((data) => (
                        <tr>
                            {labels.map(({ key }) => (
                                <td 
                                    className={`table-label-${key}`}
                                    key={key} 
                                    style={{ 
                                        textAlign: currencyKey.includes(key) ? 'right' : 'left'
                                }}>
                                    {currencyKey.includes(key) 
                                        ? formatCurrency(data[key] as number)
                                        : dateKey.includes(key) 
                                            ? new Date(data[key] as number).toLocaleDateString()
                                            : data[key]
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tbody className="total-table-body">
                    <tr>
                        {labels.map(({ key }) => (
                            <td 
                                className={`table-label-${key}`}
                                key={key} 
                                style={{ 
                                    textAlign: currencyKey.includes(key) ? 'right' : 'left'
                            }}>
                                {currencyKey.includes(key)
                                    ? formatCurrency(totalStats[key] as number)
                                    : dateKey.includes(key)
                                        ? '-'
                                        : totalStats[key]
                                }
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>


            <style jsx>{`
            .table-container {
                padding: 0 1rem 0 1rem;
                margin: 1rem;
            }

            .sales-table {
                width: 100%;
                border-collapse: collapse;
            }

            .sales-table th, td {
                border: 1px solid black;
                padding: 0.5rem;
                text-align: left;
            }

            .table-label-name {
                max-width: 350px;
            }

            .table-label-soldNum {
                min-width: 75px;
            }

            .table-label-remNum {
                min-width: 110px;
            }

            .table-label-sales {
                min-width: 100px;
            }

            .table-label-profit {
                min-width: 140px;
            }

            .table-label-totalNum {
                min-width: 80px;
            }

            .table-label-date {
                min-width: 105px;
            }

            .sales-table td {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .table-head th {
                background-color: var(--color-background-gray);
            }

            .table-body th {
                background-color: var(--color-background-mid);
            }

            .total-table-body {
                font-weight: bold;
            }

            .total-table-body td {
                border-top: 3px double black;
            }
            
            `}</style>
        </div>
    )
}