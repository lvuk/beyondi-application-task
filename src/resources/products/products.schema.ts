import { getProducts, getProduct } from './products.controller';

export const getAllProductsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            description: { type: 'string' },
            image: { type: 'string' },
            location: { type: 'string' },
          },
        },
      },
    },
  },
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
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          description: { type: 'string' },
          image: { type: 'string' },
          location: { type: 'string' },
        },
      },
    },
  },
  handler: getProduct,
};
