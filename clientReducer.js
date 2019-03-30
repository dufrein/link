import { store } from '../containers/App';
import { clientsLoad } from '../reducers/tableClients.js';
 
export const types = {
	EDIT_CLIENT_OPEN: 'EDIT_CLIENT_OPEN',
	EDIT_CLIENT_SAVE: 'EDIT_CLIENT_SAVE',
	EDIT_CLIENT_SAVE_SUCCESS: 'EDIT_CLIENT_SAVE_SUCCESS',
};

const initialState = { id: '', formData: '' };

export const actions = {
	editClientOpen: (id) => ({ type: types.EDIT_CLIENT_OPEN, id }),
	editClientSaving: (formData) => ({ type: types.EDIT_CLIENT_SAVE, formData }),
	editClientAfterSaving: () => ({ type: types.EDIT_CLIENT_SAVE_SUCCESS }),
}

export const editClientSave = (formData) => {
	return (dispatch) => {
		dispatch(actions.editClientSaving(formData));
		let data = {'formData':formData, 'id':store.getState().clientReducer.id};
		fetch('http://localhost:3002', {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		})
		.then((res) => { console.dir("я тут"); return res }).then((info) => {console.dir(info); clientsLoad();});
		dispatch(actions.editClientAfterSaving());
	}
}

export const clientReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.EDIT_CLIENT_OPEN:
		return {
			...state,
			id: action.id,
			formData: action.id
		}
		case types.EDIT_CLIENT_SAVE:
		return {
			...state,
			formData: action.formData,
		}
		case types.EDIT_CLIENT_SAVE_SUCCESS:
		return {
			...state, id:''
		}
		default:
		return state;
	}
}

// const editClientOpen = (id) => {
// 	return {
// 		type:types.EDIT_CLIENT_OPEN,
// 		id
// 	}
// }

// export const editClient = (action) => {
// 	return (dispatch) => {
// 		dispatch(actions.editClientOpen(action.id));
// 	}
// }