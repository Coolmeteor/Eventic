import DefaultButton from "@/components/DefaultButton"
import Section from "@/components/Section"
import { useState, useEffect } from "react"

// temporary logout page until profile page is merged 
export default function Profile() {

    const [isLogin, setIsLogin] = useState<Boolean>(false);
    useEffect(() => {
        if (localStorage.getItem("authtoken") != null) {
            setIsLogin(true);
        } else {
            window.location.href = "/login"
        }
    }, []);

    return (
        <Section>
            {isLogin ? <h1>Welcome to your profile</h1> : <h1>You are not logged in</h1>}

            {isLogin &&
                <DefaultButton onClick={() => {
                    window.location.href = "/"
                    localStorage.removeItem("authtoken")
                }}>Logout</DefaultButton>
            }

        </Section>

    )
}