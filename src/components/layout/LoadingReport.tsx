import { Progress } from "@heroui/react";
import React from "react";

const LoadingReport: React.FC = () => {
    return (
        <div className="w-full h-96 flex flex-col items-center justify-center gap-4">
            <span>Descargando reporte...</span>
            <Progress isIndeterminate aria-label="Loading..." className="max-w-md" classNames={{ indicator: "bg-emerald-500" }} size="md" />
        </div>
    );
}

export default LoadingReport;