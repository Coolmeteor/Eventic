import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';

type Props = {
    children: React.ReactNode;
    scrollAmount?: number;
}


export function HorizontalScrollContainer({
    children,
    scrollAmount=450,
}: Props){
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += direction === "left" ? -scrollAmount: scrollAmount;
        }
    }

    return (
        <div className="scroll-container-wrapper">
            <button className="scroll-btn left" onClick={() => scroll("left")}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {/* Scroll Area */}
            <div 
                className="scroll-list-container"
                ref={scrollRef}
            >
                {children}
            </div>

            <button className="scroll-btn right" onClick={() => scroll("right")}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>

            <style jsx>{`
            .scroll-container-wrapper {
                display: flex;
                align-items: center;
                position: relative;
                width: 100%;
            }

            .scroll-list-container {
                display: flex;
                overflow-x: auto;
                white-space: nowrap;
                scroll-behavior: smooth;
                width: 100%;
                margin: 1rem 2rem;
                padding: 1rem;

                -ms-overflow-style: none;   // Delete scroll bar in edge
                scrollbar-width: none;      // Delete scroll bar in firefox
            }

            .scroll-list-container::-webkit-scrollbar { // Delete scroll bar in chrome, safari
                display: none;
            }

            .scroll-btn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.3);
                border: none;
                color: white;
                font-size: 30px;
                padding: 10px;
                cursor: pointer;
                z-index: 10;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: 0.25s;
            }

            .scroll-btn:hover {
                transition: 0.25s;
                background: rgba(0, 0, 0, 0.75);
            }

            .left {
                left: 20px;
            }

            .right {
                right: 20px;
            }
            `}</style>
        </div>
    )
}