import { Skeleton } from "@heroui/react";

export interface CustomSkeletonProps {
    className?: string;
    variant?: "text" | "input" | "textarea";
    size?: "sm" | "md" | "lg";
    upLabel?: boolean;
}

export const TYPES = {
    'text-sm': 'h-4',
    'text-md': 'h-5',
    'text-lg': 'h-6',
    'input-sm': 'h-8',
    'input-md': 'h-10',
    'input-lg': 'h-12',
    'textarea-sm': 'h-[80px]',
    'textarea-md': 'h-[80px]',
    'textarea-lg': 'h-[90px]',
}

const CustomSkeleton: React.FC<CustomSkeletonProps> = ({ className, variant = "input", size = "md", upLabel = true }) => {
    let baseClasses = "w-full rounded-xl";

    let t = `${variant}-${size}`;
    let typeClass = TYPES[t as keyof typeof TYPES];

    if (upLabel && (variant === "input" || variant === "textarea")) {
        var h = size === "sm" ? "h-[12px]" : size === "md" ? "h-[13px]" : "h-[16px]";
        var gap = size === "sm" ? "gap-[9px]" : size === "md" ? "gap-[10px]" : "gap-[10px]";

        return <div className={`w-full flex flex-col ${gap}`}>
            <Skeleton className={`w-1/4 rounded-xl ${h}`} />
            <Skeleton className={`${baseClasses} ${typeClass} ${className ? className : ""}`} />
        </div>;
    }

    return <Skeleton className={`${baseClasses} ${typeClass} ${className ? className : ""}`} />;
}

export default CustomSkeleton;