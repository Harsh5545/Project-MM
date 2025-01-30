import { BentoGridDemo } from "@/components/Blog-Component/BentoGridDemo";
import BlogHero from "@/components/Blog-Component/BlogHero";
import BlogPage from "@/components/Blog-Component/BlogPage";

export const metadata = {
  title: "Blog",
  description: "Elevate your social grace with our specialized etiquette courses. From dining decorum to professional protocol, our classes provide practical insights and hands-on learning experiences to ensure you navigate any social setting with finesse.",
  keywords: ['social', 'grace', 'professional', 'dining', 'classes', 'learning'],
  alternates: {
    canonical: "https://modernmannerism.com/blogs"
  }
};

const page = async () => {

  return (
    <div >
      <BlogHero/>
      <BentoGridDemo />
    </div>
  );
};

export default page;
