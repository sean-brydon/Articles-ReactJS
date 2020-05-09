import { GET_ERRORS,CLEAR_ERRORS} from './types';

// Return all errors
export const returnErrors = (msg,status,id = null) =>{
    return{
        type: GET_ERRORS,
        payload:{ msg,status,id }
    };
};

//Remove all errors

export const clearErrors = () => {
    return{
        type: CLEAR_ERRORS
    };
};