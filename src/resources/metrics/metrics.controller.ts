import { FastifyRequest, FastifyReply } from 'fastify';
import { getMetrics } from './metrics.service';

export const getMetricsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const metrics = await getMetrics();
  return reply.send(metrics);
};
