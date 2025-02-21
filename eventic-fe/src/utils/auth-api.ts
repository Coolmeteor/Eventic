/**
 * API function library .ts file for authentication
 */

export const API = 'http://127.0.0.1:5000';

export async function logout(){
    const response = await fetch(`${API}/auth_t/logout`, {
        method: "POST",
        credentials: "include"
    });

    const data = await response.json();

    if(response.ok){
        console.log(data.message);
        window.location.href = "/cookie-login";
        return;
    } else {
        console.log("Some error happened in logging you out");
    }
}