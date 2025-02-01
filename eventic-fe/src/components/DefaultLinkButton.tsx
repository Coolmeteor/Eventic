import React from "react";

type Props = {
    textColor?: string;
    fontSize?: string;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
};

/**
 * Defaults:
 * text colour = white
 * background colour = --color-primary-green
 * font size = --font-size-body-L
 * padding = --padding-btn-default
 *
 * @param {*} param0
 * @returns
 */
export default function DefaultLinkButton({
    textColor = "#0091eb",
    fontSize = "var(--font-size-body-L)",
    className = "",
    onClick,
    children,
}: Props) {

    return (
        <>
            <button className={`defaultStyle ${className}`} onClick={onClick}>
                {children}
            </button>

            <style jsx>
                {`
                .defaultStyle {
                    font-size: ${fontSize};
                    color: ${textColor};
                    font-family: var(--font-calps);
                }
                `}
            </style>
        </>
    );
}
