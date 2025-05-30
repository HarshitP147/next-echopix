'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { House, PlusCircle, GalleryVerticalEnd } from 'lucide-react'

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import echopix from '@/../public/echopix.png'

export default function Navbar() {
    const pathname = usePathname();

    const linkClasses = (path: string) =>
        `mx-4 rounded-md transition hover:bg-zinc-400 ${pathname === path
            ? 'bg-black text-white '
            : 'text-gray-800 hover:bg-gray-200'
        }`;

    return (
        <NavigationMenu className="flex justify-between items-center mx-auto px-5 py-3 shadow-lg rounded-md mt-4 bg-white  max-w-fit ">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <Image
                    src={echopix}
                    alt="EchoPix logo"
                    width={135}
                    height={135}
                    className="rounded-md"
                />
            </div>

            {/* Nav Links */}
            <NavigationMenuList className="flex items-center justify-center mx-4 w-[50vw] ">

                <NavigationMenuItem asChild className={linkClasses('/')} >
                    <Link href="/" className={`p-2`} >
                        <House size={28} absoluteStrokeWidth />
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem asChild className={linkClasses('/new')} >
                    <Link href="/new" className={`p-2`} >
                        <PlusCircle size={28} absoluteStrokeWidth />
                    </Link>
                </NavigationMenuItem>

                <NavigationMenuItem asChild className={linkClasses('/myposts')} >
                    <Link href="/myposts" className={`p-2`} >
                        <GalleryVerticalEnd size={28} absoluteStrokeWidth />
                    </Link>
                </NavigationMenuItem>

            </NavigationMenuList>

            {/* Avatar */}
            <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </NavigationMenu >
    )
}

