import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn("grid grid-rows-3 grid-flow-row gap-2 py-0 ", className)} // Set grid to have 3 rows
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group  p-2 h-full w-full sm:w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-100 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-2 overflow-hidden bg-[#eabf91] bg-opacity-45 border border-transparent dark:border-white/[0.2] relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children
}) => {
  return (
    <h4 className={cn("text-black-100 font-bold tracking-wide mt-0", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children
}) => {
  return (
    <p
      className={cn("mt-2 text-black-400 tracking-normal leading-relaxed text-sm", className)}
    >
      {children}
    </p>
  );
};
