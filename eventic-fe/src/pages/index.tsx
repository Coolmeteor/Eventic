import React from "react";

import Section from "@/components/Section";
import Gallery from "@/components/Gallery";
import GalleryImage from "@/components/GalleryImage";
import DefaultButton from "@/components/DefaultButton";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Homepage() {
	const [testData, setTestData] = useState<string[]>([]); // state
	const [images, setImages] = useState<string[]>([]); // images

	useEffect(() => {
		async function fetchServerData() {
			// here you put stuff like to await code to fetch data from server
			setTestData(["one", "two", "three"]);
			setImages([
				"file.svg",
				"globe.svg",
				"next.svg",
				"vercel.svg",
				"window.svg",
			])
		}

		fetchServerData();
	}, []);

	return (
		<>
			<Section>
				<div className="event-card-frame">
					<h1 className="test-title">Test data</h1>
					{testData?.map((item, index) => (
						<li key={index} className="smallCardli">
							<p>{item}</p>
						</li>
					))}


				

					<DefaultButton
						className="sampleButton"
						onClick={() => console.log("BUTTON CLICK")}
					>
						TEST
					</DefaultButton>



					<h2 className="title">Gallery</h2>
					<Gallery>
						{images?.map((image, index) => (
							<GalleryImage
								src={image}
								alt="alt text here"
								key={index}
							/>
						))}
					</Gallery>



					<Link href={"/test"}>
						<div className="link">
							Click go to page
						</div>
					</Link>

				</div>
			</Section>


			{/*  you can technically add css here, and override page directly, but prefered to use the .css files */}
			<style jsx>
				{`
				h2 {
					color: var(--color-font-primary);
					font-family: var(--font-calps);
					font-size: var(--font-size-header-S);
					font-style: normal;
					font-weight: 700;
					line-height: normal;
				}

				.link {
					padding: 40px;
					}
				`}
			</style>
		</>
	);
}

