import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useMemo, useState } from 'react';
import { CSSProperties } from 'react';
import DefaultButton from '../DefaultButton';
import {    ChartRequestBody, RequestDuration, RequestInterval,
            FetchChart,
            ChartData,
} from '@/utils/statistics';
import { LoadingMessage } from '../LoadingMessage';
const data = [
    { interval: '1月', sales: 120000 },
    { interval: '2月', sales: 135000 },
    { interval: '3月', sales: 110000 },
    { interval: '4月', sales: 150000 },
];

type Props = {
    organizerId: number;
    style?: CSSProperties;
};

const intervals = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month"}
];

const durations = [
    { value: "threeWeeks", interval: intervals[0].value, label: "3 Weeks"},
    { value: "threeMonths", interval: intervals[1].value, label: "3 Months"},
    { value: "oneYear", interval: intervals[2].value, label: "1 Year"},
    { value: "threeYears", interval: intervals[2].value, label: "3 Years"},
];

export default function SalesLineChart({
    organizerId,
    style,
}: Props){
    const [interval, setInterval] = useState<RequestInterval>("month");
    const [duration, setDuration] = useState<RequestDuration>("oneYear");
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [labelInterval, setLabelInterval] = useState(0);

    const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInterval(e.target.value as RequestInterval);
        console.log(e.target.value);
    }

    const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const duration = e.target.value;
        console.log(duration);

        setDuration(duration as RequestDuration);
        const interval = durations.find(d => d.value === duration)?.interval;
        if (interval){
            setInterval(interval as RequestInterval);
        }
        console.log(duration);
    }

    const handleButtonClick = async () => {
        // Fetch chart data
        const fetchedChartData = await FetchChart({
            interval: interval,
            duration: duration,
        } as ChartRequestBody)
        if (fetchedChartData && "chart_data" in fetchedChartData){
            setChartData(fetchedChartData.chart_data as ChartData[]);
        }
        else {
            window.location.href = "/org/stats";
        }
    }


    useEffect(() => {
        const loadData = async () => {
            await handleButtonClick();
            setIsLoading(false);
        }

        loadData();
    }, []);

    if (chartData.length <= 0){
        if (isLoading){
            <LoadingMessage>Loading chart</LoadingMessage>
        }
        else {

        }
    }

    useMemo(() => {
        setLabelInterval(Math.max(Math.ceil((chartData.length / 20) - 1), 0));
    }, [chartData]);

    return (
        <>
            <div className='container' style={style}>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height="70%">
                    <LineChart 
                        className="chart" 
                        data={chartData}
                        margin={{ top: 10, right: 40, bottom: 30, left: 40 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            label={{
                                value: "Date",
                                position: "insideBottom",
                                offset: -20,
                                style: { fill: "black", fontSize: "1.5rem" }
                            }}
                            dataKey="interval"
                            tickFormatter={(tick) => 
                                new Date(tick).toLocaleDateString("en-CA", { month: "short", day: "numeric", timeZone: "UTC" })
                            }

                            tick={({ x, y, payload, index }) => {
                                const date = new Date(payload.value);
                                const day = date.getUTCDate();
                                const isFirst = index === 0;
                                const isLast = index === chartData.length - 1;
                                const isMonthStart = day === 1;

                                const withMonth = isFirst || isLast || isMonthStart;
                                let label;

                                label = date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    timeZone: "UTC"
                                });
                            
                            
                                return (
                                    <text
                                        x={x}
                                        y={y + 15}
                                        textAnchor="middle"
                                        // fontWeight={withMonth ? "bold" : "normal"}
                                        style={{ fontSize: 14 }}
                                    >
                                        {label}
                                    </text>
                                );
                            }}
                            interval={labelInterval}
                        />
                        <YAxis 
                            label={{
                                value: "Sales ($)",
                                angle: -90,
                                position: "insideLeft",
                                offset: -20,
                                style: { fill: "black", fontSize: "1.5rem" }
                            }}
                        />
                        <Tooltip 
                            labelFormatter={(label) => new Date(label).toLocaleDateString("en-CA", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                timeZone: "UTC",
                            })}
                            formatter={(value) => [`$${value}`, "Sales"]}
                        />
                        <Line 
                            type="linear" 
                            dataKey="sales" 
                            stroke="red" 
                            strokeWidth={2} 
                        />
                    </LineChart>
                    </ResponsiveContainer>

                    <div className="settings-container">
                        <label className="settings-label">Chart Settings</label>
                        <div className="box-container">
                            <div className="setting">
                                <label className="set-label">Duration</label>
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
                            <div className="setting">
                                <label className="set-label">Interval</label>
                                <select
                                    value={interval}
                                    onChange={handleIntervalChange}
                                    className="select-box"
                                >
                                    {
                                        intervals.map((item) => (
                                            <option value={item.value}>{item.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='button-container'>
                                <button 
                                    className="apply-button"
                                    onClick={handleButtonClick}
                                >Apply</button>
                            </div>
                        </div>
                    </div>
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
                min-height: 600px;
            }

            .chart-container {
                width: 100%;
                height: 600px;
                margin: 1rem;
                padding: 1rem;
                border: 2px solid gray;
                border-radius: 20px;
            }

            .settings-container {
                height: 30%;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .settings-label {
                font-size: 1.5rem;
                margin: 0.5rem auto 0.5rem 0.5rem;
                text-decoration: underline;
            }

            .box-container {
                display: flex;
                justify-content: space-evenly;
                height: 100px;
                width: 100%;
            }
            
            .setting {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: left;
            }

            .set-label {
                font-size: 1.2rem;
                margin: 5px 0 5px 0;
            }

            .select-box {
                font-size: 1.2rem;
                margin: 5px 0 5px 0;
            }

            .button-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .apply-button {
                padding: 0.5rem;
                width: 10rem;
                background-color: var(--color-primary);
                color: black;
                border: none;
                border-radius: 10px;
                transition: .1s;
            }

            .apply-button:hover {
                background-color: var(--color-primary-dark);
            }
            
            `}</style>
        </>
        
    );
};
