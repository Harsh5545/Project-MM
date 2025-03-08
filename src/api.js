
export async function GetBlogDetails(slug) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/blog-details?slug=${slug}`);
    const result = await response.json();
    return result;
}


export async function fetchBlogs(page = 1, pageSize, sortBy = "createdAt", sortOrder = "desc") {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/list-blog`);
    
    // Set query parameters
    url.searchParams.set("page", page);
    
    // If pageSize is provided, set it, else don't add the pageSize parameter
    if (pageSize) {
        url.searchParams.set("pageSize", pageSize);
    }
    
    url.searchParams.set("sortBy", sortBy);
    url.searchParams.set("sortOrder", sortOrder);

    // Fetch data from the API
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
    }

    // Parse and return the result
    const result = await response.json();
    return result;
}

