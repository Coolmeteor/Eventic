import { MicroCard, MiniCard } from "./MiniCard";
import { TextWithIcon } from "@/constants";

export function HorizontalScroll({ textWithIcons }: { textWithIcons: TextWithIcon[] }) {
    return (
        <>
            <div className="scroll-list-container">
                <ul className="scroll-list">
                    {textWithIcons?.map((item, index) => (
                        <li key={index} className="smallCardli">
                            <MiniCard icon={item.icon} text={item.text} />
                        </li>
                    ))}

                </ul>

            </div>

            <style jsx>{`

            .scroll-list-container {
                display: flex;
                justify-content: center;
                margin-top: 2rem;
            }



            .scroll-list {
                display: flex;
                overflow-x: auto;
            }

            .scroll-list li {
                margin-right: 5px;
                display: inline-block;
            }

        `}</style>


        </>
    );
}





export function MiniHorizontalScroll({ textWithIcons, tags }: { textWithIcons?: TextWithIcon[], tags?: string[] }) {
    return (
        <>
            <div className="scroll-list-container">
                <ul className="scroll-list">
                    {/* icon cards */}
                    {textWithIcons?.map((item, index) => (
                        <li key={index} className="smallCardli">
                            <MicroCard icon={item.icon} text={item.text} />
                        </li>
                    ))}

                    {/*  tags */}

                    {tags?.map((item, index) => (
                        <li key={index} className="smallCardli">
                            <MicroCard text={item} />
                        </li>
                    ))
                    }

                </ul>
            </div>

            <style jsx>{`

            .scroll-list-container {
                display: flex;
                justify-content: left;
                margin-top: 1rem;
            }



            .scroll-list {
                display: flex;
                overflow-x: auto;
            }

            .scroll-list li {
                display: inline-block;
            }

        `}</style>


        </>
    );
}