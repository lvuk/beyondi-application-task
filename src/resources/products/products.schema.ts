import { createHook } from 'async_hooks';
import { ErrorSchemaModel, ProductSchemaModel } from '../../models';
import {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  getUserProducts,
  getUserProduct,
} from './products.controller';
import { checkRole } from '../../hooks/auth.hooks';
import { Role } from '../user/user.entity';

export const getAllProductsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: ProductSchemaModel,
      },
    },
  },
  preHandler: checkRole(Role.ADMIN),
  handler: getProducts,
};

export const getProductOpts = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
    },
    response: {
      200: ProductSchemaModel,
      404: ErrorSchemaModel,
    },
  },
  handler: getProduct,
};

export const postProductOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'description', 'image', 'location'],
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        image: { type: 'string' },
        location: { type: 'string' },
      },
    },
    response: {
      201: ProductSchemaModel,
      400: ErrorSchemaModel,
      404: ErrorSchemaModel,
    },
  },
  handler: addProduct,
};

export const deleteProductOpts = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      403: ErrorSchemaModel,
      404: ErrorSchemaModel,
    },
  },
  handler: deleteProduct,
};

export const updateProductOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        image: { type: 'string' },
        location: { type: 'string' },
      },
    },
    response: {
      200: ProductSchemaModel,
      404: ErrorSchemaModel,
      403: ErrorSchemaModel,
    },
  },
  handler: updateProduct,
};

export const getAllUserProductsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: ProductSchemaModel,
      },
      400: ErrorSchemaModel,
    },
  },
  handler: getUserProducts,
};

export const getUserProductOpts = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' },
      },
    },
    response: {
      200: ProductSchemaModel,
      400: ErrorSchemaModel,
      404: ErrorSchemaModel,
    },
  },
  handler: getUserProduct,
};
