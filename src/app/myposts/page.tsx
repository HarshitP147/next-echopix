// Update the import path if the actual location is different, for example:
import PostCard from "@/components/layout/postcard";

import { posts } from "@/_data/posts";

export default function Page() {
    return (
        <div className=" flex flex-col items-center justify-around mx-auto">
            <p className="mt-4">
                This is the page where you can see all your posts.
                <br />
            </p>
            <div className="w-full max-w-2xl mt-8 flex flex-col gap-10 ">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}