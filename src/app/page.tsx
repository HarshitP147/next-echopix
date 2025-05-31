import { posts } from '@/_data/posts';

import PostCard from '@/components/ui/postcard';


export default function Home() {
    return (
        <>
            <main className="flex border border-black flex-col items-center justify-between p-24">
                <h1 className="text-4xl font-bold">Welcome to EchoPix!</h1>
                <p className="mt-4 text-lg">Your photo sharing platform.</p>
                <div className="w-full max-w-2xl mt-8">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>  
            </main>
        </>
    );
}
