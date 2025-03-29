import React from "react";

type Props = {
	bgColor?: [string, string, string];
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
 * background colour = ["var(--color-btn-primary)", "var(--color-btn-hover)", "var(--color-btn-click)"]
 * font size = --font-size-body-L
 * padding = --padding-btn-default
 *
 * Background colour is in the format of [normal, hover, click], and you can manually specify
 * colours in this format
 * 
 * @param {*} param0
 * @returns
 */
export default function DefaultButton({
	bgColor = ["var(--color-btn-primary)", "var(--color-btn-hover)", "var(--color-btn-click)"],
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
					background-color: ${bgColor[0]};
					font-size: ${fontSize};
					padding: ${padding};
					color: ${textColor};
					font-family: var(--font-calps);
					border-radius: 0.5em;
				}
				.defaultStyle:hover {
					background-color: ${bgColor[1]};
				}
				.defaultStyle:active {
					background-color:  ${bgColor[2]};
				}

				.sharp-edge {
					border-radius: 0;
				}

				.home-browse-button {
					color: var(--color-primary);
					background-color: var(--color-onPrimary);
					font-size: 3em;
				}
				`}
			</style>
		</>
	);
}
