import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const customers = await prisma.Customer.findMany({ orderBy: { name: 'asc' } });
        return res.status(200).json(customers);
    }

    if (req.method === 'POST') {
        const {
            name,
            contact,
            email,
            phone,
            billingAddress,
            shippingAddress,
        } = req.body

        if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

        const newCustomer = await prisma.Customer.create({
            data: { name, contact, email, phone, billingAddress, shippingAddress },
        })

        return res.status(201).json(newCustomer);
    }

    return res.status(405).end()
}