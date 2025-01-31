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
//-------------------------------
declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;

    jwt: {
      sign(payload: object, options?: object): string;
      verify(token: string, options?: object): object;
      decode(token: string, options?: object): object | null;
    };

    user: IUser;
  }
}
//-------------------------------
