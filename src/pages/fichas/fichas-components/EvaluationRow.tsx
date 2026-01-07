import React from "react";
import { Input } from "@heroui/react";

interface EvaluationRowProps {
    label: string;
    value: number | null;
    onChange: (value: number | null) => void;

    min?: number;
    max?: number;

    disabled?: boolean;
    className?: string;
    required?: boolean;
}

const EvaluationRow: React.FC<EvaluationRowProps> = ({
    label,
    value,
    onChange,
    min = 1,
    max = 4,
    disabled = false,
    className,
    required = false,
}) => {
    const handleChange = (rawValue: string) => {
        // ✅ deja borrar
        if (rawValue === "") {
            onChange(null);
            return;
        }

        const num = Number(rawValue);
        if (Number.isNaN(num)) return;
        if (num < min || num > max) return;

        onChange(num);
    };

    return (
        <div className="w-full flex flex-row gap-4 items-center">
            <span className={`w-11/12 ${className ?? ""}`}>{label}</span>

            <Input
                required={required}
                placeholder={`${min} - ${max}`}
                type="number"
                className="w-1/12"
                value={value === null ? "" : value.toString()}
                min={min}
                max={max}
                disabled={disabled}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};

export default EvaluationRow;
