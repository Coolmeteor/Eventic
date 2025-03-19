import React from "react";

type Props = {
	bgColor?: string;
	textColor?: string;
	fontSize?: string;
	padding?: string;
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
export default function DefaultButton({
	bgColor = "var(--color-primary-green)",
	textColor = "#FFFFFF",
	fontSize = "var(--font-size-body-L)",
	padding = "var(--padding-btn-default)",
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
					background-color: ${bgColor};
					font-size: ${fontSize};
					padding: ${padding};
					color: ${textColor};
					font-family: var(--font-calps);
				}

				.home-browse-button {
					color: var(--color-primary);
					background-color: var(--color-onPrimary);
					font-size: 3em;
					border-radius: 0.5em;
				}
				`}
			</style>
		</>
	);
}
