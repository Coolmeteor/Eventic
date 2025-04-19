import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { CSSProperties } from 'react';
import DefaultButton from '../DefaultButton';
import { ChartData, DoWLabels, FetchWeeklyChart } from '@/utils/statistics';
import { LoadingMessage } from '../LoadingMessage';

const data = [
    { DoW: "Mon", sales: 1234.55},
    { DoW: "Tue", sales: 875.30 },
    { DoW: "Wed", sales: 1120.00 },
    { DoW: "Thu", sales: 950.25 },
    { DoW: "Fri", sales: 1400.75 },
    { DoW: "Sat", sales: 1850.90 },
    { DoW: "Sun", sales: 760.10 },
]


export default function WeeklyChart(){
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            const fetchedData = await FetchWeeklyChart();
            if (fetchedData && "chart_data" in fetchedData){
                setChartData(fetchedData.chart_data as ChartData[])
                console.log("Weekly data:", fetchedData.chart_data);
            }

            setIsLoading(false);
        }

        loadData();
    }, [retryCount]);


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
                <h2 className='chart-label'>Weekly</h2>

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
                                value: "Day of Week",
                                position: "insideBottom",
                                offset: -20,
                                style: { fill: "black", fontSize: "1.5rem" }
                            }}
                            dataKey="dow"
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
            
            `}</style>
        </>
    )
}