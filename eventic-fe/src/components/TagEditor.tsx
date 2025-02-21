import Gallery from "./Gallery";
import InputMultiLine from "./InputMultiLine";

type ImageDropBoxProps = {
    tags: string[];
    setTags: (files: string[]) => void;
}

/**
 * Tag editor
 */
export default function TagEditor({ tags, setTags }: ImageDropBoxProps) {
    return (
        <>
            <div className={`dropbox-container border-gray-300`}>

                <p className="tooltip">Enter tags here. Seperate them with a comma</p>
                <InputMultiLine
                    initialValue=""
                    onChange={(e) => { }}
                    onEnterPress={(e) => {
                        if (e.target.value === "") {
                            return
                        }

                        let newTags = tags.slice(0)
                        newTags.push(...e.target.value.split(","))
                        e.target.value = ""

                        // remove duplicates
                        let uniqueTags = new Set(newTags)
                        setTags(Array.from(uniqueTags))
                    }}
                />

                {/* preview area */}
                <Gallery >
                    {tags?.map((tag, index) => (
                        <Tag name={tag}
                            onRemove={() => {
                                let newTags = tags.slice(0)
                                newTags.splice(index, 1)
                                setTags(newTags)
                            }} />
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



type TagProps = {
    name: string,
    desc?: string,
    removable?: boolean,
    onRemove?: () => void
}

export function Tag({ name, desc, removable = true, onRemove }: TagProps) {
    return (
        <>
            <div className="tagContainer">
                <p>{name}</p>

                {removable &&
                    <div className='removeButton-container'>
                        <button className="removeButton" onClick={onRemove}>X</button>
                    </div>
                }

            </div>

            <style jsx>{`
                .tagContainer {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                   
                    border: 2px solid white;
                    box-shadow: var(--shadow-large);
                    padding: 0.2em 0.2em;
                    margin: 0.5em;
                    margin-bottom: 0em;
                }

                .removeButton {
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
                    display: flex;
                    justify-content: flex-end;
                    margin-left: 0.5em;
                }

                `}</style>
        </>

    )
}