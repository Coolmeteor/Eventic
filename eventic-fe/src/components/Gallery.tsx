import React from 'react'

export default function Gallery({children}) {

	return (
		<>
			<div className="container">
				{children}
			</div>

			<style jsx>{`
				.container {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					gap: 32px;
					width: 100%;
				}
			`}</style>
		</>
	)
}
