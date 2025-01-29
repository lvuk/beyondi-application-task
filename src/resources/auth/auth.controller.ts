import { FastifyReply, FastifyRequest } from 'fastify';
import { IRegisterUser, ILoginUser } from './auth.interface';
import bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';
import { db } from '../../database.config';
import { makeErrorResponse } from '../../errors/error.handler';

export const register = async (
  request: FastifyRequest<{ Body: IRegisterUser }>,
  reply: FastifyReply
) => {
  const { email, password, repeatPassword } = request.body;
  const userRep = db.getRepository(User);

  const user: User | null = await userRep.findOneBy({ email });

  //checkers
  if (user) {
    return reply.code(400).send(makeErrorResponse(400, 'User already exists'));
  }

  if (!email || !password || !repeatPassword) {
    return reply
      .code(400)
      .send(makeErrorResponse(400, 'All fields are required'));
  }

  if (password !== repeatPassword) {
    return reply
      .code(400)
      .send(makeErrorResponse(400, 'Passwords do not match'));
  }

  //hash password
  const hashedPassword: string = await bcrypt.hash(password, 10);
  const newUser: User = userRep.create({ email, password: hashedPassword });

  try {
    await userRep.save(newUser);
    return reply.code(201).send(newUser);
  } catch (error) {
    return reply.code(500).send(error);
  }
};

export const login = async (
  request: FastifyRequest<{ Body: ILoginUser }>,
  reply: FastifyReply
) => {
  const { email, password } = request.body;
  const userRep = db.getRepository(User);

  const user: User | null = await userRep.findOneBy({ email });

  if (!user) {
    return reply.code(404).send(makeErrorResponse(404, 'User not found'));
  }

  const isPasswordValid: boolean = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return reply.code(401).send(makeErrorResponse(401, 'Invalid password'));
  }

  const token = request.server.jwt.sign({ user }, { expiresIn: '2h' });

  return reply.code(200).send({ message: 'User logged in', token });
};
