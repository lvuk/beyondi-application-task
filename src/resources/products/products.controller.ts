import { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../../database.config';
import { Product } from './product.entity';
import { IProduct, IProductParams } from './product.interface';
import { makeErrorResponse } from '../../errors/error.handler';
import { getUserById } from '../user/user.service';
import { User } from '../user/user.entity';

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

export const addProduct = async (
  request: FastifyRequest<{ Body: IProduct }>,
  reply: FastifyReply
) => {
  const productRep = db.getRepository(Product);
  const { name, description, image, location } = request.body;
  const user = await getUserById(request.user.id, reply);

  if (!user) {
    return reply.status(404).send(makeErrorResponse(404, 'User not found'));
  }

  console.log(user);
  const product = productRep.create({
    name,
    description,
    image,
    location,
    user,
  });

  await productRep.save(product);
  return reply.code(201).send(product);
};

export const deleteProduct = async (
  request: FastifyRequest<{ Params: IProductParams }>,
  reply: FastifyReply
) => {
  const productRep = db.getRepository(Product);
  const { id } = request.params;
  const product = await productRep.findOne({
    where: { id },
    relations: ['user'],
  });

  console.log(request.user);
  console.log(product);

  if (!product)
    return reply.code(404).send(makeErrorResponse(404, 'Product not found'));

  if (product.user.id !== request.user.id) {
    return reply.code(403).send(makeErrorResponse(403, 'Unauthorized'));
  }

  await productRep.delete({ id });
  return reply.send({ message: `Product with ID:${id} successfully deleted` });
};

export const updateProduct = async (
  request: FastifyRequest<{ Params: IProductParams; Body: IProduct }>,
  reply: FastifyReply
) => {
  const productRep = db.getRepository(Product);
  const { id } = request.params;
  const { name, description, image, location } = request.body;

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
  product.location = location ?? product.location;

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
    relations: ['user'],
  });

  return reply.send(products);
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
    relations: ['user'],
  });

  if (!product) {
    return reply.code(404).send(makeErrorResponse(404, 'Product not found'));
  }

  return reply.send(product);
};
