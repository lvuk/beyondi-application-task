import { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../../database.config';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { IProductParams } from './product.interface';
import { makeErrorResponse } from '../../errors/error.handler';

export const getProducts = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const productRep = db.getRepository(Product);

  const products = await productRep.find();

  return reply.send(products);
};

export const getProduct = async (
  request: FastifyRequest<{ Params: IProductParams }>,
  reply: FastifyReply
) => {
  const productRep = db.getRepository(Product);
  const { id } = request.params;

  const product = await productRep.findOneBy({ id });

  //check for product
  if (!product) {
    return reply.status(404).send(makeErrorResponse(404, 'Product not found'));
  }

  return reply.send(product);
};
