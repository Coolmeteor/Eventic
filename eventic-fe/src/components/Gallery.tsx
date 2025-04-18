import React from 'react'

export default function Gallery({children}:{children: React.ReactNode}) {

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
					gap: 4px;
					width: 100%;
				}
			`}</style>
		</>
	)
}
