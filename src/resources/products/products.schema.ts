import {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} from './products.controller';

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
      201: {
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
    },
  },
  handler: deleteProduct,
};

export const updateProductOpts = {
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
  handler: updateProduct,
};
