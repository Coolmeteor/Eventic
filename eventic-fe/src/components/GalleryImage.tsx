import { base64ToBlob } from '@/utils/helpers'
import Image from 'next/image'
import React from 'react'

type Props = {
	src: string,
	alt?: string,
	removable?: boolean,
	onRemove?: () => void
}

export default function GalleryImage({ src, alt, removable, onRemove }: Props) {
	return (
		<>
			<div className="galleryImageContainer">
				<Image src={src} alt={alt != null ? alt : ""} width={368} height={368} style={{ height: "100%", objectFit: "cover" }} draggable={false} />

				{removable &&
					<div className='removeButton-container'>
						<button className="removeButton" onClick={onRemove}>X</button>
					</div>
				}

			</div>

			<style jsx>{`
				.removeButton {
					// position: absolute;
					background-color: rgb(255, 0, 0);
					color: white;
					width: 25px;
					height: 25px;
				}
				.removeButton:hover {
					background-color: rgb(200, 0, 0);
					scale: 1.1;
				}

				.removeButton:active {
					background-color: rgb(150, 0, 0);
				}

				.removeButton-container {
					position: absolute;
					width: 95px;
					display: flex;
					justify-content: flex-end;
				}

				`}</style>
		</>

	)
}
