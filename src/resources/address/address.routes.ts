import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';
import {
  deleteAddressOpts,
  getAllUserAddressesOpts,
  getUserAddressOpts,
  postAddressOpts,
  updateAddressOpts,
  getAddressesOpts,
  getAddressOpts,
} from './address.schema';

export const addressRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) => {
  fastify.addHook('onRequest', fastify.authenticate);

  //get all addresses
  fastify.get('/addresses', getAddressesOpts);
  // get single address
  fastify.get('/addresses/:id', getAddressOpts);
  //get all user addresses
  fastify.get('/users/:userId/addresses', getAllUserAddressesOpts);
  //get user address
  fastify.get('/users/:userId/addresses/:id', getUserAddressOpts);
  //create address
  fastify.post('/addresses', postAddressOpts);
  //update address
  fastify.put('/addresses/:id', updateAddressOpts);
  //delete address
  fastify.delete('/addresses/:id', deleteAddressOpts);

  done();
};
