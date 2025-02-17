
type Props = {
    initialValue: string,
    onChange: (e: any) => void
    onEnterPress?: (e: any) => void

}
export default function InputMultiLine({ initialValue, onChange, onEnterPress }: Props) {

    return (
        <>
            <textarea className="defaultStyle"
                onChange={onChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && onEnterPress) {
                        e.preventDefault();
                        onEnterPress(e)
                    }
                }}
            >
                {initialValue}
            </textarea>


            <style jsx>
                {`
                .defaultStyle {
                    padding-left: 1em;
                    padding-right: 2em;
                    font-size: var(--font-size-body-L);

                    border: 3px solid #d1d5db;
                    border-radius: 8px;
                    padding: 8px; 
                    outline: none; 
                    transition: box-shadow 0.2s ease-in-out;
                }

                .defaultStyle:focus {
                    border-color: #3b82f6; 
                    box-shadow: 0 0 4px #3b82f6; 
                }
                `}
            </style>
        </>
    )
}