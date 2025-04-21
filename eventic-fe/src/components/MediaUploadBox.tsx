import { useState, useEffect } from "react";
import Gallery from "./Gallery";
import GalleryImage from "./GalleryImage";

type ImageDropBoxProps = {
    images: string[];
    setImages: (files: string[]) => void;
}

/**
 * Drag and drop and file picker upload box for media
 * @param param0 
 * @returns 
 */
export default function MediaUploadBox({ images, setImages }: ImageDropBoxProps) {

    const [dragging, setDragging] = useState(false);

    /**
     * For drag and drop
     */
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragging(false);
        const files = Array.from(event.dataTransfer.files).filter(file =>
            file.type.startsWith("image/")
        );


        if (files.length > 0) {
            const imageUrls = files.map(file => URL.createObjectURL(file));
            let newImages = images.slice(0)
            newImages.push(...imageUrls)
            setImages(newImages);
        }
    };

    /**
     * For file picker upload
     */
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []).filter(file =>
            file.type.startsWith("image/")
        );

        if (files.length > 0) {
            const imageUrls = files.map(file => URL.createObjectURL(file));
            let newImages = images.slice(0)
            newImages.push(...imageUrls)
            setImages(newImages);
        }

        event.target.value = ""; // i want to say many curse words about this.
    };

    useEffect(() => {
        if (images == undefined || !images){
            setImages([]);
        }
    }, [])

    return (
        <>
            <div
                className={`dropbox-container ${dragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
                    }`}
                onDragOver={e => {
                    e.preventDefault();
                    setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="fileInput"
                    onChange={handleFileSelect}
                />


                <label htmlFor="fileInput" className="tooltip">
                    Drag & Drop images here or <span className="text-blue-500">click here</span>
                </label>

                {/* preview area */}
                <Gallery >
                    {images?.map((image, index) => (
                        <GalleryImage
                            src={image}
                            alt="Uploaded image"
                            key={index}
                            removable={true}
                            onRemove={() => {
                                let newImages = [...images];
                                newImages.splice(index, 1);
                                setImages(newImages);
                            }}

                        />
                    ))}
                </Gallery>

            </div>

            <style jsx>{`
        .dropbox-container {    
            display: flex;
            flex-direction: column;
            justify-content: center;
        
            border: 2px dashed;
            border-radius: 8px;
            padding: 1rem;
            cursor: pointer;
            transition: all 0.3s;
        }

        .dropbox-container:hover {
            border-color: #3182ce;
        }

        .tooltip {
          
            align-self: center;
            display: block;
            color: text-gray-600;
            margin: 1em 2em;
    
            font-size: 1.2rem;
            }
        `}
        </style>
        </>
    );
}