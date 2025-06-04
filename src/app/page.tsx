import { posts } from '@/_data/posts';

import PostCard from '@/components/layout/postcard';


export default function Home() {
    return (
        <>
            <main className="flex flex-col items-center justify-between p-24">
                <h1 className="text-4xl font-bold">Welcome to EchoPix!</h1>
                <div className="w-full max-w-2xl mt-8 flex flex-col gap-10 ">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </main>
        </>
    );
}
