import { store } from '../containers/App';
import {url} from '../utils/vars';

export const types = {
	GET_CLIENTS_LOADING: 'GET_CLIENTS_LOADING',
	GET_CLIENTS_SUCCESS: 'GET_CLIENTS_SUCCESS',
	GET_CLIENTS_ERROR:'GET_CLIENTS_ERROR',
	GET_CLIENTS_NOT_FOUND:'GET_CLIENTS_NOT_FOUND',
	EDIT_CLIENT_OPEN: 'EDIT_CLIENT_OPEN',
	EDIT_CLIENT_SAVE: 'EDIT_CLIENT_SAVE',
};

const initialState = { data:'', dataContracts:'', loading: false, hasErrored: false, message: '', id:'', formData: ''};


export const tableClientsReducer = (state=initialState,action) => {
	switch (action.type) {
		case types.GET_CLIENTS_LOADING:
		return {
			...state,loading:true, hasErrored: false, message: '' , id:'',	formData: ''
		}
		case types.GET_CLIENTS_SUCCESS: 
		return {
			...state, data: action.data, loading: false, hasErrored: false, message: 'ok',  id:'',	formData: ''
		}
		case types.GET_CLIENTS_ERROR: 
		return {
			...state, data: '', loading: false, hasErrored: true, message: action.error,  id:'',	formData: ''
		}
		case types.GET_CLIENTS_NOT_FOUND: 
		return {
			...state, data: '' ,loading: false, hasErrored: false, message: 'notFound',  id:'',	formData: ''
		}
		case types.EDIT_CLIENT_OPEN:
		return {
			...state,loading: false, hasErrored: false, id: action.id,	formData: action.id
		}
		case types.EDIT_CLIENT_SAVE:
		{
		return {
			...state,data:state.data.map((item,i)=>{if (JSON.stringify(item)===JSON.stringify(state.id)) {return  action.formData}; return item; }), loading: false, hasErrored: false, id: action.id,	formData: action.formData
		}
		}
		
		default: return state;
	}
}

 

export const actions = {
	clientsLoading: (bool) => ({type: types.GET_CLIENTS_LOADING, bool}),
	clientsSuccess: (data) => ({type: types.GET_CLIENTS_SUCCESS, data}),
	clientsError: (error) => ({type: types.GET_CLIENTS_ERROR, error}),
	clientsNotFound: (message) => ({type:types.GET_CLIENTS_NOT_FOUND, message}),
	editClientOpen: (id) => ({ type: types.EDIT_CLIENT_OPEN, id }),
	editClientSave: (formData) => ({ type: types.EDIT_CLIENT_SAVE, formData }),
}

export const clientsLoad = () => {
	return (dispatch) => {
		
		dispatch(actions.clientsLoading(true));
		fetch(url, {method:'GET'}).then( res=>{
			
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			 return res.json();
			})
		.then(info => {
			
			info ? dispatch(actions.clientsSuccess(info)): dispatch(actions.clientsNotFound(info))
		})
		.catch(()=> dispatch(actions.clientsError(true)));

	}

}

export const saveOnBackend = (data) => {
	console.dir(data);
		fetch(url, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		})
		.then((res) => { console.dir("я тут"); return res }).then((info) => {console.dir(info); });
}

