import axios from "axios";

// Creating an instance of axios
const Api = axios.create({
    baseURL : "http://localhost:5000",
    withCredentials : true,
    headers : {
        "Content-Type" : "application/form-data"
    }
});

// Creating test api
export const testApi = () => Api.get('/test')
export const newTestApi = () => Api.get('/test_new')

// Creating register api\
export const registerUserApi = (data) => Api.post('/api/user/register', data)

// cresting login api
export const loginUserApi = (data) => Api.post('/api/user/login',data)

// create product create api
export const createProductApi = (data) => Api.post('/api/product/create', data)

export const changePass = (data) => Api.put("/api/user/change_password", data);



// http://localhost:5500/test
