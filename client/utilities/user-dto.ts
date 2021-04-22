export interface UserDTO {
  name: string,
  email: string,
  username: string,
  twitter_handle?: string
};

export const userInitialState: UserDTO = {
  name: '',
  email: '',
  username: '',
  twitter_handle: ''
};