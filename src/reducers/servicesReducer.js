import { urlServices } from '../utils/vars';

export const types = {
    GET_SERVICES_SUCCESS: 'GET_SERVICES_SUCCESS',
    GET_SERVICES_ERROR: 'GET_SERVICES_ERROR',
    GET_SERVICES_NOT_FOUND: 'GET_SERVICES_NOT_FOUND',
};

const initialState = { dataServices: '', hasErrored: false, message: '', id: '', formData: '' };


export const servicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SERVICES_SUCCESS:
            return {
                ...state,
                dataServices: action.dataServices,
                loading: false,
                hasErrored: false,
                message: 'ok',
                id: '',
                formData: ''
            }
        case types.GET_SERVICES_ERROR:
            return {
                ...state,
                loading: false,
                hasErrored: true,
                message: action.error,
                id: '',
                formData: ''
            }
        case types.GET_SERVICES_NOT_FOUND:
            return {
                ...state,
                dataServices: '',
                loading: false,
                hasErrored: false,
                message: 'notFound',
                id: '',
                formData: ''
            }
        default:
            return state;
    }
}



export const actions = {
    ServicesSuccess: (dataServices) => ({ type: types.GET_SERVICES_SUCCESS, dataServices }),
    ServcesError: (error) => ({ type: types.GET_SERVICES_ERROR, error }),
    ServicesNotFound: (message) => ({ type: types.GET_SERVICES_NOT_FOUND, message }),
}

export const servicesLoad = () => {
    return (dispatch) => {

        fetch(urlServices, { method: 'GET' }).then(res => {

                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(info => {

                info ? dispatch(actions.ServicesSuccess(info)) : dispatch(actions.ServicesNotFound(info))
            })
            .catch(() => dispatch(actions.ServcesError(true)));
    }

}

export const saveOnBackend = (data) => {

    console.dir(data);
    fetch(urlServices, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then((res) => { console.dir("я тут"); return res }).then((info) => { console.dir(info); });
}