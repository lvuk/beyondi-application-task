import 'reflect-metadata';
import 'dotenv/config';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { userRoutes } from './resources/user/user.routes';
import fastifySwaggerUi from '@fastify/swagger-ui';

const fastify = Fastify({ logger: true });

//swagger
fastify.register(import('@fastify/swagger'));
fastify.register(import('@fastify/swagger-ui'), {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

//routes
fastify.register(userRoutes);

const PORT: number = Number(process.env.PORT) || 3000;

try {
  fastify.listen({ port: PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
