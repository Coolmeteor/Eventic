import { MiniCard } from "./MiniCard";


const imgs = [
    "file.svg",
    "globe.svg",
    "next.svg",
    "vercel.svg",
    "window.svg",
    "file.svg",
    "globe.svg",
    "next.svg",
    "vercel.svg",
    "window.svg",
]

export function HorizontalScroll() {
    return (
        <>
            <div className="scroll-list-container">
                <ul className="scroll-list">

                    {imgs?.map((image, index) => (
                        <li key={index} className="smallCardli">
                            <MiniCard icon={image} text={`Genre ${index}`} />
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