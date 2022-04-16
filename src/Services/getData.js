import axios from "axios";

const http = axios.create({
    baseURL: "https://computer-service.my-project.site/api",
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('servis_token')
    }

})

export default http;