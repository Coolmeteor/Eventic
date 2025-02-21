import { useState, useEffect } from 'react';
import { fetchProfile, changeRequest, User } from '../../utils/profile-api';

import ProfileLayout from '@/components/Layouts/ProfileLayout';
import PersonalForm from '@/components/Profile/PersonalForm';
import SecurityChangeFormBox from '@/components/Profile/EditComponents/SecurityChangeForm';

import { API } from '../../utils/profile-api'


export default function ProfileSecurityEdit(){
    const [passErrorText, setPassErrorText] = useState<string>("");
    const [emailErrorText, setEmailErrorText] = useState<string>("");
    const [phoneErrorText, setPhoneErrorText] = useState<string>("");


    function resetErrorText(){
        setPassErrorText("");
    }

    const [user, setUser] = useState<User>();

    useEffect(()=>{
        fetchProfile()
        .then((userData) => {
            if(userData && "user" in userData){
                setUser(userData.user as User);
            }
        });
    }, [])

    const changePassword = async (new_password: string, current_password: string) => {
        const data = await changeRequest(
            resetErrorText,
            `${API}/profile/change-password`,
            "PATCH",
            {
                "Content-Type": "application/json"
            },
            JSON.stringify({
                current_password: current_password,
                new_password: new_password
            }),
            setPassErrorText
        );

        if(data && "user" in data){
            setUser(data.user);
        }
    }

    const changeEmail = async (new_email: string, password: string) => {
        const data = await changeRequest(
            resetErrorText,
            `${API}/profile/change-email`,
            "PATCH",
            {
                "Content-Type": "application/json"
            },
            JSON.stringify({
                new_email: new_email,
                password: password
            }),
            setEmailErrorText
        )

        if(data && "user" in data){
            setUser(data.user);
        }
    }
    
    const changePhone = async(new_phone: string, password: string) => {
        const data = await changeRequest(
            resetErrorText,
            `${API}/profile/change-phone`,
            "PATCH",
            {
                "Content-Type": "application/json"
            },
            JSON.stringify({
                new_phone: new_phone,
                password: password
            }),
            setPhoneErrorText
        )

        if(data && "user" in data){
            setUser(data.user);
        }
    }

    if(!user)
        return (<h1>Loading...</h1>)


    return(
            <>
                <PersonalForm pageName="Security information">
                    {
                        user ? (
                            <>
                                <SecurityChangeFormBox
                                    currentValue={user["user_name"]}
                                    errorText={passErrorText}
                                    onSubmit={changePassword}
                                    title="Password"
                                />
                                <SecurityChangeFormBox
                                    currentValue={user["email"]}
                                    errorText={emailErrorText}
                                    onSubmit={changeEmail}
                                    title="Email"
                                />
                                <SecurityChangeFormBox
                                    currentValue={user["phone"]}
                                    errorText={phoneErrorText}
                                    onSubmit={changePhone}
                                    title="Phone Number"
                                />
                            </>
                        ) : (
                            <div className="errorForm" style={{fontSize: "3rem", margin: "4rem"}}>Loading...</div>
                        )
                    }
                </PersonalForm>
            </>
        )
    };
    
    ProfileSecurityEdit.getLayout = function getLayout(page: React.ReactNode){
        return <ProfileLayout>{page}</ProfileLayout>
    }