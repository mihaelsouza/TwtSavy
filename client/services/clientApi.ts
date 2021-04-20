import { UserDTO } from '../utilities/user-dto';
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