import 'dotenv/config';
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { makeErrorResponse } from '../errors/error.handler';

export default fp(async function (fastify: FastifyInstance) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('Missing JWT_SECRET environment variable');
  }

  fastify.register(fastifyJwt, { secret: jwtSecret });

  // JWT authentication hook
  fastify.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.code(401).send(makeErrorResponse(401, 'Unauthorized'));
      }
    }
  );
});
