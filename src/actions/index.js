import axios from 'axios';

export const RECEIVE_DATA = 'RECEIVE_DATA';
export const KURANGI_SALDO = 'KURANGI_SALDO';

export function receiveData(data) {
    return {
        type: RECEIVE_DATA,
        result: Object.values(data)
    };
}

const fetchData = dataCrypto => dispatch => {
    return axios({
        method: 'GET',
        url: 'https://api.coinmarketcap.com/v2/ticker/?convert=IDR&limit=100'
    })
    .then(function(response) {
        dispatch(receiveData(response.data.data));
    });
}

export const fetchPostsIfNeeded = dataCrypto => (dispatch) => {
    return dispatch(fetchData())
}

export const kurangiSaldo = harga => (dispatch) => {
    return {
        type: KURANGI_SALDO,
        sisa_saldo: localStorage.getItem('saldo') - harga
    }
}