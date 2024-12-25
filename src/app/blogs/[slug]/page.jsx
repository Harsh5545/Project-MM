
    import { Suspense } from "react";
    import styles from "./singlePost.module.css"
    import Image from "next/image";
    import PostUser from "@/components/postUser/postUser";
    // import { getPost } from "@/lib/data";


    export const generateMetadata = async ({ params }) => {
        const { slug } = params;
        // const post = await getPost(slug);
        return {
            // title: post.title,
            
            // description: post.body
        };
    }
    const SinglePostPage = async ({ params }) => {
        const { slug } = params;
        // const post = await getPost(slug);

        return (
            // <div className={`styles.container mt-52 w-[90%] mx-auto`}>
            //     {post?.img && (
            //         <div className={styles.imgContainer}>
            //             <Image src={post.image} alt="" fill className={styles.img} />
            //         </div>
            //     )}
            //     <div className={styles.textContainer}>
            //         <h1 className={styles.title}>{post.title}</h1>
            //         <div className={styles.detail}>
            //             {post && (
            //                 <Suspense fallback={<div>Loading...</div>}>
            //                     <PostUser userId={post.authorId} />
            //                 </Suspense>
            //             )}
            //             <div className={styles.detailText}>
            //                 <span className={styles.detailTitle}>Published</span>
            //                 <span className={styles.detailValue}>
            //                     {post?.createdAt.toString().slice(4, 16)}
            //                 </span>
            //             </div>
            //         </div>
            //         <div className={styles.content}>{post.body}</div>
            //     </div>
            // </div>
            <></>
            
        )
    }

    export default SinglePostPage