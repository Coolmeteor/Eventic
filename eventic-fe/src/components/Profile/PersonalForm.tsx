import { useState } from 'react';
import DefaultLinkButton from '../DefaultLinkButton';

type Props = {
    username: string,
    toHome: ()=>void
}

export default function PersonalForm({username, toHome}: Props){
    const [newUsername, setNewUsername] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

    const [nameErrorText, setNameErrorText] = useState<string>("");
    const [passErrorText, setPassErrorText] = useState<string>("");


    function resetErrorText(){
        setNameErrorText("");
        setPassErrorText("");
    }


    function changeUsername(_newUsername: string){
        resetErrorText();

        // Check the validity
        if(_newUsername == undefined || _newUsername == ""){
            setNameErrorText("New username is not entered");
            setPassErrorText("");
            return;
        }

        // Check if the new username is not the same as the current username

        
        // Send a request to change password
        setNewUsername(_newUsername);

        setNameErrorText("");
        window.alert("New username: " + _newUsername);
    }

    function changePassword(_currentPassword: string, _newPassword: string){
        resetErrorText();

        // Check the validity first
        if(_currentPassword == undefined || _currentPassword == ""){
            setPassErrorText("Current password is not entered");
            return;
        }
        if(_newPassword == undefined || _newPassword == ""){
            setPassErrorText("New password is not entered");
            return;
        }
        // Verify current password and check if new password is not identical to the current one
        
        // Send a request to change password
        setPassErrorText("");

        setNewPassword(_newPassword);
        window.alert("New password: " + _newPassword);
    }

    return(
        <>
            
            
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
                        <p>&bull; Your current username: <span>{username}</span></p>
                        <input id="username" type="text" placeholder="New username"/>
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
                        <input id="currentPassword" type="password" placeholder="Current Password"/>
                        <p>&bull; Enter new password</p>
                        <input id="newPassword" type="password" placeholder="New Password"/>
                        <p style={{color: "red"}}>{passErrorText}</p>
                        <p>
                            <button type="submit">Change password</button>
                        </p>
                    </form>
                    
                </div>
            </div>

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

            .formBox input {
                padding: 0.5rem;
                margin: 0 0 0 1.5rem;
                width: 20rem;
                background-color: var(--color-background-mid);
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