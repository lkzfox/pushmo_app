import axios from 'axios';

const API = axios.create({
    baseURL: "http://10.0.2.2:3000/api",
    headers: {
        'x-auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikx1Y2FzIEZlaXRvemEiLCJlbWFpbCI6Impsa3pmcEBnbWFpbC5jb20uYnIiLCJpYXQiOjE1NjUyMjc4MTd9.yMjVuQv_4g2sXh20nzSNGVF7zAX95F_h5BDwkxrviys"
    }
})

export default API;