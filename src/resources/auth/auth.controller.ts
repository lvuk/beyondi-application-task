import { FastifyReply, FastifyRequest } from 'fastify';
import { IRegisterUser, ILoginUser } from './auth.interface';
import bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';
import { db } from '../../database.config';
import { makeErrorResponse } from '../../errors/error.handler';
import nodemailer from 'nodemailer';

export const register = async (
  request: FastifyRequest<{ Body: IRegisterUser }>,
  reply: FastifyReply
) => {
  const { email, password, repeatPassword } = request.body;
  const userRep = db.getRepository(User);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  if (emailRegex.test(email) === false)
    return reply.code(400).send(makeErrorResponse(400, 'Invalid email'));

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

export const requestPasswordReset = async (
  request: FastifyRequest<{ Body: { email: string } }>,
  reply: FastifyReply
) => {
  const { email } = request.body;
  const userRepo = db.getRepository(User);
  const user = await userRepo.findOne({ where: { email } });

  if (!user)
    return reply.code(404).send(makeErrorResponse(404, 'User not found'));

  // Generate reset code
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 10); // Expires in 10 mins

  user.resetCode = resetCode;
  user.resetCodeExpires = expires;
  await userRepo.save(user);

  // Send email
  await sendResetEmail(user.email, resetCode);

  return reply.send({ message: 'Reset code sent to email' });
};

export const resetPassword = async (
  request: FastifyRequest<{
    Body: {
      email: string;
      resetCode: string;
      newPassword: string;
      repeatPassword: string;
    };
  }>,
  reply: FastifyReply
) => {
  const { email, resetCode, newPassword, repeatPassword } = request.body;
  const userRepo = db.getRepository(User);
  const user = await userRepo.findOne({ where: { email, resetCode } });

  if (!user || !user.resetCodeExpires || user.resetCodeExpires < new Date()) {
    return reply.code(400).send(makeErrorResponse(400, 'Invalid reset code'));
  }

  if (newPassword !== repeatPassword)
    return reply
      .code(400)
      .send(makeErrorResponse(400, 'Passwords do not match'));

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.resetCode = undefined;
  user.resetCodeExpires = undefined;
  await userRepo.save(user);

  return reply.send({ message: 'Password updated successfully' });
};

const sendResetEmail = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: '"Support" <no-reply@gmail.com>',
    to: email,
    subject: 'Password Reset Code',
    text: `Your password reset code is: ${code}`,
  });
};
