import { Progress } from "@heroui/react";
import React from "react";

const LoadingPage: React.FC = () => {
    return (
        <div className="w-full h-96 flex flex-col items-center justify-center gap-4">
            <Progress isIndeterminate aria-label="Loading..." className="max-w-md" size="md" color="success" />
            <span>Cargando...</span>
        </div>
    );
}

export default LoadingPage;