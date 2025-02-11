import 'reflect-metadata';
import 'dotenv/config';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { userRoutes } from './resources/user/user.routes';
import { initializeDb } from './database.config';
import { authRoutes } from './resources/auth/auth.routes';
import { productRoutes } from './resources/products/product.routes';
import jwtPlugin from './plugins/jwt.plugin';
import autoload from '@fastify/autoload';
import path from 'path';
import { addressRoutes } from './resources/address/address.routes';
import { metricsRoutes } from './resources/metrics/metrics.routes';

const fastify = Fastify({ logger: true });
const PORT: number = Number(process.env.PORT) || 3000;

// //plugins
// fastify.register(jwtPlugin);
fastify.register(autoload, {
  dir: path.join(__dirname, 'plugins'),
});
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

//database
initializeDb();

//routes
fastify.register(authRoutes);
fastify.register(userRoutes);
fastify.register(productRoutes);
fastify.register(addressRoutes);
fastify.register(metricsRoutes);

//start server
try {
  fastify.listen({ port: PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
