import axios from 'axios'
import handleError from '../handleApiError'; 
import { Config } from '../../configuration/apiconfiguration';

const instance = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

instance.interceptors.response.use(
  response => response,
 
  ({ message, response: { data, status } }) => {
    return handleError({ message, data, status })
  },
)

export default instance