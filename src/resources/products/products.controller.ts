import { Role } from './../user/user.entity';
import { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../../database.config';
import { Product } from './product.entity';
import { IProduct } from './product.interface';
import { makeErrorResponse } from '../../errors/error.handler';
import { User } from '../user/user.entity';
import { Address } from '../address/address.entity';

export const getProducts = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const productRep = db.getRepository(Product);

  const products = await productRep.find({
    relations: ['user', 'address'],
  });

  return reply.send(products);
};

export const getProduct = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const productRep = db.getRepository(Product);
  const { id } = request.params;

  const product = await productRep.findOneBy({ id });

  //check for product
  if (!product) {
    return reply.status(404).send(makeErrorResponse(404, 'Product not found'));
  }

  //Role check
  if (request.user.role === Role.USER && product.user.id !== request.user.id)
    return reply.code(403).send(makeErrorResponse(403, 'Unauthorized'));

  return reply.send(product);
};

export const addProduct = async (
  request: FastifyRequest<{ Body: IProduct }>,
  reply: FastifyReply
) => {
  const productRep = db.getRepository(Product);
  const { name, description, image, location, labelAddr } = request.body;
  const user = await db.getRepository(User).findOneBy({ id: request.user.id });

  if (!name || !description || !image || !location || !labelAddr)
    return reply
      .code(400)
      .send(makeErrorResponse(400, 'Missing required fields'));

  if (!user) {
    return reply.code(404).send(makeErrorResponse(404, 'User not found'));
  }

  const address = await db.getRepository(Address).findOne({
    where: { label: labelAddr, user: { id: user.id } },
  });

  if (!address)
    return reply.code(404).send(makeErrorResponse(404, 'Address not found'));

  const product = productRep.create({
    name,
    description,
    image,
    user,
    address,
  });

  await productRep.save(product);
  return reply.code(201).send(product);
};

export const deleteProduct = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const productRep = db.getRepository(Product);
  const { id } = request.params;
  const product = await productRep.findOne({
    where: { id },
    relations: ['user'],
  });

  if (!product)
    return reply.code(404).send(makeErrorResponse(404, 'Product not found'));

  if (product.user.id !== request.user.id) {
    return reply.code(403).send(makeErrorResponse(403, 'Unauthorized'));
  }

  await productRep.delete({ id });
  return reply.send({ message: `Product with ID:${id} successfully deleted` });
};

export const updateProduct = async (
  request: FastifyRequest<{ Params: { id: number }; Body: IProduct }>,
  reply: FastifyReply
) => {
  const productRep = db.getRepository(Product);
  const { id } = request.params;
  const { name, description, image, labelAddr } = request.body;

  const address = await db.getRepository(Address).findOne({
    where: { label: labelAddr, user: { id: request.user.id } },
  });

  const product = await productRep.findOne({
    where: { id },
    relations: ['user'],
  });

  if (!product)
    return reply.code(404).send(makeErrorResponse(404, 'Product not found'));

  if (product.user.id !== request.user.id) {
    return reply.code(403).send(makeErrorResponse(403, 'Unauthorized'));
  }

  product.name = name ?? product.name;
  product.description = description ?? product.description;
  product.image = image ?? product.image;
  product.address = address ?? product.address;

  await productRep.save(product);

  return reply.code(200).send(product);
};

//specific
export const getUserProducts = async (
  request: FastifyRequest<{ Params: { userId: number } }>,
  reply: FastifyReply
) => {
  const userId = Number(request.params.userId);

  if (isNaN(userId)) {
    return reply.code(400).send(makeErrorResponse(400, 'Invalid user ID'));
  }

  const productRep = db.getRepository(Product);

  const products = await productRep.find({
    where: { user: { id: userId } },
    relations: ['user', 'address'],
  });

  //Role check
  if (request.user.role === Role.USER && request.user.id !== userId)
    return reply.code(403).send(makeErrorResponse(403, 'Unauthorized'));

  return reply.code(200).send(products);
};

export const getUserProduct = async (
  request: FastifyRequest<{ Params: { userId: number; id: number } }>,
  reply: FastifyReply
) => {
  const userId = Number(request.params.userId);
  const productId = Number(request.params.id);

  if (isNaN(userId) || isNaN(productId)) {
    return reply
      .code(400)
      .send(makeErrorResponse(400, 'Invalid user or product ID'));
  }

  const productRep = db.getRepository(Product);

  const product = await productRep.findOne({
    where: { id: productId, user: { id: userId } },
    relations: ['user', 'address'],
  });

  if (!product) {
    return reply.code(404).send(makeErrorResponse(404, 'Product not found'));
  }

  if (request.user.role === Role.USER && request.user.id !== product.user.id)
    return reply.code(403).send(makeErrorResponse(403, 'Unauthorized'));

  return reply.code(200).send(product);
};
