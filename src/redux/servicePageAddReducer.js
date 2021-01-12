import Axios from "../config/axiosConfig";

// Запросы к API
export let serviceAdd = (service) => {
    return Axios.post('accounts', service);
}