export interface ApiError {
  discriminator: 'Error',
  error: string
};

export function instanceOfApiError (object: any): object is ApiError {
  return object.discriminator === 'Error';
};