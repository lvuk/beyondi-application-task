export const UserSchemaModel = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
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
