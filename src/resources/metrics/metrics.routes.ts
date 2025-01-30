import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';
import { checkRole } from '../../hooks/auth.hooks';
import { Role } from '../user/user.entity';
import { getMetricsHandler } from './metrics.controller';

export const metricsRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) => {
  fastify.addHook('preHandler', fastify.authenticate);

  fastify.get(
    '/admin/metrics',
    { preHandler: [checkRole(Role.ADMIN)] },
    getMetricsHandler
  );

  done();
};
