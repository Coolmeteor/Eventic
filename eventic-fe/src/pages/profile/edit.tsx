import { useState, useEffect } from 'react';
import { fetchProfile, changeRequest, User, Gender, isValidGender } from '@/utils/profile-api';
import { convertResponse } from '@/utils/auth-api';


import ProfileLayout from '@/components/Layouts/ProfileLayout';
import RightContainer from '@/components/Profile/RightContainer';
import ChangeFormBox from '@/components/Profile/EditComponents/ChangeFormBox';
import ChangeAvatorBox from '@/components/Profile/EditComponents/ChangeAvatorBox';
import { API } from '@/constants'
import SexChangeFormBox from '@/components/Profile/EditComponents/SexChangeForm';
import DoBChangeFormBox from '@/components/Profile/EditComponents/DoBChangeForm';



export default function ProfileEdit(){
    const [nameErrorText, setNameErrorText] = useState<string>("");
    const [sexErrorText, setSexErrorText] = useState("");
    const [dobErrorText, setDobErrorText] = useState("");


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

    const changeSex = async (new_sex: string) => {
        if (!isValidGender(new_sex)){
            setSexErrorText("The input gender is not selected");
            console.log("The input gender is invalid by error");
        }
        console.log("New sex:", new_sex);

        
        const data = await changeRequest(
            resetErrorText,
            `${API}/profile/change-sex`,
            "PATCH",
            {
                "Content-Type": "application/json"
            },
            JSON.stringify({sex: new_sex}),
            setSexErrorText
        );

        if(data && "user" in data){
            setUser(data.user);
        }
    }

    const changeDob = async (new_dob: string) => {
        console.log("New dob:", new_dob);

        const data = await changeRequest(
            resetErrorText,
            `${API}/profile/change-dob`,
            "PATCH",
            {
                "Content-Type": "application/json"
            },
            JSON.stringify({date_of_birth: new_dob}),
            setDobErrorText
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

            const data = await convertResponse(response);
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

    if(!user)
        return <div className="errorForm" style={{fontSize: "3rem", margin: "4rem"}}>Loading...</div>;
    
    
    return(
        <>
            <RightContainer pageName="Personal information">
                {
                    <>
                        <ChangeFormBox
                            currentValue={user.user_name}
                            errorText={nameErrorText}
                            onSubmit={changeUsername}
                            title="Username"
                        />
                        <SexChangeFormBox
                            currentValue={user.sex as Gender}
                            errorText={sexErrorText}
                            onSubmit={changeSex}
                            title="Gender"
                        />
                        <DoBChangeFormBox
                            currentValue={user.date_of_birth}
                            errorText={dobErrorText}
                            onSubmit={changeDob}
                            title="Birth Data"
                        />

                        
                        {/* <ChangeAvatorBox
                            title="Avator"
                            currentUrl={avatorUrl}
                            previewUrl={previewUrl}
                            uploadStatus={uploadStatus}
                            onChange={handleFileChange}
                            onClick={changeAvator}
                        /> */}
                    </>
                }
            </RightContainer>
        </>
    )
};

ProfileEdit.getLayout = function getLayout(page: React.ReactNode){
    return <ProfileLayout>{page}</ProfileLayout>
}