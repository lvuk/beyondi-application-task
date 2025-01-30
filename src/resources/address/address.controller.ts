import { FastifyRequest, FastifyReply } from 'fastify';
import { makeErrorResponse } from '../../errors/error.handler';
import { db } from '../../database.config';
import { Role, User } from '../user/user.entity';
import { Address } from './address.entity';

export const getAddresses = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const addresses = await db.getRepository(Address).find({
    relations: ['user'],
  });

  return reply.send(addresses);
};

export const getAddress = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const addressId = Number(request.params.id);
  const address = await db.getRepository(Address).findOne({
    where: { id: addressId },
    relations: ['user'],
  });

  if (isNaN(addressId))
    return reply.code(400).send(makeErrorResponse(400, 'Invalid address ID'));

  if (!address)
    return reply.code(404).send(makeErrorResponse(404, 'Address not found'));

  if (request.user.role === Role.USER && address.user.id !== request.user.id)
    return reply.code(403).send(makeErrorResponse(403, 'Unauthorized'));

  return reply.send(address);
};

export const getAllUserAddresses = async (
  request: FastifyRequest<{ Params: { userId: number } }>,
  reply: FastifyReply
) => {
  const userId = Number(request.params.userId);
  const user = await db.getRepository(User).findOneBy({ id: userId });

  //checkers
  if (isNaN(userId))
    return reply.code(400).send({ message: 'Invalid user ID' });

  if (!user) return reply.code(404).send({ message: 'User not found' });

  if (userId !== request.user.id)
    return reply.code(403).send(makeErrorResponse(403, 'Unauthorized'));

  const addresses = await db.getRepository(Address).find({
    where: { user: { id: userId } },
    relations: ['user'],
  });

  if (request.user.role === Role.USER && userId !== request.user.id)
    return reply.code(403).send(makeErrorResponse(403, 'Unauthorized'));

  return reply.send(addresses);
};

export const getUserAddress = async (
  request: FastifyRequest<{ Params: { userId: number; id: number } }>,
  reply: FastifyReply
) => {
  const userId = Number(request.params.userId);
  const addressId = Number(request.params.id);

  const user = await db.getRepository(User).findOneBy({ id: userId });
  const address = await db.getRepository(Address).findOne({
    where: { id: addressId, user: { id: userId } },
    relations: ['user'],
  });

  if (isNaN(userId) || isNaN(addressId))
    return reply
      .code(400)
      .send(makeErrorResponse(400, 'Invalid user or address ID'));
  if (!user)
    return reply.code(404).send(makeErrorResponse(404, 'User not found'));
  if (!address)
    return reply.code(404).send(makeErrorResponse(404, 'Address not found'));
  if (request.user.role === Role.USER && user.id !== request.user.id)
    return reply.code(403).send(makeErrorResponse(403, 'Unauthorized'));

  return reply.send(address);
};

export const addAddress = async (
  request: FastifyRequest<{ Body: Address }>,
  reply: FastifyReply
) => {
  const { street, city, country, zip, label } = request.body;
  const user = await db.getRepository(User).findOneBy({ id: request.user.id });

  if (!user)
    return reply.code(404).send(makeErrorResponse(404, 'User not found'));

  const address = db.getRepository(Address).create({
    street,
    city,
    country,
    zip,
    label,
    user,
  });

  await db.getRepository(Address).save(address);

  return reply.code(201).send(address);
};

export const updateAddress = async (
  request: FastifyRequest<{
    Params: { id: number };
    Body: Address;
  }>,
  reply: FastifyReply
) => {
  const addressId = Number(request.params.id);
  const { street, city, country, zip, label } = request.body;

  const address = await db.getRepository(Address).findOne({
    where: { id: addressId },
    relations: ['user'],
  });

  if (isNaN(addressId))
    return reply
      .code(400)
      .send(makeErrorResponse(400, 'Invalid user or address ID'));

  if (!address)
    return reply.code(404).send(makeErrorResponse(404, 'Address not found'));
  if (address.user.id !== request.user.id)
    return reply.code(403).send(makeErrorResponse(403, 'Unauthorized'));

  address.street = street ?? address.street;
  address.city = city ?? address.city;
  address.country = country ?? address.country;
  address.zip = zip ?? address.zip;
  address.label = label ?? address.label;

  await db.getRepository(Address).save(address);

  return reply.code(200).send(address);
};

export const deleteAddress = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const addressId = Number(request.params.id);

  const address = await db.getRepository(Address).findOne({
    where: { id: addressId },
    relations: ['user'],
  });

  if (isNaN(addressId))
    return reply
      .code(400)
      .send(makeErrorResponse(400, 'Invalid user or address ID'));

  if (!address)
    return reply.code(404).send(makeErrorResponse(404, 'Address not found'));
  if (address.user.id !== request.user.id)
    return reply.code(403).send(makeErrorResponse(403, 'Unauthorized'));

  await db.getRepository(Address).delete(address);

  return reply.code(200).send({ message: 'Address deleted' });
};
