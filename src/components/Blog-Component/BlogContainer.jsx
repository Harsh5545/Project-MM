import Image from 'next/image';
import clsx from 'clsx';
import {  Montserrat, Cormorant_Garamond } from "next/font/google";
import ShadcnButton from '../Atom/button/ShadcnButton';// Import ShadCN button
const montserrat = Montserrat({ subsets: ['latin'] });
const cormorant = Cormorant_Garamond({ weight: '500', subsets: ['latin'] }); // Specify weight here

const BlogContainer = ({ title, description, imageSrc, reverse, categories = false, commentCount = 0 }) => (
  <div className='flex flex-col justify-center items-center w-full'>
    <div className={clsx(
      "flex flex-col-reverse md:flex-row border-2 items-start py-0 md:py-10 w-full px-0 pb-8 mx-4 md:px-10 gap-8 md:max-w-5xl border-b",
      reverse && "md:flex-row-reverse",
      "border-gray-300 dark:border-gray-800",
      "bg-white dark:bg-white dark:bg-opacity-5 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
    )}>
      <div className='w-full md:hidden flex justify-center'>
        <ShadcnButton className="flex pointer md:hidden items-center justify-center tracking-wider bg-gradient-to-r from-[#c3965d] via-[#eabf91] to-[#c3965d] font-extrabold text-white font-bold p-3 px-6 rounded-xl transition-colors duration-300 ease-in-out">
          Read more
        </ShadcnButton>
      </div>

      {/* Title and Description Section */}
      <div className="md:w-1/2 flex items-center justify-center z-10">
        <div className="w-full space-y-4">
          <h2 className={`${montserrat.className} text-4xl hidden md:flex font-semibold mb-4 text-gray-800 dark:text-white uppercase`}>{title}</h2>
          <div
            className={clsx(
              "bg-[#e6d5e3] dark:bg-[rgb(0,0,31)] bg-opacity-90 md:dark:bg-opacity-80 text-center mx-4 p-4 md:p-6 rounded-lg shadow-lg",
              "relative md:mr-10 md:max-w-[90%]",
              reverse ? "md:-left-20" : "md:-right-28"
            )}
          >
            {categories && <h3 className='md:text-base text-sm text-center md:text-start font-semibold mb-4 text-[#977059] dark:text-white uppercase'>{categories}</h3>}
            <p className={`${cormorant.className} text-black-600 text-lg md:text-3xl md:text-start dark:text-gray-300`}>{description}</p>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 relative w-full h-[250px] md:h-[300px]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg bg-no-repeat shadow-md"
        />
      </div>
    </div>
  </div>
  
);

export default BlogContainer;