import {DATA_TABLE_LOADED, LOADING_DATA_TABLE, SHOW_DIALOG, CLOSE_DIALOG} from '../actions/actionTypes'

export default (state = {}, action) => {
	let showDialog = {};
	switch(action.type) {
		case LOADING_DATA_TABLE: 
			return {
				...state,
				loading: true
			}
		case DATA_TABLE_LOADED:
			return {
				...state,
				loading: false,
				data: action.data,
				pagination: action.pagination
			}
		case SHOW_DIALOG:
			showDialog = state.showDialog || {}
			showDialog[action.name] = true;
			return {
				...state,
				showDialog
			}
		case CLOSE_DIALOG:
			showDialog = state.showDialog || {}
			showDialog[action.name] = false;
			return {
				...state,
				showDialog
			}
		default:
			return state;
	}
}