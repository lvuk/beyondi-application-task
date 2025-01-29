import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';
import {
  deleteProductOpts,
  getAllProductsOpts,
  getAllUserProductsOpts,
  getProductOpts,
  getUserProductOpts,
  postProductOpts,
  updateProductOpts,
} from './products.schema';
import { userExistsHook } from '../user/user.hooks';

export const productRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) => {
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

  //user products
  fastify.get('/users/:userId/products', getAllUserProductsOpts);
  //user product
  fastify.get('/users/:userId/products/:id', getUserProductOpts);

  done();
};
