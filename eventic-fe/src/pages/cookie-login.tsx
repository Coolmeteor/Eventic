import DefaultLinkButton from "@/components/DefaultLinkButton";
import Section from "@/components/Section";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { API } from "@/utils/profile-api"

export default function Login() {

    const [isLogin, setIsLogin] = useState<Boolean>(true);

    // wanted to do states so stores the values of the inputs for later use if needed, but async issues...
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [errorText, setErrorText] = useState<string>("");

    const router = useRouter();

    async function login(email: string, password: string) {
        const response = await fetch(`${API}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email, password: password})
        });

        const data = await response.json();

        if(response.ok){
            router.push("/profile");
            return;
        } else {
            console.log(data.error);
            return;
        }
    }

    function register(email: string, username: string, password: string, confirmPassword: string) {

        if (username == undefined || username == "") {
            setErrorText("Please enter your username");
            return
        }
        if (password == undefined || password == "") {
            setErrorText("Please enter your password");
            return
        }
        // if (email == undefined || email == "") {
        //     setErrorText("Please enter your email");
        //     return
        // }
        if (password.length < 5) {
            setErrorText("Password must be at least 5 characters long");
            return
        }
        if (password != confirmPassword) {
            setErrorText("Passwords do not match");
            return
        }
        setErrorText("");
        setUsername(username);
        setPassword(password);
        setConfirmPassword(confirmPassword);
        setEmail(email);

        window.alert("Register (no backend yet) + username: " + username + " password: " + password + " email: " + email);
    }

    // useEffect(() => {
    //     console.log(username, password, email)
    // }, [username, password, email]);

    return (
        <>
            <Section>
                {
                    // switch between register and login
                    isLogin ?
                        (
                            <div className="login">
                                <h1>Login</h1>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    login(e.target[0].value, e.target[1].value);
                                }}>
                                    <input id="email" type="text" placeholder="Email" required={true}/>
                                    <input id="password" type="password" placeholder="Password" required={true}/>
                                    {errorText && <p className="errortext">{errorText}</p>}
                                    <button type="submit">Login</button>
                                </form>

                                <p>Don't have an account? <DefaultLinkButton onClick={() => setIsLogin(false)}>Create one</DefaultLinkButton></p>
                            </div>
                        )
                        :
                        (
                            <div className="login">
                                <h1>Create an account</h1>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    register( e.target[3].value,e.target[0].value, e.target[1].value, e.target[2].value);
                                }
                                }>
                                    <input id="username" type="text" placeholder="Username" required={true}/>
                                    <input id="password" type="password" placeholder="Password" required={true}/>
                                    <input id="passwordconf" type="password" placeholder="Confirm Password" required={true}/>
                                    <input id="email" type="email" placeholder="Email address (Optional)" />

                                    {errorText && <p className="errortext">{errorText}</p>}
                                    <button type="submit">Register</button>
                                </form>

                                <p>Already have an account? <DefaultLinkButton onClick={() => setIsLogin(true)}>Login</DefaultLinkButton></p>
                            </div>
                        )
                }


            </Section>
            <style jsx>{`

            .login {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }

            .login h1 {
                font-size: 2rem;
                margin-bottom: 1rem;
            }

            .login form {

                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }

            .login input {
                padding: 0.5rem;
                margin: 0.5rem;
                width: 20rem;
                background-color: var(--color-background-mid);
            }

            .login button {
                padding: 0.5rem;
                margin: 0.5rem;
                width: 20rem;
                background-color: var(--color-primary);
                color: black;
                border: none;
            }   

            .login button:hover {
                background-color: var(--color-primary-dark);
            }

            .errortext {
                color: red;
            }

            `}</style>
        </>

    );
}