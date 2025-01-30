import { ErrorSchemaModel, UserSchemaModel } from '../../models';
import {
  register,
  login,
  requestPasswordReset,
  resetPassword,
} from './auth.controller';

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
      200: UserSchemaModel,
      400: ErrorSchemaModel,
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
      401: ErrorSchemaModel,
      404: ErrorSchemaModel,
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
      400: ErrorSchemaModel,
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
