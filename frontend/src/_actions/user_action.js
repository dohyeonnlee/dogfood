import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';
//axios.defaults.xsrfCookieName = "csrftoken";
//axios.defaults.xsrfHeaderName = "X-CSRFToken";
export function loginUser(dataToSubmit) {
    
    //서버에서 받은 데이터 request에 저장
    const request = axios.post('/api/users/login/', dataToSubmit)
//    const request = axios({method: 'post',
//                            url: '/api/users/',
//                            data:dataToSubmit ,
//                            headers: {"X-CSRFToken": axios.defaults.xsrfHeaderName}})

    .then(response => response.data)
    console.log(request)
    return { //request를 reducer에 넘겨줌
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    
    //서버에서 받은 데이터 request에 저장
    const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data)

    return { //request를 reducer에 넘겨줌
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {
    
    
    const request = axios.get('api/users/auth')
    .then(response => response.data)

    return { //request를 reducer에 넘겨줌
        type: AUTH_USER,
        payload: request
    }
}
