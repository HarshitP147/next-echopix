export type Post = {
    id: string,
    username: string,
    avatar: string,
    text?: string,
    images?: [string, ...string[]], // at least one image, but can have more
    createdAt: string, // date string
    likes: number,
};

import img1 from './91d808c6-b6cb-4788-a9fe-60eca25a8eb2.png';
import img2 from './assets_task_01jsjc0mykfb7s9yd0fz4tfc98_img_0.webp'
import img3 from './assets_task_01jwg0x98ffyttpnm0zyw3h446_1748589581_img_0.webp';
import img4 from './bba73214-e5f9-48a0-9bb8-e1e2a7d9eb12.png'

export const posts: Post[] = [
    {
        id: '1',
        username: 'alice_wonder',
        avatar: 'https://avatars.githubusercontent.com/u/87654321?v=4',
        text: 'Check out this cool image, everyone! This is a great day! I love the fact that we can share our thoughts and images here. Technology has greatly improved our lives. Keep sharing! 🌟',
        // images: [img1.src, img2.src, img3.src, img4.src],
        images: [img1.src, img2.src, img3.src, img4.src],
        createdAt: '2023-10-03T09:15:00Z',
        likes: 20,
    },

];