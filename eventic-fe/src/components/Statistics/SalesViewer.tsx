import { useEffect, useState } from "react";
import SalesChart from "@/components/Statistics/SalesChart";
import EventTable from "@/components/Statistics/EventTable";
import WeeklyChart from "./WeeklyChart";
import DailyChart from "./DailyChart";
import { EventStats, FetchEventStats, mockStats, mockTotalStats } from "@/utils/statistics";
import { LoadingMessage } from "../LoadingMessage";
import TopEvents from "./TopEvents";


type Props = {
    organizerId: number;
}
export default function SalesViewer({
    organizerId,
}: Props){
    const [totalStats, setTotalStats] = useState<EventStats>();
    const [statsData, setStatsData] = useState<EventStats[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initialization (Fetch stats data)
    useEffect(() => {
        const loadStats = async () => {
            console.log("Start loading stats");
            const fetchData = await FetchEventStats();

            if ("stats_data" in fetchData && "total_stats" in fetchData) {
                setStatsData(fetchData.stats_data as EventStats[]);
                setTotalStats(fetchData.total_stats as EventStats);
            }
            
            setIsLoading(false);
        };

        loadStats();
    }, []);

    if(!totalStats || !statsData){
        if(isLoading){
            return <LoadingMessage>Loading data</LoadingMessage>
        }
        else {
            setTimeout(() => { window.location.href = "/org/stats"}, 2000);
            return (
                <LoadingMessage>
                    Failed to load data. Reloading data
                </LoadingMessage>
            )
        }
    }


    return (
        <div className="viewer-container">
            {isLoading ? (
                <LoadingMessage>Loading data</LoadingMessage>
            ) : !totalStats || !statsData ? (
                <LoadingMessage>
                    Failed to load data. Reloading data
                </LoadingMessage>
            ) : (
                <>
                    <h1 style={{fontSize: "var(--font-size-body-XXL)", fontWeight: 'bold'}}>Your Event Statistics</h1>
                    <div className="section">
                        <h2 className="label">&bull; Top Event by Sales</h2>
                        <TopEvents statsData={statsData}/>
                    </div>
                    <div className='section'>
                        <h2 className="label">&bull; Sales Chart</h2>
                        <div className="chart-container">
                            <SalesChart 
                                organizerId={organizerId}
                            />
                        </div>
                    </div>
                    

                    <div className='section'>
                        <h2 className="label">&bull; Event Sales Table</h2>
                        <div className='table-container'>
                            <EventTable statsData={statsData} totalStats={totalStats}/>
                        </div>
                    </div>
                    

                    <div className='section'>
                        <h2 className="label">&bull; Weekly & Daily chart</h2>
                        <div className="week-day-container">
                            <div className='week-chart'>
                                <WeeklyChart/>
                            </div>
                            <div className='day-chart'>
                                <DailyChart/>
                            </div>
                        </div>
                    </div>
                </>
            )}
            
            
            
            

            <style jsx>{`
            .viewer-container {
                width: 100%;
                height: 100%;
            }

            .section {
                margin-bottom: 2rem;
            }

            .chart-container {
                margin: 1rem;
                width: 100%;
                height: 100%;
            }

            .table-container {
                margin: 1rem;
                width: 100%
            }

            .week-day-container {
                display: flex;
                margin: 1rem;
                width: 100%;
            }

            .label {
                font-size: 2rem;
                margin: 1rem;
            }

            p {
                font-size: 2rem;
                margin: 2rem;
            }
            `}</style>
        </div>
    )
}