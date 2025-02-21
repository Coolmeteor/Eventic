/**
 * API function library .ts file for profile
 * 
 */
export const API = 'http://127.0.0.1:5000';

export interface User {
    id: string,
    user_name: string,
    email: string,
    phone: string,
    data_of_birth: string,
    sex: string
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
    const response = await fetch(`${API}/profile/authorization`, {
        method: "GET",
        credentials: "include",
    });

    const userData = await response.json();

    if(response.ok){
        localStorage.setItem("user", JSON.stringify(userData.user));
    } else {
        window.alert(userData["error"]);
        window.location.href = "/cookie-login";
    }

    return userData;
};

// export async function fetchProfile(setToken:(token: string)=>void): Promise<{user: User} | void> {
//     const token = localStorage.getItem("access_token");
//     if(!token){
//         window.alert("Please login.");
//         window.location.href = "/login";
//         return;
//     }

//     const response = await fetch(`${API}/profile/authorization`, {
//         headers: {Authorization: `Bearer ${token}`},
//     });

//     const userData = await response.json();

//     if(response.ok){
//         localStorage.setItem("user", JSON.stringify(userData.user));
//         setToken(token);
//     } else {
//         window.alert(userData["error"]);
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         window.location.href = "/login";
//     }

//     return userData;
// };

export async function changeRequest(
    resetText: () => void,
    fetchPath: string,
    fetchMethod: string,
    fetchHeaders: {},
    fetchBody: string,
    setErrorText: (text: string) => void,

): Promise<ApiResponse | void>{
    resetText();

    const response = await fetch(fetchPath, {
        method: fetchMethod,
        credentials: "include",
        headers: fetchHeaders,
        body: fetchBody
    });

    const data = await response.json();

    if(response.ok){
        setErrorText(data.message);
        return data;
    } else {
        setErrorText(data.error);
        return;
    }
}



// export async function changeRequest(
//     resetText: () => void,
//     fetchPath: string,
//     fetchMethod: string,
//     fetchHeaders: {},
//     fetchBody: string,
//     token: string,
//     setErrorText: (text: string) => void,

// ): Promise<ApiResponse | void>{
//     resetText();

//     if(!token){
//         window.alert("Token is not available");
//         return;
//     }
//     const response = await fetch(fetchPath, {
//         method: fetchMethod,
//         headers: fetchHeaders,
//         body: fetchBody
//     });

//     const data = await response.json();

//     if(response.ok){
//         localStorage.setItem("user", JSON.stringify(data.user));
//         localStorage.setItem("access_token", JSON.stringify(data.access_token));
//         setErrorText(data.message);
//         return data;
//     } else {
//         setErrorText(data.error);
//         return;
//     }
// }