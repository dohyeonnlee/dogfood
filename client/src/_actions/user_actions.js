import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY,
    UPLOAD_REVIEW
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

// export function auth(){
//     const request = axios.get(`${USER_SERVER}/auth`)
//     .then(response => response.data);

//     return {
//         type: AUTH_USER,
//         payload: request
//     }
// }

// export function logoutUser(){
//     const request = axios.get(`${USER_SERVER}/logout`)
//     .then(response => response.data);

//     return {
//         type: LOGOUT_USER,
//         payload: request
//     }
// }
export function auth(){
        const request = axios.get(`${USER_SERVER}/auth`, {params: {userId: localStorage.getItem('userId')}})
        .then(response => response.data);
    
        return {
            type: AUTH_USER,
            payload: request
        }
    }
    
    export function logoutUser(){
        const request = axios.get(`${USER_SERVER}/logout`, {params: {userId: localStorage.getItem('userId')}})
        .then(response => response.data);
    
        return {
            type: LOGOUT_USER,
            payload: request
        }
    }
    

export function addToCart(id){
    let body = {
        productId: id
    }

    const request = axios.post(`${USER_SERVER}/addToCart`, body)
        .then(response => response.data);

    return {
        type: ADD_TO_CART,
        payload: request
    }
}


export function getCartItems(cartItems, userCart){

    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => {

            //cartItem 들에 해당하는 정보들을 
            //product collection에서 가져온 후
            // Quantity 정보를 넣어준다.
            userCart.forEach(cartItem => {
                response.data.products.forEach((productDetail, index) => {
                    if(cartItem.id === productDetail._id) {
                        
                        response.data.products[index].quantity = cartItem.quantity
                        
                    }
                })
            })        
        return response.data.products;
    });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}

export function removeCartItem(productId) {

    const request = axios.get(`/api/users/removeFromCart?id=${productId}`)
        .then(response => {
            //productInfo, cart 정보 > CartDetail
            response.data.cart.forEach(item => {
                response.data.productInfo.forEach((product, index) => {
                    if (item.id === product._id) {
                        response.data.productInfo[index].quantity = item.quantity
                    }

                })
            })
            return response.data;
        });

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}

export function onSuccessBuy(data) {


    const request = axios.post(`/api/users/successBuy`, data)
        .then(response => response.data);
        

    return {
        type: ON_SUCCESS_BUY,
        payload: request
    }
}

export function uploadReview(data){


    const request = axios.post(`/api/users/uploadReview`, data)
        .then(response => response.data);
            
    
    return {
        type: UPLOAD_REVIEW,
        payload: request
    }
}