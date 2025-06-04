import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import ClickImage from '@/components/ui/click-image'

export default function PostCardImage({ images }: { images: string[] }) {
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)
    const [canScroll, setCanScroll] = useState(false) // 🔥 New state

    const scrollRef = useRef<HTMLDivElement>(null)

    const checkScroll = () => {
        const el = scrollRef.current
        if (!el) return

        setAtStart(el.scrollLeft === 0)
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1)
    }

    const checkCanScroll = () => {
        const el = scrollRef.current
        if (!el) return

        // if the content width exceeds the container width
        setCanScroll(el.scrollWidth > el.clientWidth)
    }

    const scrollBy = (amount: number) => {
        scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
    }

    useEffect(() => {
        checkCanScroll()
        window.addEventListener('resize', checkCanScroll)
        return () => window.removeEventListener('resize', checkCanScroll)
    }, [images])

    return (
        <div className="relative">
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className={`flex overflow-x-hidden overflow-y-clip gap-2 py-2 w-full scroll-smooth ${images.length === 1 ? 'justify-center ' : ''}`}
            >
                {images.map((image, index) => (
                    <ClickImage image={image} key={index} />
                ))}
            </div>

            {canScroll && (
                <>
                    {!atStart && (
                        <button
                            onClick={() => scrollBy(-300)}
                            className="absolute z-20 top-1/2 -translate-y-1/2 left-2 bg-white/80 hover:bg-white cursor-pointer rounded-full p-1 shadow"
                        >
                            <ChevronLeft className="w-5 h-5 text-black" />
                        </button>
                    )}
                    {!atEnd && (
                        <button
                            onClick={() => scrollBy(300)}
                            className="absolute z-20 top-1/2 -translate-y-1/2 right-2 bg-white/80 hover:bg-white cursor-pointer rounded-full p-1 shadow"
                        >
                            <ChevronRight className="w-5 h-5 text-black" />
                        </button>
                    )}
                </>
            )}
        </div>
    )
}
