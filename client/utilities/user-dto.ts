export interface UserDTO {
  _id: number,
  name: string,
  email: string,
  username: string,
  twitter_handle?: string
};

export const userInitialState: UserDTO = {
  _id: 0,
  name: '',
  email: '',
  username: '',
  twitter_handle: ''
};