'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'
import { useState } from 'react'

import { Avatar } from '@/components/ui/avatar'
import PostCardImage from '@/components/medium/postcard-image'

import type { Post } from '@/_data/posts'

export default function PostCard({ post }: { post: Post }) {
    const [expanded, setExpanded] = useState(false)
    const shouldTruncate = post.text && post.text.length > 200

    return (
        <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
            {/* User Info */}
            <div className="flex items-center gap-3">
                <Avatar >
                    <Image src={post.avatar} alt={post.username} width={40} height={40} className="rounded-full" />
                </Avatar>
                <div className='border-b border-gray-200 pb-2 flex  items-baseline justify-between w-full'>
                    <h2 className="text-xl font-semibold">{post.username}</h2>
                    <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toDateString()}
                    </p>
                </div>
            </div>

            {/* Text */}
            {post.text && (
                <p className="text-gray-700">
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

            {/* Images */}
            {post.images && post.images.length > 0 && (
                <PostCardImage images={post.images} />
            )}

            <span className="text-md gap-2 flex items-center text-gray-500">
                <Heart className="inline  text-red-500 fill-red-500" />
                {post.likes} likes
            </span>
        </div>
    )
}
