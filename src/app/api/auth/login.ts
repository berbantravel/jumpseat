import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // Import from your prisma client file, not from @prisma/client
import bcrypt from 'bcrypt';

type ResponseData = {
  message: string;
  user?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Don't send the password back
    const { password: _, ...userWithoutPassword } = user;

    // In a real app, you would create and send a JWT token here
    return res.status(200).json({
      message: 'Login successful',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}