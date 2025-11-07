import { TableColumn } from "@heroui/react";
import React from "react";
import DynamicFaIcon from "../DynamicFaIcon";

export interface CustomColumnParams {
    label: string;
    asc: number;
    desc: number;
    currentOrder?: number;
}

const CustomColumn: React.FC<CustomColumnParams> = ({ label, asc, desc, currentOrder }) => {
    return (
        <div className="flex flex-row items-center gap-x-1 text-sm">
            <span>{label}</span>
            <DynamicFaIcon name={currentOrder == asc ? "FaAngleDoubleUp" : currentOrder == desc ? "FaAngleDoubleDown" : "FaSort"} size={16} />
        </div>
    );
}

export default CustomColumn;