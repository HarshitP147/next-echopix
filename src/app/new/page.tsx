// src/app/new/page.tsx

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function NewPostPage() {
    const [text, setText] = useState('')
    const [images, setImages] = useState<File[]>([])


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Later: send data to Supabase
        console.log({ text, images })
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-4xl text-center font-bold mb-4">Create a new post</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Textarea
                    placeholder="What's on your mind?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="resize-none w-[150%]"
                />
                <input
                    type="file"
                    accept="image/*"
                    multiple
                />
                <Button type="submit" className="w-fit">
                    Post
                </Button>
            </form>
            {/* Preview images */}
            {images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                    {images.map((file, i) => (
                        <img
                            key={i}
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="w-full h-24 object-cover rounded"
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
