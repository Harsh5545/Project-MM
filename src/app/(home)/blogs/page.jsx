import { BentoGridDemo } from "@/components/Blog-Component/BentoGridDemo";
import BlogHero from "@/components/Blog-Component/BlogHero";
import BlogPage from "@/components/Blog-Component/BlogPage";

export const metadata = {
  title: "Blog",
  description: "Elevate your social grace with our specialized etiquette courses...",
  keywords: ['social', 'grace', 'professional', 'dining', 'classes', 'learning'],
  alternates: {
    canonical: "https://modernmannerism.com/blogs"
  }
};

const page = async () => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/list-blog`);
    console.log("Fetching from: ", `${process.env.NEXT_PUBLIC_API_URL}/api/blog/list-blog`);
    const page = 1;  // Adjust the page number based on your requirements (this could come from the query params)
    const pageSize = 10;  // Adjust based on what you want

    // Adding query parameters for pagination, sorting, and filtering
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);
    // You can add more parameters as needed, such as filterBy, categoryId, etc.

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    const result = await response.json();
    console.log(result, "RESULT");

    // Check if data exists
    if (result && result.data && result.data.length > 0) {
      return (
        <div>
          <BlogHero />
          <BentoGridDemo blogs={result.data} /> {/* Pass fetched data to BentoGridDemo */}
        </div>
      );
    } else {
      return <div>No blog posts found</div>;
    }
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return <div>Error loading blog posts</div>;
  }
};

export default page;
