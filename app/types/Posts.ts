export type PostType = {
    title: string;
    id: string;
    createdAt: string;
    user: {
        name: string;
        image: string;
    }
    Comment?: {
        createAt: string;
        id: string;
        postId: string;
        userId: string;
    }[]
}