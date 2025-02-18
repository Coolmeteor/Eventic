import { useState, useEffect, useRef } from 'react';
import DefaultLinkButton from '../DefaultLinkButton';
import DefaultInputForm from '../DefaultInputForm';

const API = 'http://127.0.0.1:5000'

type Props = {
    username: string,
    toHome: ()=>void
}

export default function PersonalForm({username, toHome}: Props){
    const [nameInp, setNameInp] = useState<string>("");
    const [curPass, setCurPass] = useState<string>("");
    const [newPass, setNewPass] = useState<string>("");

    const [nameErrorText, setNameErrorText] = useState<string>("");
    const [passErrorText, setPassErrorText] = useState<string>("");


    function resetErrorText(){
        setNameErrorText("");
        setPassErrorText("");
    }

    const [user, setUser] = useState(null);
    const [token, setToken] = useState<string>("");
    
    const fetchProfile = async () => {
        const token = localStorage.getItem("access_token");
        if(!token){
            window.alert("Please login.");
            window.location.href = "/login";
            return "";
        }

        const response = await fetch(`${API}/profile/authorization`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        const _data = await response.json();


        if(response.ok){
            setUser(_data.user);
            localStorage.setItem("user", JSON.stringify(_data.user));
        } else {
            window.alert(_data["error"]);

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }

        return token;
    };

    useEffect(()=>{
        fetchProfile().then((token) => setToken(token));
    }, [])


    async function changeUsername(_newUsername: string){
        resetErrorText();

        if(!token){
            window.alert("Token is not available");
            return;
        }
        const response = await fetch(`${API}/profile/chUsername`, {
            method: "PATCH",
            headers: {  
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_name: _newUsername
            }),
        });

        const data = await response.json();

        if(response.ok){
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("access_token", JSON.stringify(data.access_token));
            setToken(data.access_token);
            setNameInp("");
            setNameErrorText(data["message"]);
        } else {
            setNameErrorText(data["error"]);
            return;
        }
    }

    async function changePassword(_currentPassword: string, _newPassword: string){
        resetErrorText();
        
        if(!token){
            console.log("Token is not available");
            return;
        }

        const response = await fetch(`${API}/profile/chPass`, {
            method: "PATCH",
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                current_password: _currentPassword,
                new_password: _newPassword
            }),
        })

        const data = await response.json();

        if(response.ok){
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("access_token", JSON.stringify(data.access_token));
            console.log(_newPassword, _currentPassword);
            setCurPass("");
            setNewPass("");
            setToken(data.access_token);
            setPassErrorText(data["message"]);
        } else {
            setPassErrorText(data["error"]);
            return;
        }
    }

    return(
        <>
            
            {
                user ? (
                    <div className="changeForm">
                        <div className="topLink">
                            <DefaultLinkButton onClick={toHome} className="textLink">Profile</DefaultLinkButton>
                            {' -> '} Change username / password
                        </div>
                        <div className="formBox">
                            <h1>Username</h1>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                changeUsername(e.target[0].value);
                            }}>
                                <p>&bull; Your current username: <span>{user["user_name"]}</span></p>
                                <DefaultInputForm className="input" value={nameInp} onChange={(e) =>setNameInp(e.target.value)} id="username" type="text" placeholder="New username"/>
                                <p style={{color: "red"}}>{nameErrorText}</p>
                                <p>
                                    <button type="submit">Change username</button>
                                </p>
                            </form>
                            
                        </div>

                        <div className="formBox">
                            <h1>Password</h1>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                changePassword(e.target[0].value, e.target[1].value);
                            }}>
                                <p>&bull; Enter your current password</p>
                                <DefaultInputForm className="input" value={curPass} onChange={(e) =>setCurPass(e.target.value)} id="currentPassword" type="password" placeholder="Current Password"/>
                                <p>&bull; Enter new password</p>
                                <DefaultInputForm className="input" value={newPass} onChange={(e) =>setNewPass(e.target.value)} id="newPassword" type="password" placeholder="New Password"/>
                                <p style={{color: "red"}}>{passErrorText}</p>
                                <p>
                                    <button type="submit">Change password</button>
                                </p>
                            </form>
                            
                        </div>
                    </div>
                ) : (
                    <div className="changeForm" style={{fontSize: "3rem", margin: "4rem"}}>Loading...</div>
                )
            }
            

            <style jsx>{`
            .topLink {
                margin: 0.5rem;
            }
            .changeForm {
                width: 90%;
                min-height: 500px;
                margin-bottom: 0.5rem;
            }
            
            .formBox {
                margin: 1rem 1rem 1rem 5rem;
            }

            .formBox h1 {
                font-size: 2rem;
                margin: 0.5rem;
            }

            .formBox p {
                margin: 1rem;
            }
            
            .formBox span {
                font-weight: bold;
            }

            

            .formBox button {
                padding: 0.5rem;
                margin: 0.5rem 0.5rem 0.5rem 10rem;
                width: 10rem;
                background-color: var(--color-primary);
                color: black;
                border: none;
                border-radius: 10px;
                transition: .1s;
            }

            .formBox button:hover {
                background-color: var(--color-primary-dark);
            }

            .homeButton {
                background: var(--color-primary-green);
                border:2px solid #000;
                margin: 0 0 0 60%;
            }
            `}</style>
        </>
    )
}