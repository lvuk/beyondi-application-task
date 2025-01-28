import { register, login } from './auth.controller';

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    email: { type: 'string' },
  },
};

export const registerOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password', 'repeatPassword'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        repeat_password: { type: 'string' },
      },
    },
    response: {
      200: userSchema,
    },
  },
  handler: register,
};

export const loginOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: login,
};
