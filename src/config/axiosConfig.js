import * as axios from 'axios';

let Axios = axios;

Axios.defaults.baseURL = 'http://inv.karmydev.ru/';
Axios.defaults.withCredentials = true;

export default Axios;