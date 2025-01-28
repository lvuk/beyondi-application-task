import fastify, {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';

import { registerOpts, loginOpts } from './auth.schema';

export const authRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) => {
  fastify.post('/register', registerOpts);
  fastify.post('/login', loginOpts);

  done();
};
