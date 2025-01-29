import { FastifyRequest, FastifyReply } from 'fastify';
import { getUserById } from './user.service';

export const userExistsHook = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const user = await getUserById(request.user.id, reply); // Using the service to check user existence

  if (user) {
    request.user = user; // Attach the user to the request object if found
  }
};
