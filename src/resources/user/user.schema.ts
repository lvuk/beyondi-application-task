import {
  DefaultDeletionSchemaModel,
  ErrorSchemaModel,
  UserSchemaModel,
} from '../../models';
import { getUsers, getUser, deleteUser, updateUser } from './user.controller';

export const getAllUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: UserSchemaModel,
      },
    },
  },
  handler: getUsers,
};

export const getUserOpts = {
  schema: {
    response: {
      200: UserSchemaModel,
      404: ErrorSchemaModel,
    },
  },
  handler: getUser,
};

export const deleteUserOpts = {
  schema: {
    response: {
      200: DefaultDeletionSchemaModel,
      404: ErrorSchemaModel,
      403: ErrorSchemaModel,
    },
  },
  handler: deleteUser,
};

export const updateUserOpts = {
  schema: {
    response: {
      200: UserSchemaModel,
      404: ErrorSchemaModel,
    },
  },
  handler: updateUser,
};
