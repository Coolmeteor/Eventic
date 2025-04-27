import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { CSSProperties } from 'react';
import DefaultButton from '../DefaultButton';
import { ChartData, DoWLabels, FetchDailyChart, SortType } from '@/utils/statistics';
import { LoadingMessage } from '../LoadingMessage';


type Props = {
    organizerId?: number;
}

const sortTypes = [
    { value: "purchase_date", label: "Purchased Date"},
    { value: "start_date", label: "Event Start Time"},
];


export default function DailyChart({
    organizerId,
}: Props){
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);
    const [sortType, setSortType] = useState("purchase_date");

    useEffect(() => {
        const loadData = async () => {
            const fetchedData = await FetchDailyChart();
            if (fetchedData && "chart_data" in fetchedData){
                setChartData(fetchedData.chart_data as ChartData[])
            }

            setIsLoading(false);
        }

        loadData();
    }, [retryCount]);

    const handleSortTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortType(e.target.value);
        const fetchedStatsData = await FetchDailyChart(e.target.value as SortType);
        if (fetchedStatsData && "chart_data" in fetchedStatsData) {
            setChartData(fetchedStatsData.chart_data as ChartData[]);
        }
    };


    if (chartData.length === 0){
        if(isLoading){
            return <LoadingMessage>Loading daily chart data</LoadingMessage>
        }
        else {
            if (retryCount < 3){
                setTimeout(() => setRetryCount(retryCount + 1), 1000);
                return <LoadingMessage>Try to reload...</LoadingMessage>
            }
            else {
                
            }
        }
    }

    return (
        <>
            <div className='container'>
                <h2 className='chart-label'>Daily</h2>
                <div className="sort-container">
                    <label htmlFor="sort-select" className="sort-label">Select data by:</label>
                    <select
                        id="sort-select"
                        value={sortType}
                        onChange={handleSortTypeChange}
                        className="select-box"
                    >
                        {
                            sortTypes.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                        className="chart" 
                        data={chartData}
                        margin={{ top: 10, right: 5, bottom: 30, left: -10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            label={{
                                value: "Hour",
                                position: "insideBottom",
                                offset: -20,
                                style: { fill: "black", fontSize: "1.5rem" }
                            }}
                            dataKey="hour"
                            interval={0}
                            tickFormatter={(hour) => (hour % 4 === 0 ? `${hour}` : '')}
                        />
                        <YAxis 
                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                        />
                        <Tooltip 
                            formatter={(value) => `$${value.toLocaleString()}`}
                        />
                        <Line 
                            type="linear" 
                            dataKey="sales" 
                            stroke="red" 
                            strokeWidth={2} 
                        />
                    </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <style jsx>{`
            .container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 1rem;
                width: 95%;
                min-height: 300px;
            }
                
            .chart-label {
                font-size: 1.5rem;
            }
            .chart-container {
                width: 100%;
                height: 500px;
                margin: 1rem;
                padding: 1rem;
                border: 2px solid gray;
                border-radius: 20px;
            }

            .sort-container {
                display: flex;
                flex-diretion: row;
                margin: 1rem;
                gap: 8px;
            }

            .sort-label {
                font-size: 1.2rem;
            }

            .select-box {
                font-size: 1.2rem;
            }
            
            `}</style>
        </>
    )
}