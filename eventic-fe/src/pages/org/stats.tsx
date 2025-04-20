import SalesViewer from "@/components/Statistics/SalesViewer";
import ProfileLayout from "@/components/Layouts/ProfileLayout";
import { useEffect, useState } from "react";
import { User, fetchProfile } from "@/utils/profile-api";
import { LoadingMessage } from "@/components/LoadingMessage";
import { Forbidden } from "@/components/Forbidden";
import RightContainer from "@/components/Profile/RightContainer";


export default function Stats(){
    const [user, setUser] = useState<User>();
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const userData = await fetchProfile();
            if (userData && "user" in userData) {
                setUser(userData.user as User);
            }
            setLoadingUser(false);
        }

        loadUser();
    }, []);

    if(!user){
        if(loadingUser){
            return (
                <>
                    <LoadingMessage><p>Loading user</p></LoadingMessage>
                    <style jsx>{`
                    p {
                        font-size: 2rem;
                        margin: 2rem;
                    }
                    `}</style>
                </>
            )
        }
        else {
            setTimeout(() => { window.location.href = "/login"; }, 2000);
            return (
                <>
                    <LoadingMessage><p>Redirecting to login page</p></LoadingMessage>
                    <style jsx>{`
                    p {
                        font-size: 2rem;
                        margin: 2rem;
                    }
                    `}</style>
                </>
            );
        }
    }

    if(!user.is_org){
        setTimeout(() => { window.location.href = "/"; }, 2000);
        return (
            <div>
                <Forbidden/>
                <LoadingMessage>
                    <p>You are not an organizer</p>
                    <a>Redirecting to home</a>
                </LoadingMessage>
            </div>
        )
    }

    return (
        <RightContainer pageName="Statistics">
            <div className="stats-container">                
                <div className="sales-container">
                    <SalesViewer organizerId={0}/>
                </div>
            </div>

            <style jsx>{`
            .stats-container {
                width: 100%;
                height: 100%;
                padding: 1rem;
            }

            .sales-container {
                width: 100%;
                height: 100%;
            }
            `}</style>
        </RightContainer>
        
        
    );
}

Stats.getLayout = function getLayout(page: React.ReactNode){
    return <ProfileLayout>{page}</ProfileLayout>
}