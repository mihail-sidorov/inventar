import Axios from "../config/axiosConfig";

export default function mentoringFileLoad(file, cId) {
    let formData = new FormData();
    formData.append('file', file.files[0]);
    return Axios.post(`/mentoringFileLoad?id=${cId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
}