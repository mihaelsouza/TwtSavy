import { ApiError } from '../interfaces/api.error-interface';
import { QueryDTO } from '../interfaces/query-dto';
import { UserDTO } from '../interfaces/user-dto';
import { Form } from '../types/types';
import { NEST_HOST, NEST_PORT } from '@env';
import axios, { AxiosResponse } from 'axios';

const serverAdress: string = `${NEST_HOST}:${NEST_PORT}`;

export async function checkUser (email: string, password: string): Promise<UserDTO | ApiError> {
  try{
    const response: AxiosResponse = await axios.post(`${serverAdress}/users`, {
      email: email,
      password: password
    });
    return response.data;
  } catch (err) {
    return {
      discriminator: 'Error',
      error: err.response.status === 404 ?
        'Error: e-mail not registered.' :
        'Error: invalid e-mail and/or password.'
    };
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
    return {
      discriminator: 'Error',
      error: err.response.status === 409 ?
      'Error: e-mail already in use.' :
      'Error: could not create user. Try again.'
    };
  }
}

export async function twitterQuery (userId: string, query: string, endpoint: string): Promise<QueryDTO | ApiError> {
  try {
    const response: AxiosResponse = await axios.get(`${serverAdress}/analyze/${endpoint}/${query}/${userId}`);
    const result: QueryDTO = {
      endpoint: endpoint,
      search: query,
      ...response.data
    }
    return result;
  } catch (err) {
    return {
      discriminator: 'Error',
      error: err.response.status === 400 ?
        'Insufficient number of tweets to analyze!':
        'Something unexpected happen... Try again!'
    };
  }
};