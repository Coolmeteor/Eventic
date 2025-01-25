import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faP, faPaperclip, IconDefinition } from '@fortawesome/free-solid-svg-icons'

type Props = {
	theme?: string,
	title: string,
	children: React.ReactNode,
	icons?: IconDefinition
}

export default function BuisnessCard({theme = "black", title, children, icons = faPaperclip}: Props) {
	let fontColor;

	// handle theme, variants from props
	if (theme == "white" || theme == "#FFFFFF") {
		theme = "#FFFFFF";
		fontColor = "#000000";
	}
	else { // default to black
		theme = "#2D2D2D";
		fontColor = "#FFFFFF";
	}

	return (
		<>
			<div className="businessCard">
				<span>
					<h3>{title}</h3>
					{children}
				</span>
				<div className='icon'>
					<FontAwesomeIcon icon={icons} />
				</div>
			</div>


			<style jsx>
				{`
				.icon {
					{/* width: 60px;
					height: 40px; */}

					align-self: start;
					position: relative;

					margin: 20px 20px 0px 0px;
					font-size: 30px;
				}

				.businessCard {
					background-color: ${theme};
					color: ${fontColor};

					max-width: 400px;
					min-width: 200px;
					min-height: 210px;

					border-radius: 5px;
					box-shadow: var(--shadow-large);

					display: flex;
					align-items: center;
					justify-content: start;
					padding: 0px 0px 40px 30px; 
					border-radius: 15px;
		
					font-size: var(--font-size-body-S);
					font-family: var(--font-roboto);
				}

				h3 {
					font-size: var(--font-size-header-XS);
					margin-bottom: 15px;
					align-self: start;
					max-width: 130px; /* maybe needed to control title length but it overlaps so idk*/
					margin-right: 20px;
				}

				p {
					width: 100%;
				}


				span {
					display: flex;
					margin-top: 40px;
					width: 100%;
				}
				`}
			</style>
		</>
	)
}
