export interface UserDTO {
  _id: string,
  name: string,
  email: string,
  username: string,
  twitter_handle?: string
};

export const userInitialState: UserDTO = {
  _id: '',
  name: '',
  email: '',
  username: '',
  twitter_handle: ''
};