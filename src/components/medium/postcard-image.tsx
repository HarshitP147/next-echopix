import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import ClickImage from "@/components/ui/click-image";

export default function PostCardImage({ images }: { images: string[] }) {
    return (
        <Carousel orientation="horizontal" className="user-select-none ">
            <CarouselContent className="relative" >
                {images.map((image, index) => (
                    <CarouselItem key={index} >
                        <ClickImage image={image} key={index} />
                    </CarouselItem>
                ))}

            </CarouselContent>
            <CarouselPrevious className="absolute left-2 z-20" />
            <CarouselNext className="absolute right-2 z-20" />
        </Carousel>
    )
}