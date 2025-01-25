import Image from 'next/image'
import React from 'react'

export default function GalleryImage({ src, alt }) {
	return (
		<div className="galleryImageContainer">
			<Image src={src} alt={alt} width={368} height={368} style={{ height: "100%", objectFit: "cover" }} />
		</div>

	)
}
