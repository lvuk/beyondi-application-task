import {
  AddressSchemaModel,
  DefaultDeletionSchemaModel,
  ErrorSchemaModel,
} from '../../models';
import {
  addAddress,
  deleteAddress,
  getAllUserAddresses,
  getUserAddress,
  updateAddress,
} from './address.controller';

export const getAllUserAddressesOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: AddressSchemaModel,
      },
      400: ErrorSchemaModel,
      404: ErrorSchemaModel,
      403: ErrorSchemaModel,
    },
  },
  handler: getAllUserAddresses,
};

export const getUserAddressOpts = {
  schema: {
    response: {
      200: AddressSchemaModel,
      404: ErrorSchemaModel,
      403: ErrorSchemaModel,
    },
  },
  handler: getUserAddress,
};

export const postAddressOpts = {
  shcema: {
    body: {
      type: 'object',
      required: ['street', 'city', 'country', 'zip', 'label'],
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
        country: { type: 'string' },
        zip: { type: 'string' },
        label: { type: 'string' },
      },
    },
    response: {
      201: AddressSchemaModel,
      400: ErrorSchemaModel,
      404: ErrorSchemaModel,
      403: ErrorSchemaModel,
    },
  },
  handler: addAddress,
};

export const deleteAddressOpts = {
  schema: {
    response: {
      200: DefaultDeletionSchemaModel,
      400: ErrorSchemaModel,
      404: ErrorSchemaModel,
      403: ErrorSchemaModel,
    },
  },
  handler: deleteAddress,
};

export const updateAddressOpts = {
  schema: {
    body: AddressSchemaModel,
    response: {
      200: AddressSchemaModel,
      400: ErrorSchemaModel,
      404: ErrorSchemaModel,
      403: ErrorSchemaModel,
    },
  },
  handler: updateAddress,
};
