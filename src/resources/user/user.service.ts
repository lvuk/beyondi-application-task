import { FastifyReply } from 'fastify';
import { db } from '../../database.config';
import { User } from './user.entity';

export const getUserById = async (
  userId: number,
  reply: FastifyReply
): Promise<User | null> => {
  const userRepository = db.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) return reply.code(404).send({ message: 'User not found' });

  return user;
};
