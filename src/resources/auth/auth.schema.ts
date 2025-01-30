import { ErrorSchemaModel } from '../../models';
import {
  register,
  login,
  requestPasswordReset,
  resetPassword,
} from './auth.controller';

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
          token: { type: 'string' },
        },
      },
    },
  },
  handler: login,
};

export const requestPasswordResetOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['email'],
      properties: {
        email: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      404: ErrorSchemaModel,
    },
  },
  handler: requestPasswordReset,
};

export const passwordResetOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'resetCode', 'password', 'repeatPassword'],
      properties: {
        email: { type: 'string' },
        resetCode: { type: 'string' },
        password: { type: 'string' },
        repeatPassword: { type: 'string' },
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
  handler: resetPassword,
};
