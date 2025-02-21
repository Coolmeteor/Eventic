import { useState, useEffect, useRef } from 'react';
import { fetchProfile, changeRequest, User } from '../../utils/profile-api';


import ProfileLayout from '@/components/Layouts/ProfileLayout';
import PersonalForm from '@/components/Profile/PersonalForm';
import ChangeFormBox from '@/components/Profile/EditComponents/ChangeFormBox';
import ChangeAvatorBox from '@/components/Profile/EditComponents/ChangeAvatorBox';
import { API } from '../../utils/profile-api'



export default function ProfileEdit(){
    const [nameErrorText, setNameErrorText] = useState<string>("");


    function resetErrorText(){
        setNameErrorText("");
    }

    const [user, setUser] = useState<User>();
    const [profileData, setProfileData] = useState(null);

    useEffect(()=>{
        fetchProfile()
        .then((user) => {
            if(user && "user" in user){
                setUser(user.user);
            }
        });
    }, [])

    const changeUsername = async (new_username: string) =>{
        const data = await changeRequest(
            resetErrorText,
            `${API}/profile/change-username`,
            "PATCH",
            {
                "Content-Type": "application/json"
            },
            JSON.stringify({user_name: new_username}),
            setNameErrorText
        );

        if(data && "user" in data){
            setUser(data.user);
        }
    }

    

    const [avatorUrl, setAvatorUrl] = useState<string | null>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>("");

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.files && event.target.files.length > 0){
            const file = event.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }


    // For avator

    async function changeAvator(){
        if(!selectedFile){
            setUploadStatus("Please select an image.");
            return;
        }
        const formData = new FormData();
        formData.append("avator", selectedFile);
        
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch(`${API}/profile/change-avator`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if(response.ok){
                setUploadStatus("Upload successful!");
            } else {
                setUploadStatus(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Upload error:", error);
            setUploadStatus("Upload failed.");
        }
    }

    return(
        <>
            <PersonalForm pageName="Personal information">
                {
                    user ? (
                        <>
                            <ChangeFormBox
                                currentValue={user.user_name}
                                errorText={nameErrorText}
                                onSubmit={changeUsername}
                                title="Username"
                            />
                            <ChangeAvatorBox
                                title="Avator"
                                currentUrl={avatorUrl}
                                previewUrl={previewUrl}
                                uploadStatus={uploadStatus}
                                onChange={handleFileChange}
                                onClick={changeAvator}
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

ProfileEdit.getLayout = function getLayout(page: React.ReactNode){
    return <ProfileLayout>{page}</ProfileLayout>
}