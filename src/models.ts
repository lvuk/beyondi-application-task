export const UserSchemaModel = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    aboutMe: { type: 'string' },
    email: { type: 'string' },
  },
};

export const ErrorSchemaModel = {
  type: 'object',
  properties: {
    message: { type: 'string' },
    statusCode: { type: 'number' },
    status: { type: 'string' },
  },
};

export const DefaultDeletionSchemaModel = {
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
};

export const AddressSchemaModel = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    street: { type: 'string' },
    city: { type: 'string' },
    country: { type: 'string' },
    zip: { type: 'string' },
    label: { type: 'string' },
    user: UserSchemaModel,
  },
};

export const ProductSchemaModel = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    description: { type: 'string' },
    image: { type: 'string' },
    location: { type: 'string' },
    user: UserSchemaModel,
    address: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        street: { type: 'string' },
        city: { type: 'string' },
        country: { type: 'string' },
        zip: { type: 'string' },
        label: { type: 'string' },
      },
    },
  },
};
