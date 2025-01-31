import React from 'react'


type Props = {
	fullWidth?: boolean,
	usePadding?: boolean,
	marginTop?: string,
	marginBottom?: string,
	children: React.ReactNode
}

/**
 * Section
 * 
 * A flex container to contain page content. Uses a max width
 * and padding only when the container shrinks below the max width.
 * Can optionally just be the full page width. Can also be given vertical
 * margins to space it from other sections.
 * 
 * You will want to put your own container inside of this section and the 
 * content inside of that container. Then you can customize the layout.
 * 
 * @param {Object} props
 * @param {Boolean} props.fullWidth - Whether or not the section should be full width of the page
 * @param {Boolean} props.usePadding - Whether or not the section should use padding
 * @param {String} props.marginTop - The top margin of the section
 * @param {String} props.marginBottom - The bottom margin of the section
 * @param {React.ReactNode} props.children - The jsx content of the section
 */
export default function Section({ fullWidth = false, usePadding = true, marginTop = "0px", marginBottom = "0px", children }: Props) {
	return (
		<>
			<section className="outer-container">
				<div className="inner-container">
					{children}
				</div>
			</section>

			<style jsx>
				{`
				.outer-container {
				
					display: flex;
					justify-content: center;
					padding: 0px ${usePadding ? 'var(--section-padding)' : '0px'};
					margin-top: ${marginTop};
					margin-bottom: ${marginBottom};
				}

				.inner-container {
				
					width: 100%;
					max-width: ${fullWidth ? '100%' : 'var(--section-max-width)'};
				}


				@media (max-width: 400px) {
					.outer-container {
						padding: 0px 0px;
					}
				}

				`}
			</style>
		</>
	)
}
