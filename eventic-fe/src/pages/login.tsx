import DefaultLinkButton from "@/components/DefaultLinkButton";
import Section from "@/components/Section";
import { API } from "@/constants";
import { convertResponse } from "@/utils/auth-api";
import { useRouter } from "next/router";
import { useState } from "react";


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
        if (!email) {
            setErrorText("Please enter your email");
            return;
        }
        if (!password) {
            setErrorText("Please enter your password");
            return;
        }
        setErrorText("");

        const body = { email, password };

        try {
            const response = await fetch(`${API}/auth/login`, {
                method: "POST",
                credentials: "include", // Send cookie data
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await convertResponse(response);

            if(response.ok){
                router.push("/");
                console.log(data.message);
                return;
            } else {
                console.log(data.error);
                setErrorText(data.error);
                return;
            }

        } catch (error) {
            setErrorText("Login error: " + (error as Error).message);
            console.error("Login error:", error);
        }
    }
    async function register(email: string, username: string, password: string, confirmPassword: string) {
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
            user_name: username,  // ✅  Ensure the parameters match the backend
            email,
            password,

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
                router.push("/");
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




    return (
        <Section>
            {isLogin ? (
                <div className="login">
                    <h1>Login</h1>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        login(e.currentTarget.email.value, e.currentTarget.password.value);
                        console.log("Email: ", e.currentTarget.email.value);
                    }}>
                        <input id="email" type="email" placeholder="Email address" required onInvalid={(e) => setErrorText("Email is invalid")} />
                        <input id="password" type="password" placeholder="Password" required />
                        {errorText && <p className="errortext">{errorText}</p>}
                        <button type="submit">Login</button>
                    </form>
                    <p>Don't have an account? <DefaultLinkButton onClick={() => setIsLogin(false)}>Create one</DefaultLinkButton></p>
                </div>
            ) : (
                <div className="login">
                    <h1>Create an account</h1>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        register(
                            e.currentTarget.email.value,
                            e.currentTarget.username.value,
                            e.currentTarget.password.value,
                            e.currentTarget.passwordconf.value
                        );
                    }}>
                        <input id="email" type="email" placeholder="Email address" required />
                        <input id="username" type="text" placeholder="Username" required />
                        <input id="password" type="password" placeholder="Password" required />
                        <input id="passwordconf" type="password" placeholder="Confirm Password" required />
                        {errorText && <p className="errortext">{errorText}</p>}
                        <button type="submit">Register</button>
                    </form>
                    <p>Already have an account? <DefaultLinkButton onClick={() => setIsLogin(true)}>Login</DefaultLinkButton></p>
                </div>
            )}
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
        </Section>
    );
}

Login.hideTopNav = true;