import { cn } from "@/lib/utils"

// Shimmer base component
export function Shimmer({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700",
        "bg-[length:200%_100%] animate-shimmer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Alternative shimmer component for loading states
export function ShimmerCard({ className }) {
  return (
    <div className={cn("space-y-3", className)}>
      <Shimmer className="h-4 w-3/4 rounded" />
      <Shimmer className="h-4 w-1/2 rounded" />
      <Shimmer className="h-20 w-full rounded" />
    </div>
  )
}

// Shimmer for table rows
export function ShimmerTable({ rows = 5, cols = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          {Array.from({ length: cols }).map((_, j) => (
            <Shimmer key={j} className="h-4 flex-1 rounded" />
          ))}
        </div>
      ))}
    </div>
  )
}