import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, setHours, setMinutes } from "date-fns";
import dynamic from 'next/dynamic';


type Props = {
    setDate: (dates: [number, number]) => void
}


export function CustomDatePicker({
    setDate
}: Props) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const fontSize = "1.5rem";

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
        if (date && endDate) {
            if (date > endDate) {
                setEndDate(null);
                setDate([date.getTime(), 0]);
            } else {
                setDate([date.getTime(), endDate.getTime()]);
            }
        }
    }

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
        if (date && startDate) {
            setDate([startDate.getTime(), date.getTime()]);
        }
    }

    const today = new Date();

    return (
        <div className="date-section">
            Selected date:
            <div>
                <DatePicker
                    className="datepicker"
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    showTimeSelectOnly={false}
                    dateFormat="yyyy/MM/dd HH:mm"
                    minDate={new Date(new Date().setDate(today.getDate() + 7))}
                    minTime={setHours(setMinutes(new Date(0), 0), 0)}
                    maxTime={setHours(setMinutes(new Date(), 59), 23)}
                    placeholderText="Choose start date"
                />
            </div>
            -
            <div>
                <DatePicker
                    className="datepicker"
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    showTimeSelectOnly={false}
                    dateFormat="yyyy/MM/dd HH:mm"
                    minDate={startDate || today}
                    minTime={startDate  && endDate && startDate.toDateString() === endDate.toDateString()
                        ? new Date(startDate) : setHours(setMinutes(new Date(0), 0), 0)}
                    maxTime={setHours(setMinutes(new Date(), 59), 23)}
                    placeholderText="Choose end date"
                />
            </div>
            


            
            
            
            <style jsx global>{`
            .date-section {
                margin: 1rem 2rem 1rem 2rem;
                font-size: ${fontSize};
                display: flex;
                align-items: center;
            }

            .date-section p {
                margin: 1rem;
            }

            .date-section a {
                font-weight: bold;
            }

            .datepicker {
                margin: 0 1rem 0 1rem;
                width: 200px;
                font-weight: bold;
                font-size: ${fontSize};
                text-align: center;
            }

            .datepicker input {
                font-size: ${fontSize};
            }



            `}</style>
        </div>
    )
}