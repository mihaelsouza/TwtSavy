import { UserDTO } from '../utilities/user-dto';
import { Form } from '../utilities/types';
import axios from 'axios';

const serverAdress: string = 'http://localhost:3005';

export async function checkUser(email: string, password: string): Promise<UserDTO | string> {
  try{
    const response = await axios.post(`${serverAdress}/users`, {
      email: email,
      password: password
    });
    return response.data;
  } catch (err) {
    console.log(err)
    return "Error: can't connect to server.";
  }
};

export async function createUser(user: Form): Promise<UserDTO | string> {
  try {
    const response = await axios.post(`${serverAdress}/users/add`, {
      name: user.fullName,
      username: user.username,
      email: user.email,
      password: user.password,
      twitter_handle: user.twitterHandle
    });
    return response.data;
  } catch(err) {
    console.log(err)
    return "Error: could not create user. Try again."
  }
}