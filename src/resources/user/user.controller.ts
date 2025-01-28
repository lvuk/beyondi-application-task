import { FastifyReply, FastifyRequest } from 'fastify';
import { users } from './user.routes';
import { IUserCreate, IUserParams } from './user.interface';
import { v6 as uuidv6 } from 'uuid';

export const getUsers = (request: FastifyRequest, reply: FastifyReply) => {
  return reply.send(users);
};

export const getUser = (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const user = users.find((user) => user.id === id);
  return reply.send(user);
};

export const addUser = (
  request: FastifyRequest<{ Body: IUserCreate }>,
  reply: FastifyReply
) => {
  const { name, email } = request.body;
  const user = {
    id: uuidv6().toString(),
    name,
    email,
  };

  users.push(user);
  return reply.code(201).send(user);
};

export const deleteUser = (
  request: FastifyRequest<{ Params: IUserParams }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  users.filter((user) => user.id !== id);

  return reply.send({ message: `User with ID:${id} successfully deleted` });
};

export const updateUser = (
  request: FastifyRequest<{ Params: IUserParams; Body: IUserCreate }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const { name } = request.body;

  let temp = users.map((user) => (user.id === id ? { id, name } : user));

  let user = temp.find((user) => user.id !== id);

  return reply.send(user);
};
