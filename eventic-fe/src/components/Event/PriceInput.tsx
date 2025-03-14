import { EventData } from "@/constants";
import DefaultInputForm from "../DefaultInputForm";
import { formatPrice } from "@/utils/format";
import { useState } from "react";

const fontSize = "1.5rem"
const defaultFormStyle: React.CSSProperties = {
    fontSize: fontSize,
    margin: "0 0.5rem 0 1rem",
    textAlign: "right",
    width: "200px",
    border: "1px solid gray"
};

type Props = {
    className?: string;
    formStyle?: React.CSSProperties;
    data: number | undefined;
    setData: (data: Number) => void;
}
export function PriceInput({
    formStyle = defaultFormStyle,
    data,
    setData,
}: Props) {
    const [currentValue, setCurrentValue] = useState<string>(data ? data.toString() : "" );

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

                        setData(Number(newPrice));
                    }}
                />
                <p className="dollar">$</p>
            </div>

            <style jsx>{`
            .input-container {
                display: flex;
                align-items: center;
                font-size: ${formStyle.fontSize || fontSize};
            }
            .dollar {
                font-size:${formStyle.fontSize || fontSize};
            }
            `}</style>
        </>
    )
}