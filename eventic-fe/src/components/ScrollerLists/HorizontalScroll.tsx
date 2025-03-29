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
                margin-bottom: 20px;
                display: inline-block;
            }
            // all this mess is for scroll bar
            .scroll-list::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            .scroll-list::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 3px;
                width: 6px;
            }
            .scroll-list::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 3px;
            }
            .scroll-list::-webkit-scrollbar-thumb:hover {
                background: #555;
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