import axios from 'axios';

const API = axios.create({
    baseURL: "http://pushmo-app-com.umbler.net/api",
    // baseURL: "http://192.168.1.5:3000/api",
    headers: {
        'x-auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6Ikx1Y2FzIiwiZW1haWwiOiJqbGt6ZnBAZ21haWwuY29tIiwiaWF0IjoxNTk1Mjg1NDk0fQ.swbmjsvRQI-GCG_WnerJVo5hNCW_8Tos0lko5vqojHo"
    }
})

export default API;