import { QueryDTO } from '../utilities/query-dto';
import { UserDTO } from '../utilities/user-dto';
import { Form } from '../utilities/types';
import axios, { AxiosResponse } from 'axios';

const serverAdress: string = 'http://localhost:3005';

interface ApiError {
  discriminator: 'Error',
  error?: string
}

export function instanceOfApiError (object: any): object is ApiError {
  return object.discriminator === 'Error';
};

export async function checkUser (email: string, password: string): Promise<UserDTO | ApiError> {
  try{
    const response: AxiosResponse = await axios.post(`${serverAdress}/users`, {
      email: email,
      password: password
    });
    return response.data;
  } catch (err) {
    console.error(err)
    return {discriminator: 'Error', error: 'Error: cannot connect to server.'};
  }
};

export async function createUser (user: Form): Promise<UserDTO | ApiError> {
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
    return {discriminator: 'Error', error: 'Error: could not create user. Try again.'};
  }
}

export async function twitterQuery (query: string, endpoint: string): Promise<QueryDTO | ApiError> {
  try {
    const response: AxiosResponse = await axios.get(`${serverAdress}/analyze/${endpoint}/${query}`);
    if (typeof response.data === 'string') return {discriminator: 'Error', error: response.data};
    else {
      const result: QueryDTO = {
        endpoint: endpoint,
        search: query,
        ...response.data
      }
      return result;
    }
  } catch (err) {
    console.error(err)
    return {discriminator: 'Error', error: 'Something unexpected happen... Try again!'};
  }
};