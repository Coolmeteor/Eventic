/**
 * API function library .ts file for authentication
 */
import { API } from "@/constants";

export async function convertResponse(response: Response){
    const contentType = response.headers.get("Content-Type");

    if(contentType && contentType.includes("application/json")){
        return await response.json();
    } else {
        return await response.text();
    }
}

export async function logout(){
    const response = await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });

    const data = await convertResponse(response);

    if(response.ok){
        console.log(data.message);
        window.location.href = "/login";
        return;
    } else {
        console.log("Error during logging out");
    }
}

export async function refreshAccessToken() {
    const response = await fetch(`${API}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });


    const data = await convertResponse(response);

    if(response.ok){
        console.log(data.message);
        return response;
    } else {
        console.log(data.error);
        return;
    }
}