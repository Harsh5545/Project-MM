import { auth } from "@/auth";
import EditBlog from "@/components/Admin-Components/Blog-Admin-Component/Edit-Blog-Component/EditBlogComponent";

const page = async ({params}) => {
    const slug = (await params).slug
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/blog-details?slug=${slug}`);
    const result = await response.json();
    const session = await auth();
    return (
        <div className="space-y-4">
            <EditBlog existingBlog={result?.data || {}} userId={session?.user?.id}/>
        </div>
    )
}

export default page