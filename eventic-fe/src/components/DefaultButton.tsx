import React from "react";

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
}) {

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
				`}
			</style>
		</>
	);
}
