import { urlContracts } from '../utils/vars';

export const types = {
    GET_CONTRACTS_SUCCESS: 'GET_CONTRACTS_SUCCESS',
    GET_CONTRACTS_ERROR: 'GET_CONTRACTS_ERROR',
    GET_CONTRACTS_NOT_FOUND: 'GET_CONTRACTS_NOT_FOUND',
    EDIT_CONTRACT_OPEN: 'EDIT_CONTRACT_OPEN',
    EDIT_CONTRACT_SAVE: 'EDIT_CONTRACT_SAVE'
};

const initialState = { dataContracts: '', hasErrored: false, message: '', id: '', formData: '' };


export const contractsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CONTRACTS_SUCCESS:
            return {
                ...state,
                dataContracts: action.dataContracts,
                loading: false,
                hasErrored: false,
                message: 'ok',
                id: '',
                formData: ''
            }
        case types.GET_CONTRACTS_ERROR:
            return {
                ...state,
                loading: false,
                hasErrored: true,
                message: action.error,
                id: '',
                formData: ''
            }
        case types.GET_CONTRACTS_NOT_FOUND:
            return {
                ...state,
                dataContracts: '',
                loading: false,
                hasErrored: false,
                message: 'notFound',
                id: '',
                formData: ''
            }
        case types.EDIT_CONTRACT_OPEN:
            return {
                ...state,
                loading: false,
                hasErrored: false,
                id: action.id,
                formData: action.id
            }
        case types.EDIT_CONTRACT_SAVE:
            {
                return {
                    ...state,
                    dataContracts: state.dataContracts.map((item, i) => { if (JSON.stringify(item) === JSON.stringify(state.id)) { return action.formData }; return item; }),
                    loading: false,
                    hasErrored: false,
                    id: action.id,
                    formData: action.formData
                }
            }
        default:
            return state;
    }
}

export const actions = {
    contractsSuccess: (dataContracts) => ({ type: types.GET_CONTRACTS_SUCCESS, dataContracts }),
    contractsError: (error) => ({ type: types.GET_CONTRACTS_ERROR, error }),
    contractsNotFound: (message) => ({ type: types.GET_CONTRACTS_NOT_FOUND, message }),
    editContractOpen: (id) => ({ type: types.EDIT_CONTRACT_OPEN, id }),
    editContractSave: (formData) => ({ type: types.EDIT_CONTRACT_SAVE, formData }),
}

export const contractsLoad = () => {
    return (dispatch) => {

        fetch(urlContracts, { method: 'GET' }).then(res => {

                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(info => {

                info ? dispatch(actions.contractsSuccess(info)) : dispatch(actions.contractsNotFound(info))
            })
            .catch(() => dispatch(actions.contractsError(true)));
    }

}

export const saveOnBackend = (data) => {
    console.dir(data);
    fetch(urlContracts, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then((res) => { console.dir("я тут"); return res }).then((info) => { console.dir(info); });
}