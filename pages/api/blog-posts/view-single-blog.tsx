import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed.' });
    }

    const { id, page = 1, limit = 10 } = req.query;

    // Validate that the `id` is provided and is a valid number
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: 'Invalid blog post ID.' });
    }

    // Convert page and limit to integers
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    // Calculate pagination offsets
    const skip = (pageNumber - 1) * limitNumber;

    try {
        // Fetch the blog post, including user, templates, and paginated comments
        const blogPost = await prisma.blogPost.findUnique({
            where: { id: Number(id) },
            include: {
                user: true,
                templates: true,
                comments: {
                    skip,
                    take: limitNumber,
                    include: {
                        user: { select: { firstName: true, lastName: true, avatar: true } },
                        replies: {
                            include: {
                                user: { select: { firstName: true, lastName: true, avatar: true } },
                            },
                        },
                    },
                },
            },
        });

        // Handle case where blog post is not found
        if (!blogPost) {
            return res.status(404).json({ error: 'Blog post not found.' });
        }

        // Fetch the total number of comments for pagination
        const totalComments = await prisma.comment.count({
            where: { blogPostId: Number(id) },
        });

        // Return the fetched blog post along with comments and pagination info
        res.status(200).json({
            post: blogPost,
            totalComments,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalComments / limitNumber),
        });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ error: 'Error fetching blog post.' });
    }
}