import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';

import ClickImage from '@/components/ui/click-image'

export default function PostCardImage({ images }: { images: string[] }) {
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)


    const scrollRef = useRef<HTMLDivElement>(null)
    const multipleImages = images.length > 1

    const checkScroll = () => {
        const el = scrollRef.current
        if (!el) return
        setAtStart(el.scrollLeft === 0)
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1)
    }

    useEffect(() => {
        checkScroll()
    }, [images.length])

    const scrollBy = (amount: number) => {
        scrollRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
    }

    const widthClass = (() => {
        switch (images.length) {
            case 1:
                return 'w-full h-64'
            case 2:
                return 'w-1/2 h-64'
            case 3:
                return 'w-1/3 h-64'
            case 4:
                return 'w-1/4 h-64'
            default:
                return 'w-64 h-64'
        }
    })()

    return (
        <div className="relative">
            {/* Scroll Container */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex overflow-x-hidden overflow-y-clip gap-2 py-2 scroll-smooth"
            >
                {images.map((image, index) => (
                    <ClickImage image={image} key={index} className={widthClass} />
                ))}
            </div>

            {/* Left Button */}
            {multipleImages && !atStart && (
                <button
                    onClick={() => scrollBy(-300)}
                    className="absolute z-20 top-1/2 -translate-y-1/2 left-2 bg-white/80 hover:bg-white cursor-pointer rounded-full p-1 shadow"
                >
                    <ChevronLeft className="w-5 h-5 text-black" />
                </button>
            )}

            {/* Right Button */}
            {multipleImages && !atEnd && (
                <button
                    onClick={() => scrollBy(300)}
                    className="absolute z-20 top-1/2 -translate-y-1/2 right-2 bg-white/80 hover:bg-white cursor-pointer rounded-full p-1 shadow"
                >
                    <ChevronRight className="w-5 h-5 text-black" />
                </button>
            )}
        </div>
    )
}