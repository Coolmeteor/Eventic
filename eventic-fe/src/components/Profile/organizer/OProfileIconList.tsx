import DefaultIconButton from "@/components/DefaultIconButton";

import { faP, faPaperclip, IconDefinition } from '@fortawesome/free-solid-svg-icons'

type Props = {
    list: {text: string, url: string}[]
}

export default function OProfileIconList(){

    const managementList = [
        {label: "Manage Events", url: "url1", icon: faPaperclip},
        {label: "Upcoming Events", url: "url2", icon: faPaperclip},
        {label: "Payment Method", url: "url1", icon: faPaperclip},
        {label: "Analytics", url: "url3", icon: faPaperclip}
    ]

    const profileList = [
        {label: "Edit Profile", url: "url1", icon: faPaperclip}
    ]


    return(
        <>
            <div className="iconList">
                <div>
                    <h1 className="listName">Event Management</h1>
                    {managementList.map((item) => (
                        <DefaultIconButton title={item.label}></DefaultIconButton>
                    ))}
                </div>
                <div >
                    <h1 className="listName">Your Account</h1>
                    {profileList.map((item) => (
                        <DefaultIconButton title={item.label}></DefaultIconButton>
                    ))}
                </div>
                
            </div>

            <style jsx>{`
            .iconLists{
                display: block;
                margin-bottom: 20px;
            }
            
            .listName{
                display:block;
                text-align: left;
                margin-top: 5%;
                margin-left: 10%;
                font-size: 2rem;
            }
            `}</style>
        </>
    )
}