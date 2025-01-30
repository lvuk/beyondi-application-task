import fastify, {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';

import {
  registerOpts,
  loginOpts,
  requestPasswordResetOpts,
  passwordResetOpts,
} from './auth.schema';

export const authRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) => {
  fastify.post('/register', registerOpts);
  fastify.post('/login', loginOpts);
  fastify.post('/request-password-reset', requestPasswordResetOpts);
  fastify.post('/reset-password', passwordResetOpts);

  done();
};
