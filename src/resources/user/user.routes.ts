import fastify, {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';
import {
  getAllUsersOpts,
  getUserOpts,
  deleteUserOpts,
  updateUserOpts,
} from './user.schema';

export let users = [
  { id: '1', name: 'Alice', email: 'alice@alice.com' },
  { id: '2', name: 'Bob', email: 'bob@bob.com' },
  { id: '3', name: 'Charlie', email: 'charlie@charlie.com' },
];

export const userRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) => {
  fastify.addHook('preHandler', fastify.authenticate);
  //get all users
  fastify.get('/users', getAllUsersOpts);
  //get  user
  fastify.get('/users/:id', getUserOpts);
  //delete user
  fastify.delete('/users/:id', deleteUserOpts);
  //update user
  fastify.put('/users/:id', updateUserOpts);

  done();
};
