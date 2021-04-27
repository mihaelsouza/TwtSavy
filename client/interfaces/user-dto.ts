export interface UserDTO {
  _id: string,
  name: string,
  email: string,
  username: string,
  twitter_handle?: string,
  isSignedIn: boolean
};

export const userInitialState: UserDTO = {
  _id: '',
  name: '',
  email: '',
  username: '',
  twitter_handle: '',
  isSignedIn: false
};