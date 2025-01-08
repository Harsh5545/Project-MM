import { cn } from "@/lib/utils"



export function Shimmer({ className, ...props }) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-muted",
                className
            )}
            {...props}
        />
    )
}