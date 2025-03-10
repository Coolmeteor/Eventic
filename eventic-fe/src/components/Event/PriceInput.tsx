import { EventData } from "@/constants";
import DefaultInputForm from "../DefaultInputForm";
import { formatPrice } from "@/utils/format";
import { useState } from "react";

type Props = {
    className?: string;
    setEventData: (data: EventData) => void;
    eventData: EventData;
}
export function PriceInput({
    setEventData,
    eventData
}: Props){
    const [currentValue, setCurrentValue] = useState<string>("");
    const fontSize = "1.5rem"

    const formStyle: React.CSSProperties = {
        fontSize: fontSize,
        margin: "0 0.5rem 0 1rem",
        textAlign: "right",
        width: "200px",
        border: "1px solid gray"
    };
    return (
        <>
            <div className="input-container">
                <DefaultInputForm
                    style={formStyle}
                    type="text"
                    placeholder="Enter ticket price"
                    value={currentValue}
                    onChange={(e) => {
                        const newPrice = formatPrice(e.target.value);
                        setCurrentValue(newPrice);
                        
                        setEventData({...eventData,
                            pricing: Number(newPrice)
                        });
                    }}
                />
                $
            </div>

            <style jsx>{`
            .input-container {
                margin: 1rem;
                font-size: ${fontSize};
            }
            `}</style>
        </>
    )
}