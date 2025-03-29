// make the carousell compoentn
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader


export const ImageCarousell = ({ images }: { images: string[] }) => {
    return (
        <>
            <Carousel dynamicHeight={true} showArrows={true} showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true} interval={7000} transitionTime={1000} >
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={`${image}`} alt="image" />
                    </div>
                ))}
            </Carousel>

            <style jsx>{`
                img {
                    width: 100%;
                    max-height: 450px;
                    object-fit: cover;
                    border-radius: 1rem;
                    // border: 3px solid var(--color-background-dark);
                }

            `}</style>
        </>
    )
}

