import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Elevate Your Professional Image with These Essential Grooming Tips",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/Etiquettechildren.jpg",
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/technology.jpg",
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/design.jpg",
  },
  {
    title: "The Power of Communication",
    description: "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/communication.jpg",
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/knowledge.jpg",
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/creation.jpg",
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    imgSrc: "/assets/adventure.jpg",
  },
];

export function BentoGridDemo() {
  return (
    <div className="flex flex-col md:flex-row max-w-6xl my-8 mx-auto gap-6">
      {/* Sidebar for Desktop View */}
      <aside className="hidden md:block md:w-1/3 lg:w-1/4">
        <div className="bg-white dark:bg-neutral-800 shadow-md rounded-lg p-4">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full p-2 mb-4 rounded-lg border border-neutral-300 dark:border-neutral-700 focus:ring focus:ring-indigo-500"
          />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Filter by Category</h3>
            <select
              className="w-full p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 focus:ring focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              <option value="innovation">Innovation</option>
              <option value="technology">Technology</option>
              <option value="design">Design</option>
              <option value="communication">Communication</option>
              <option value="knowledge">Knowledge</option>
              <option value="creation">Creation</option>
              <option value="adventure">Adventure</option>
            </select>
          </div>
        </div>
        {/* Top Blogs Section */}
        <div className="mt-8 bg-white dark:bg-neutral-800 shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold">Top Blogs</h3>
          <ul className="list-disc pl-4 space-y-2">
            <li>Top Blog 1</li>
            <li>Top Blog 2</li>
            <li>Top Blog 3</li>
          </ul>
        </div>
      </aside>

      {/* Main Blog Grid */}
      <main className="w-full md:w-2/3 lg:w-3/4">
        {/* Search and Category Dropdown for Mobile View */}
        <div className="md:hidden mb-4">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full p-2 mb-2 rounded-lg border border-neutral-300 dark:border-neutral-700 focus:ring focus:ring-indigo-500"
          />
          <select
            className="w-full p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 focus:ring focus:ring-indigo-500"
          >
            <option value="">Select Category</option>
            <option value="innovation">Innovation</option>
            <option value="technology">Technology</option>
            <option value="design">Design</option>
            <option value="communication">Communication</option>
            <option value="knowledge">Knowledge</option>
            <option value="creation">Creation</option>
            <option value="adventure">Adventure</option>
          </select>
        </div>
        <BentoGrid>
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              imgSrc={item.imgSrc}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? " md:col-span-2" : "mx-3 md:mx-0 md:my-0 my-2"}
            />
          ))}
        </BentoGrid>
      </main>
    </div>
  );
}