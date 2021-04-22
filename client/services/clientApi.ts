import { QueryDTO } from '../utilities/query-dto';
import { UserDTO } from '../utilities/user-dto';
import { Form } from '../utilities/types';
import axios, { AxiosResponse } from 'axios';

const serverAdress: string = 'http://localhost:3005';

export async function checkUser (email: string, password: string): Promise<UserDTO | string> {
  try{
    const response: AxiosResponse = await axios.post(`${serverAdress}/users`, {
      email: email,
      password: password
    });
    return response.data;
  } catch (err) {
    console.error(err)
    return "Error: can't connect to server.";
  }
};

export async function createUser (user: Form): Promise<UserDTO | string> {
  try {
    const response: AxiosResponse = await axios.post(`${serverAdress}/users/add`, {
      name: user.fullName,
      username: user.username,
      email: user.email,
      password: user.password,
      twitter_handle: user.twitterHandle
    });
    return response.data;
  } catch(err) {
    console.error(err)
    return "Error: could not create user. Try again."
  }
}

export async function twitterQuery (query: string, endpoint: string): Promise<QueryDTO | 'Error'> {
  try {
    const response: AxiosResponse = await axios.get(`${serverAdress}/analyze/${endpoint}/${query}`);
    return response.data;
  } catch (err) {
    console.error(err)
    return "Error";
  }
};