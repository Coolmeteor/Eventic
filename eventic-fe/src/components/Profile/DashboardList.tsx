import DefaultLinkButton from "../DefaultLinkButton"
import css from 'styled-jsx'

type Props = {
    list: {text: string, url: string, onClick?: () => void}[]
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function DashboardList({
    list
}: Props){
    return(
        <>
            <div className="links">
                {list.map((item) => (
                    <p><DefaultLinkButton onClick={item.onClick} className="textLink">{item.text}</DefaultLinkButton></p>
                ))}
            </div>

            <style jsx>{`
                .links{
                    margin: 10px 10px 20px 30px;
                    }
            `}</style>
        </>
    )
}