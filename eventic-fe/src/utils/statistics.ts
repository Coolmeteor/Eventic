/*
    Statistics utilities
*/

import { API, mockEvents } from "@/constants";
import { useState } from "react";
import { convertResponse } from "./auth-api";


export interface EventStats {
    id: number;
    name: string;
    sold_num: number;
    rem_num: number;
    total_num: number;
    date: number;
    sales: number;
    profit: number;
}

export type SortKey = keyof EventStats;
export type RequestDuration = "threeWeeks" | "threeMonths" | "oneYear";
export type RequestInterval = "day" | "week" | "month";


export type ChartRequestBody = {
    duration: RequestDuration;
    interval: RequestInterval;
}

export const currencyKey: SortKey[] = [
    'sales',
    'profit',
]

export const dateKey: SortKey[] = [
    'date',
]

const forKeyExtraction = { id: 1, name: '', sold_num: 0, rem_num: 0, total_num: 0, date: 0, sales: 0, profit: 0 } as EventStats;
export const sortKeys = Object.keys(forKeyExtraction) as SortKey[] satisfies SortKey[];

export type SortConfig = {
    key: SortKey;
    direction: 'asc' | 'desc';
}

export type DoWLabels = [
    { DoW: 'monday', label: 'Mon' },
    { DoW: 'tuesday', label: 'Tue' },
    { DoW: 'wednesday', label: 'Wed'},
    { DoW: 'thursday', label: 'Thu'},
    { DoW: 'friday', label: 'Fri'},
    { DoW: 'saturday', label: 'Sat'},
    { DoW: 'sunday', label: 'Sun'},

]

export type ChartData = {
    date: number,
    sales: number,
}

export type dailyChartData = {
    hour: number,
    sales: number,
}

export const sortStatsData = (data: EventStats[], sortConfig: SortConfig) => {
    const sortedData = [...data].sort((a, b) => {
        if(!sortConfig.key) return 0;
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        
        // Sort Date sting as date
        const aDate = new Date(aVal);
        const bDate = new Date(bVal);
        const isDates = !isNaN(aDate.getTime()) && !isNaN(bDate.getTime());
        if (isDates) {
            if (aDate < bDate) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aDate > bDate) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        }
        
        // Sort number string as number
        const isNumeric = !isNaN(Number(aVal)) && !isNaN(Number(bVal));
        if (isNumeric) {
            aVal = Number(aVal);
            bVal = Number(bVal);
        }

        if(aVal < bVal)
            return sortConfig.direction === 'asc' ? -1 : 1;
        if(aVal > bVal)
            return sortConfig.direction === 'asc' ? 1 : -1;

        return 0;
    })

    return sortedData;
}

export async function FetchEventStats(duration="all"){
    let fetchURL;
    let response;
    if (duration == "all"){
        fetchURL = `${API}/stats/get-stats-list`;

        response = await fetch(fetchURL, {
            method: "GET",
            credentials: "include",
        });
    }
    else {
        fetchURL = `${API}/stats/get-stats-duration`;

        response = await fetch(fetchURL, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ duration: duration }),
        });
    }

    const data = await convertResponse(response);

    if(response.ok){
        console.log(data);
        return data;
    }
    else {
        return undefined;
    }
}

export async function FetchChart(body: ChartRequestBody): Promise<ChartData[]> {
    const response = await fetch(`${API}/stats/get-chart`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await convertResponse(response);

    if (response.ok) {
        console.log(data);
        return data;
    }
    else {
        return [];
    }
}

export type SortType = "purchase_date" | "start_date";

export async function FetchDailyChart(sortType: SortType = "purchase_date"){
    const response = await fetch(`${API}/stats/get-daily-chart`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({sort_type: sortType}),
    });

    const data = await convertResponse(response);

    if (response.ok) {
        console.log(data);
        return data;
    }
    else {
        return undefined;
    }
}

export async function FetchWeeklyChart(sortType: SortType = "purchase_date") {
    const response = await fetch(`${API}/stats/get-weekly-chart`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({sort_type: sortType}),
    });

    const data = await convertResponse(response);

    if (response.ok){
        console.log(data);
        return data;
    }
    else {
        return undefined;
    }
}

export type OrgEventFetchParam = "all" | "upcoming" | "previous";

export async function FetchOrgEvents(fetchParam: OrgEventFetchParam) {
    const fetchBaseURL = `${API}/stats/`;
    let endpoint;
    switch(fetchParam){
        case "all":
            endpoint = "get-events";
            break;
        case "upcoming":
            endpoint = "get-upcoming-events";
            break;
        case "previous":
            endpoint = "get-previous-events";
            break;
        default:
            console.error("FetchOrgEvents() param is invalid.");
            break;
    }

    const response = await fetch(`${fetchBaseURL}${endpoint}`, {
        method: "GET",
        credentials: "include",
    });

    const data = await convertResponse(response);

    if (response.ok) {
        console.log(data);
        return data;
    }
    else {
        return undefined;
    }

}

export const mockStats: EventStats[] = [
    {
        id: 1,
        name: "Test1",
        sold_num: 15,
        rem_num: 85,
        date: 1743397200000,
        total_num: 100,
        sales: 139.22,
        profit: 88.88
    },
    {
        id: mockEvents[0].id,
        name: mockEvents[0].name,
        sold_num: 55,
        rem_num: 12,
        date: 1743397200000,
        total_num: 67,
        sales: 1329.25,
        profit: 1005.35
    },
    {
        id: 1,
        name: "Test2",
        sold_num: 50,
        rem_num: 50,
        date: 1743397200000,
        total_num: 100,
        sales: 500.00,
        profit: 300.00
    },
    {
        id: mockEvents[1].id,
        name: mockEvents[1].name,
        sold_num: 90,
        rem_num: 10,
        date: 1743397200000,
        total_num: 100,
        sales: 1200.99,
        profit: 850.55
    },
    {
        id: 1,
        name: "Test4",
        sold_num: 0,
        rem_num: 100,
        date: 1743397200000,
        total_num: 100,
        sales: 0.00,
        profit: 0.00
    },
    {
        id: 1,
        name: "Test5",
        sold_num: 30,
        rem_num: 70,
        date: 1743397200000,
        total_num: 100,
        sales: 350.50,
        profit: 180.25
    },
    {
        id: mockEvents[2].id,
        name: mockEvents[2].name,
        sold_num: 75,
        rem_num: 25,
        date: 1743397200000,
        total_num: 100,
        sales: 899.99,
        profit: 550.00
    }
]

export const mockTotalStats: EventStats = {
    id: 1,
    name: "Total",
    sold_num: 315,
    rem_num: 352,
    date: 1743397200000,
    total_num: 667,
    sales: 4419.95,
    profit: 2974.03
}

export const hourlyData: dailyChartData[] = [
    { hour: 0, sales: 45 },
    { hour: 1, sales: 30 },
    { hour: 2, sales: 20 },
    { hour: 3, sales: 15 },
    { hour: 4, sales: 10 },
    { hour: 5, sales: 8 },
    { hour: 6, sales: 12 },
    { hour: 7, sales: 25 },
    { hour: 8, sales: 50 },
    { hour: 9, sales: 80 },
    { hour: 10, sales: 120 },
    { hour: 11, sales: 160 },
    { hour: 12, sales: 200 },
    { hour: 13, sales: 180 },
    { hour: 14, sales: 170 },
    { hour: 15, sales: 190 },
    { hour: 16, sales: 210 },
    { hour: 17, sales: 230 },
    { hour: 18, sales: 250 },
    { hour: 19, sales: 240 },
    { hour: 20, sales: 200 },
    { hour: 21, sales: 160 },
    { hour: 22, sales: 100 },
    { hour: 23, sales: 60 },
];
