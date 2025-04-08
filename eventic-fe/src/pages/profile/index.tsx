import { useState, useEffect } from "react";
import ProfileLayout from "@/components/Layouts/ProfileLayout";
import DefaultIconButton from "@/components/DefaultIconButton";
import { fetchProfile, User } from "@/utils/profile-api";
import { logout } from "@/utils/auth-api";
import { useRouter } from "next/router";
import { userAccountIcons, managementIcons, orgAccountIcons } from "@/utils/profile-page-mng";


let IsOrgLayout = false;
export default function ProfileMain(){    
    const [isOrganizer, setIsOrganizer] = useState<boolean>(true); // Should be set with data from DB

    const [errorText, setErrorText] = useState<string>("");

    /*
    Fetch user information
     */
    const [user, setUser] = useState<User>();

    useEffect(() => {
        // Fetch user info
        const loadUser = async () => {
            const userData = await fetchProfile();

            if (userData && "user" in userData){
                setUser(userData.user);
                setIsOrganizer(userData.user.is_org);
                IsOrgLayout = userData.user.is_org;
            }
        }

        loadUser();
    }, []);

    if (!user)
        return <h1 style={{fontSize: "4rem", display: "block", textAlign: "center"}}>Loading...</h1>

    

    return(
        <>       
            <div className="iconList">
                <div className="errorMessage">{errorText}</div>
                <h1 className="greeting">Hello {user["user_name"]}!</h1>
                {
                    !isOrganizer ? (
                        <div>
                            <h1 className="listLabel">Your account</h1>
                            {userAccountIcons.map((item) => (
                                <DefaultIconButton title={item.label} icons={item.icon} onClick={item.onClick}></DefaultIconButton>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div>
                                <h1 className="listLabel">Event Management</h1>
                                {managementIcons.map((item) => (
                                    <DefaultIconButton title={item.label} icons={item.icon} onClick={item.onClick}></DefaultIconButton>
                                ))}
                            </div>
                            <div>
                                <h1 className="listLabel">Your Account</h1>
                                {orgAccountIcons.map((item) => (
                                    <DefaultIconButton title={item.label} icons={item.icon} onClick={item.onClick}></DefaultIconButton>
                                ))}
                            </div>
                        </>
                        
                    )
                }
            </div>
        </>
    )
};

ProfileMain.getLayout = function getLayout(page: React.ReactNode){
    return <ProfileLayout>{page}</ProfileLayout>
}