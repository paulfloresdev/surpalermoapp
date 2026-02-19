import React from "react";

export interface AFormProgramsProps {
    programas: string[];
}

const AFormPrograms: React.FC<AFormProgramsProps> = ({ programas }) => {

    if (programas.length === 0) {
        return (
            <div className="flex flex-row items-center gap-2 pl-2">
                <span className="text-sm font-medium">Programas:</span>
                <span>No</span>
            </div>
        );
    }

    if (programas.length < 5) {
        return (
            <div className="flex flex-row items-center gap-2 pl-2">
                <span className="text-sm font-medium">Programas:</span>
                {
                    programas.map((programa, index) => (
                        <span key={index}>{programa}{index < programas.length - 1 ? ', ' : ''}</span>
                    ))
                }
            </div>
        );
    }

    return (
        <div className="flex flex-row items-center gap-2 pl-2">
            <span className="text-sm font-medium">Programas:</span>
            <span>{programas[0]}, {programas[1]}, {programas[2]}, {programas[3]}, (+{programas.length - 4})</span>
        </div>
    );
}

export default AFormPrograms;