import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: IUser;
  }
}

// export default fastify;
