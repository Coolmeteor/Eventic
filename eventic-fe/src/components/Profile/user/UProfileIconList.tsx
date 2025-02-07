import DefaultIconButton from "@/components/DefaultIconButton";

import { faP, faPaperclip, IconDefinition } from '@fortawesome/free-solid-svg-icons'
export default function UProfileIconList(){

    const menuList = [
        {label: "Ordered Tickets", url: "url1", icon: faPaperclip},
        {label: "Upcoming Events", url: "url2", icon: faPaperclip},
        {label: "Payment Method", url: "url1", icon: faPaperclip}
    ]

    return(
        <>
            <div className="iconList">
                {menuList.map((item) => (
                    <DefaultIconButton title={item.label}></DefaultIconButton>
                ))}
                
            </div>

            <style jsx>{`
            .iconList{
                display: block;
            }
            `}</style>
        </>
    )
}