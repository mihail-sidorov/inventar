import * as axios from 'axios';

let Axios = axios;

Axios.defaults.baseURL = 'http://127.0.0.1:3101/';
Axios.defaults.withCredentials = true;

export default Axios;