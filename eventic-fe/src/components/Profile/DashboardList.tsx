import DefaultLinkButton from "../DefaultLinkButton"

type Props = {
    list: {text: string, onClick: () => void}[]
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
                    <p>
                        <DefaultLinkButton onClick={item.onClick} textColor={"var(--color-font-primary)"} font-size={"var(--font-size-body-M)"} className="textLink">
                            &bull; {item.text}
                        </DefaultLinkButton>
                    </p>
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