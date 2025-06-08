'use client'

import { useState } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"

import { Avatar } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import PostCardImage from "@/components/medium/postcard-image"

import { type Post } from "@/_data/posts"

export default function PostCard({ post }: { post: Post }) {
    const [expanded, setExpanded] = useState(false);
    const shouldTruncate = post.text && post.text.length > 200;

    return (
        <Card className="gap-4 rounded-lg shadow-lg border-none">
            <CardHeader className="flex items-center gap-4">
                <Avatar >
                    <Image src={post.avatar} alt={post.username} width={40} height={40} className="rounded-full" />
                </Avatar>
                <div className='border-b border-gray-200 pb-2 flex  items-baseline justify-between w-full'>
                    <h2 className="text-xl font-semibold">{post.username}</h2>
                    <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toDateString()}
                    </p>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {/* Text */}
                {post.text && (
                    <p
                        className="text-gray-700">
                        {expanded || !shouldTruncate
                            ? post.text
                            : `${post.text.slice(0, 200)}...`}
                        {shouldTruncate && (
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="ml-2 text-blue-500 hover:underline"
                            >
                                {expanded ? 'Read less' : 'Read more'}
                            </button>
                        )}
                    </p>
                )}

                {/* Image */}
                {post.images && post.images.length > 0 && (
                    <PostCardImage images={post.images} />
                )}

            </CardContent>
            <CardFooter>
                <span className="text-md gap-2 flex items-center text-gray-500">
                    <Heart className="inline  text-red-500 fill-red-500" />
                    {post.likes} likes
                </span>

            </CardFooter>
        </Card>
    )
}