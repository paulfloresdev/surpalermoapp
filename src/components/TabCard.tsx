import { Card } from "@heroui/react";
import React from "react";

export interface TabCardProps {
    children: React.ReactNode;
}

const TabCard: React.FC<TabCardProps> = ({ children }) => {
    return (
        <Card className="w-full grid grid-cols-3 gap-8 p-10">
            {children}
        </Card>
    );
}

export default TabCard;