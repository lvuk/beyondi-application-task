import { FastifyRequest, FastifyReply } from 'fastify';
import { Role } from '../resources/user/user.entity';
import { makeErrorResponse } from '../errors/error.handler';

export const checkRole =
  (role: Role) => async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user;
    console.log('User role:', user.role);
    if (!user) {
      return reply.code(401).send(makeErrorResponse(401, 'Unauthorized'));
    }

    if (user.role !== role) {
      return reply
        .code(403)
        .send(makeErrorResponse(403, 'Forbidden: Insufficient permissions'));
    }
  };
