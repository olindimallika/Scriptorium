import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/db';
import { verifyToken } from '../../../utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { page = 1, pageSize = 10 } = req.query;

    if (method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // check if user is authenticated
    const token = req.headers.authorization || '';
    const verifiedUser = verifyToken(token);
    if (!verifiedUser) {
        return res.status(401).json({ error: 'Unauthorized or invalid token' });
    }

    const userId = verifiedUser.userId;
    const pageNum = parseInt(page.toString(), 10);
    const pageSizeNum = parseInt(pageSize.toString(), 10);
    const skip = (pageNum - 1) * pageSizeNum;

    // check if pageNum and pageSize are valid numbers
    try {
        const totalItems = await prisma.blogPost.count({
            where: {
                userId,
                isHidden: false,
            }
        });

        // if no posts found, return empty array
        const posts = await prisma.blogPost.findMany({
            where: {
                userId,
                isHidden: false,
            },
            include: {
                tags: true,
                templates: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
            skip,
            take: pageSizeNum,
        });

        const totalPages = Math.ceil(totalItems / pageSizeNum);

        return res.status(200).json({
            posts,
            currentPage: pageNum,
            totalPages,
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ error: 'Error fetching posts.' });
    }
}