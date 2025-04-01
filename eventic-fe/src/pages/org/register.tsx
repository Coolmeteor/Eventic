import { useState } from "react";
import DefaultLinkButton from "@/components/DefaultLinkButton";
import { convertResponse } from "@/utils/auth-api";
import { API } from "@/constants";
import DefaultInputForm from "@/components/DefaultInputForm";
import { formatPhoneNumber, unformatPhoneNumber } from "@/utils/format";

type Props = {
    setIsLogin: (isLogin: boolean) => void;
}
export default function Register({
    setIsLogin,
}: Props){

    const [errorText, setErrorText] = useState("");

    async function register(email: string, username: string, phone: string, password: string, confirmPassword: string) {
            if (!username) {
                setErrorText("Please enter your username");
                return;
            }
            if (!password) {
                setErrorText("Please enter your password");
                return;
            }
            if (password.length < 5) {
                setErrorText("Password must be at least 5 characters long");
                return;
            }
            if (password !== confirmPassword) {
                setErrorText("Passwords do not match");
                return;
            }
            setErrorText("");
    
            const body = {
                user_name: username,  // Ensure the parameters match the backend
                email,
                phone,
                password,
                is_org: true,
            };
    
            try {
                const response = await fetch(`${API}/auth/register`, {
                    method: "POST",
                    credentials: "include", // To send cookie
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
    
                const data = await convertResponse(response);
    
                if(response.ok){
                    window.location.href = "/profile";
                    console.log(data.message);
                    return;
                } else {
                    console.log("Registration Failed:", data.error);
                    setErrorText(data.error);
                    return;
                }
    
            } catch (error) {
                setErrorText("Registration error: " + (error as Error).message);
                console.error("Registration error:", error);
            }
    }

    const [phoneValue, setPhoneValue] = useState("");

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = formatPhoneNumber(e.target.value || "");
        setPhoneValue(formattedPhone);
    }
    
    return (
        <>
            <div className="form-container">
                <h1>Create an organizer account</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    register(
                        e.currentTarget.email.value,
                        e.currentTarget.username.value,
                        unformatPhoneNumber(e.currentTarget.phone.value),
                        e.currentTarget.password.value,
                        e.currentTarget.passwordconf.value
                    );
                }}>
                    <input id="email" type="email" placeholder="Email address"/>
                    <input id="username" type="text" placeholder="Username"/>
                    <DefaultInputForm
                        className="input" 
                        value={phoneValue} 
                        onChange={handlePhoneChange}
                        id="phone" 
                        type="tel"
                        inputMode="numeric"
                        placeholder="Phone number"
                        style={{
                            margin: "0.5rem 0 0.5rem 0"
                        }}
                    />
                    <input id="password" type="password" placeholder="Password"/>
                    <input id="passwordconf" type="password" placeholder="Confirm Password"/>
                    {errorText && <p className="errortext">{errorText}</p>}
                    <button type="submit">Register</button>
                </form>
            </div>

            <style jsx>{`
            .form-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }

            .form-container h1 {
                font-size: 2rem;
                margin-bottom: 1rem;
            }

            .form-container form {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }

            .form-container input {
                padding: 0.5rem;
                margin: 0.5rem;
                width: 20rem;
                background-color: var(--color-background-mid);
            }

            .form-container button {
                padding: 0.5rem;
                margin: 0.5rem;
                width: 20rem;
                background-color: var(--color-primary);
                color: black;
                border: none;
            }

            .form-container button:hover {
                background-color: var(--color-primary-dark);
            }

            .errortext {
                color: red;
            }

            .org-register-container {
                diapley: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: 2rem;
            }

            .org-register-container p {
                text-align: center;
            }
            
            `}</style>
        </>
    );
}