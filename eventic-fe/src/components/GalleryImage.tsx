import Image from 'next/image'
import React from 'react'

type Props = {
	src: string,
	alt?: string
}

export default function GalleryImage({ src, alt }: Props) {
	return (
		<div className="galleryImageContainer">
			<Image src={src} alt={alt != null ? alt : "" } width={368} height={368} style={{ height: "100%", objectFit: "cover" }} />
		</div>

	)
}
