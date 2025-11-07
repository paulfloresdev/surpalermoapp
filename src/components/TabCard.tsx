import { Card } from "@heroui/react";
import React from "react";

export interface TabCardProps {
    children: React.ReactNode;
}

const TabCard: React.FC<TabCardProps> = ({ children }) => {
    return (
        <Card className="w-full grid grid-cols-3 gap-x-10 gap-y-10 p-10">
            {children}
        </Card>
    );
}

export default TabCard;