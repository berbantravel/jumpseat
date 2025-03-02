import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

type ResponseData = {
  message?: string;
  id?: number;
  email?: string;
  name?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    
    // Don't send the password back
    const { password: _, ...userWithoutPassword } = user;
    
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}