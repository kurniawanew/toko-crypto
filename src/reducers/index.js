import { RECEIVE_DATA } from '../actions';

const getDataCrypto = (state = {dataCrypto: []}, action) => {
    switch (action.type) {
        case RECEIVE_DATA:
            return {
                ...state,
                dataCrypto: action.result
            }
    
        default:
            return state;
    }
}

export default getDataCrypto