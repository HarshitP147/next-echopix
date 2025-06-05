import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function ClickImage({ image }: { image: string }) {
    const [isZoomed, setIsZoomed] = useState(false);

    const handleClick = () => {
        if (isZoomed) {
            setIsZoomed(false);
        } else {
            setIsZoomed(true);
        }
    };


    return (
        <motion.div className="flex-shrink-0 w-full h-64 rounded-lg border overflow-hidden"
            onClick={handleClick}
            style={{
                cursor: isZoomed ? 'zoom-out' : 'zoom-in',
            }}
        >
            <motion.div
                layout
                initial={{ scale: 1 }}
                animate={{
                    backgroundColor: isZoomed ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
                    scale: isZoomed ? 1.2 : 1
                }}

                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-screen h-screen fixed top-0 left-0 z-50 flex items-center justify-center"
                style={{ display: isZoomed ? 'flex' : 'none' }}
                onClick={handleClick}

            >
            </motion.div>
            <motion.div
                layout
                className='relative top-0 left-0 w-full h-full flex items-center justify-center'
                initial={{
                    scale: 1,
                    zIndex: 1,
                    position: 'relative',
                }}
                animate={{
                    scale: isZoomed ? 1.1 : 1,
                    zIndex: isZoomed ? 60 : 1,
                    position: isZoomed ? 'fixed' : 'relative',
                }}
                exit={{
                    scale: 1,
                    zIndex: 1,
                    position: 'relative',
                }}
            >
                <Image
                    src={image}
                    alt="Click to view"
                    width={300}
                    height={300}
                    className={`${isZoomed ? 'w-[50%] h-[50%] object-contain' : 'w-full h-full object-cover'} rounded-lg`}
                    onClick={handleClick}
                />
            </motion.div>
        </motion.div >
    )

}