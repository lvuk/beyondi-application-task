import { FastifyReply, FastifyRequest } from 'fastify';
import { users } from './user.routes';
import { IUserCreate, IUserParams } from './user.interface';
import { v6 as uuidv6 } from 'uuid';
import { db } from '../../database.config';
import { makeErrorResponse } from '../../errors/error.handler';
import { User } from './user.entity';

export const getUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const users = await db.getRepository('User').find();
  return reply.code(200).send(users);
};

export const getUser = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const user = await db
    .getRepository('User')
    .findOneBy({ id: request.params.id });

  if (!user)
    return reply.code(404).send(makeErrorResponse(404, 'User not found'));

  return reply.code(200).send(user);
};

export const deleteUser = async (
  request: FastifyRequest<{ Params: IUserParams }>,
  reply: FastifyReply
) => {
  const user = await db.getRepository(User).findOne({
    where: { id: request.params.id },
    relations: ['products'],
  });

  if (!user)
    return reply.code(404).send(makeErrorResponse(404, 'User not found'));

  if (user.id !== request.user.id)
    return reply.code(403).send(makeErrorResponse(403, 'Unauthorized'));

  await db.getRepository(User).delete({ id: user.id });

  return reply.code(200).send({ message: 'User deleted' });
};

export const updateUser = async (
  request: FastifyRequest<{ Params: IUserParams; Body: IUserCreate }>,
  reply: FastifyReply
) => {
  const { name, email } = request.body;
  const user = await db
    .getRepository('User')
    .findOneBy({ id: request.params.id });

  if (!user)
    return reply.code(404).send(makeErrorResponse(404, 'User not found'));

  console.log(user.id, request.user.id);
  if (user.id !== request.user.id)
    return reply.code(403).send(makeErrorResponse(403, 'Unauthorized'));

  user.name = name ?? user.name;
  user.email = email ?? user.email;

  await db.getRepository('User').save(user);
  return reply.code(200).send(user);
};
