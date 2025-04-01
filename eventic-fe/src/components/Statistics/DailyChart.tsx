import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { CSSProperties } from 'react';
import DefaultButton from '../DefaultButton';
import { DoWLabels, dailyChartData, hourlyData } from '@/utils/statistics';
import { LoadingMessage } from '../LoadingMessage';


type Props = {
    organizerId?: number;
}


export default function DailyChart({
    organizerId,
}: Props){
    const [chartData, setChartData] = useState<dailyChartData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data
    useEffect(() => {
        const loadData = async () => {
            setChartData(hourlyData);

            setIsLoading(false);
        };

        loadData();
    })

    if(!hourlyData){
        if(isLoading){
            return <LoadingMessage>Loading chart data</LoadingMessage>
        }
        else {
            return;
        }
    }

    return (
        <>
            <div className='container'>
                <h2 className='chart-label'>Daily</h2>

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
                        <Line type="monotone" dataKey="sales" stroke="red" strokeWidth={2} />
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