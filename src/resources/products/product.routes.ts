import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';
import {
  deleteProductOpts,
  getAllProductsOpts,
  getProductOpts,
  postProductOpts,
  updateProductOpts,
} from './products.schema';
import { userExistsHook } from '../user/user.hooks';

export const productRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) => {
  fastify.addHook('preHandler', userExistsHook);
  fastify.addHook('onRequest', fastify.authenticate);

  //get all products
  fastify.get('/products', getAllProductsOpts);
  //get product
  fastify.get('/products/:id', getProductOpts);
  //create product
  fastify.post('/products', postProductOpts);
  //delete product
  fastify.delete('/products/:id', deleteProductOpts);
  //update product
  fastify.put('/products/:id', updateProductOpts);

  done();
};
