import {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
} from './user.controller';

const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string' },
  },
};

export const getAllUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: User,
      },
    },
  },
  handler: getUsers,
};

export const getUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getUser,
};

export const postUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
      },
    },
    response: {
      201: User,
    },
  },
  handler: addUser,
};

export const deleteUserOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteUser,
};

export const updateUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: updateUser,
};
