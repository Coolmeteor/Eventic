/**
 * API function library .ts file for authentication
 */
import { API } from "@/constants";

// Export for testing purpose
export function getAccessCSRFToken(){
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies){
        const [name, value] = cookie.split("=");
        if (name === "csrf_access_token") {
            return value || "";
        }
    }

    console.log("Access CSRF token not found");
    return "";  // If there is not CSRF token in Cookies
}

// Export for testing purpose
export function getRefreshCSRFToken(){
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies){
        const [name, value] = cookie.split("=");
        if (name === "csrf_refresh_token") {
            return value || "";
        }
    }

    console.log("Refresh CSRF token not found");
    return "";  // If there is not CSRF token in Cookies
}

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

export async function isAuthenticated() {
    let response = await fetch(`${API}/auth/check-auth`, {
        method: "POST",
        credentials: "include",
        headers: {
            // Try access token with CSRF token first
            "X-CSRF-TOKEN": getAccessCSRFToken()
        }
    });

    let data = await convertResponse(response);

    if(response.ok){;
        console.log(data.message);
        return true;
    } else {
        response = await fetch(`${API}/auth/check-auth`, {
            method: "POST",
            credentials: "include",
            headers: {
                // Try refresh token with CSRG token if access token expired
                "X-CSRF-TOKEN": getRefreshCSRFToken()
            }
        });

        data = await convertResponse(response);

        if(response.ok){
            console.log(data.message);
            return true;
        } else {
            console.error(data.error || data.msg);
            return false;
        }
    }
}

export async function refreshToken() {
    let response = await fetch(`${API}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
            // Send CSRF token to verify a refresh token
            "X-CSRF-TOKEN": getRefreshCSRFToken()
        }
    });

    let data = await convertResponse(response);

    if(response.ok){
        console.log(data.message);
        return response;
    } else {
        console.log(data.error || data.msg);
        return;
    }
}