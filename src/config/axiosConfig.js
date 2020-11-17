import * as axios from 'axios';

let Axios = axios;

Axios.defaults.baseURL = 'http://192.10.0.203:3000/';
Axios.defaults.withCredentials = true;

export default Axios;