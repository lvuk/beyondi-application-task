import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify';
import { getAllProductsOpts, getProductOpts } from './products.schema';

export const productRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) => {
  //get all products
  fastify.get('/products', getAllProductsOpts);
  //get product
  fastify.get('/products/:id', getProductOpts);

  done();
};
