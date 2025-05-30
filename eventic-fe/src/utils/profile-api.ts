/**
 * API function library .ts file for profile
 * 
 */
import { API } from "@/constants";
import { refreshToken, convertResponse } from "./auth-api";

export interface User {
    id: number;
    user_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    sex: string;
    is_org: boolean;
    avator: string;
}

export type Gender = "Male" | "Female" | "Other";
export const genderValues: Gender[] = ["Male", "Female", "Other"];
export function isValidGender(value: string): value is Gender {
    return genderValues.some((g) => g === value);
}

interface SuccessResponse {
    message: string,
    user: User,
}

interface ErrorResponse {
    error: string
}

type ApiResponse = SuccessResponse | ErrorResponse;


export async function fetchProfile(): Promise<{user: User} | void> {
    let response = await fetch(`${API}/profile/get-profile`, {
        method: "GET",
        credentials: "include",
    });    

    // If the access token expired, try to fetch new access token using refresh token
    if(response.status == 401) {
        console.log("Access token expired. Attemping to refresh...");

        const refreshed = await refreshToken();
        if(!refreshed){
            console.error("Refresh failed. Redirecting to login.");
            window.location.href = "/login";
            return;
        }
        
        // Refetch
        response = await fetch(`${API}/profile/get-profile`, {
            method: "GET",
            credentials: "include",
        });
    }


    const userData = await convertResponse(response);

    if(response.ok){
        console.log(userData.message);
        return userData;
    } else {
        console.log(userData.error || userData.msg);
        return;
    }
};

export async function changeRequest(
    resetText: () => void,
    fetchPath: string,
    fetchMethod: string,
    fetchHeaders: {},
    fetchBody: string,
    setErrorText: (text: string) => void,

): Promise<ApiResponse | void>{
    resetText();

    let response = await fetch(fetchPath, {
        method: fetchMethod,
        credentials: "include",
        headers: fetchHeaders,
        body: fetchBody
    });

    // If the access token expired, try to fetch new access token using refresh token
    if(response.status == 401) {
        console.log("Access token expired. Attemping to refresh...");

        const refreshed = await refreshToken();
        if(!refreshed){
            console.error("Refresh failed. Redirecting to login.");
            window.location.href = "/login";
            return;
        }
        
        // Refetch 
        response = await fetch(fetchPath, {
            method: fetchMethod,
            credentials: "include",
            headers: fetchHeaders,
            body: fetchBody
        });
    }

    const data = await convertResponse(response);
    setTimeout(() => {setErrorText("")}, 2000);

    
    if(response.ok){
        console.log(data.message);
        setErrorText(data.message);
        return data;
    } else {
        console.log(data.error || data.msg);
        setErrorText(data.error || data.msg);
        return;
    }
}

export async function fetchOrders(){
    let response = await fetch(`${API}/profile/orders`, {
        "method": "GET",
        "credentials": "include",
    });
    
    

    if(!response.ok){
        if(response.status === 401){
            const refreshed = await refreshToken();
            if(!refreshed){
                console.error("Refresh failed. Redirecting to login.");
                window.location.href = "/login";
                return undefined;
            }

            response = await fetch(`${API}/profile/orders`, {
                "method": "GET",
                "credentials": "include",
            });
        }
    }

    const data = await convertResponse(response);

    if(!response.ok){
        console.log(data);
        return undefined;
    }

    console.log(data.message);

    return data;
}

export async function fetchUpcomingOrders(){
    let response = await fetch(`${API}/profile/upcomoing-tickets`, {
        "method": "GET",
        "credentials": "include",
    });
    
    

    if(!response.ok){
        if(response.status === 401){
            const refreshed = await refreshToken();
            if(!refreshed){
                console.error("Refresh failed. Redirecting to login.");
                window.location.href = "/login";
                return undefined;
            }

            response = await fetch(`${API}/profile/orders`, {
                "method": "GET",
                "credentials": "include",
            });
        }
    }

    const data = await convertResponse(response);

    if(!response.ok){
        console.log(data);
        return undefined;
    }

    console.log(data.message);

    return data;
}