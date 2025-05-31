'use client'

import { useRef, useState } from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Avatar } from '@/components/ui/avatar'
import type { Post } from '@/_data/posts'

export default function PostCard({ post }: { post: Post }) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)

    const checkScroll = () => {
        const el = scrollRef.current
        if (!el) return
        setAtStart(el.scrollLeft === 0)
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1)
    }

    const scrollBy = (amount: number) => {
        scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
    }

    return (
        <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
            {/* User Info */}
            <div className="flex items-center gap-3">
                <Avatar src={post.avatar} alt={post.username} />
                <div>
                    <h2 className="text-lg font-semibold">{post.username}</h2>
                    <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Text */}
            {post.text && <p className="text-gray-700">{post.text}</p>}

            {/* Images */}
            {post.images && post.images.length > 0 && (
                <div className="relative">
                    {/* Scroll Container */}
                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex overflow-x-hidden h-64 w-full gap-2 py-2 snap-x snap-mandatory scroll-smooth"
                    >
                        {post.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Post image ${index + 1}`}
                                className="w-full h-full object-cover border rounded-lg flex-shrink-0 snap-center"
                            />
                        ))}
                    </div>

                    {/* Left Button */}
                    {!atStart && (
                        <button
                            onClick={() => scrollBy(-300)}
                            className="absolute top-1/2 -translate-y-1/2 left-2 bg-white/80 hover:bg-white cursor-pointer rounded-full p-1 shadow"
                        >
                            <ChevronLeft className="w-5 h-5 text-black" />
                        </button>
                    )}

                    {/* Right Button */}
                    {!atEnd && (
                        <button
                            onClick={() => scrollBy(300)}
                            className="absolute top-1/2 -translate-y-1/2 right-2 bg-white/80 hover:bg-white cursor-pointer rounded-full p-1 shadow"
                        >
                            <ChevronRight className="w-5 h-5 text-black" />
                        </button>
                    )}
                </div>
            )}

            <span className="text-sm text-gray-500">{post.likes} likes</span>
        </div>
    )
}
