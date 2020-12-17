import * as axios from 'axios';
import { serverName } from './serverName';

let Axios = axios;

Axios.defaults.baseURL = serverName;
Axios.defaults.withCredentials = true;

export default Axios;