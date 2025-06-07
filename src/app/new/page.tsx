'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Card, CardAction, CardHeader, CardFooter, CardTitle, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import PostCardImage from '@/components/medium/postcard-image'

export default function NewPostPage() {
    const [text, setText] = useState('')
    const [images, setImages] = useState<File[]>([])

    const [imagePreview, setImagePreview] = useState<string[]>([])
    useEffect(() => {
        if (images.length > 0) {
            const previews = images.map(file => URL.createObjectURL(file))
            setImagePreview(previews)
        } else {
            setImagePreview([])
        }
    }, [images]);


    const handleSubmit = (e: React.FormEvent) => {
        // This will be handled by server actions in the future
        // Prevent default form submission
        e.preventDefault()
        // Reset form
        setText('')
        setImages([])
        // Clear file input
        const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = ''
        }
        // Optionally, you can also handle image uploads here
        // For now, just log the data
        console.log('Post submitted:', { text, images });

    }

    useEffect(() => {
        // Clean up object URLs when component unmounts or images change
        return () => {
            imagePreview.forEach(url => URL.revokeObjectURL(url))
        }
    }, [imagePreview]);


    return (
        <Card className="max-w-md mt-5 mx-auto flex flex-col p-4 shadow-lg rounded-lg bg-white">
            <CardHeader>
                <CardTitle className="text-4xl text-center font-bold mb-4">Create a new post</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Textarea
                        placeholder="What's on your mind?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="resize-none w-full max-h-30"
                    />

                    <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                            if (e.target.files) {
                                const newFiles = Array.from(e.target.files).slice(0, 5 - images.length)
                                setImages(images => [...images, ...newFiles])
                            }
                        }}
                        className="w-full"
                    />

                    <Button type="submit" className="w-full cursor-pointer">
                        Post
                    </Button>
                </form>
                {/* Preview images */}

                {imagePreview.length > 0 && (
                    <div className="mt-4">
                        <PostCardImage images={imagePreview} />
                    </div>
                )}
            </CardContent>
            <CardFooter>

                {imagePreview.length > 0 && (
                    <CardAction>
                        <Button variant="outline" className="w-full cursor-pointer" onClick={() => {
                            // Delete the latest image uploaded
                            if (images.length > 0) {
                                setImages(images.slice(0, -1))
                                setImagePreview(imagePreview.slice(0, -1))
                            }
                        }}>
                            Delete Image
                        </Button>
                    </CardAction>
                )}
            </CardFooter>
        </Card >
    )
}
