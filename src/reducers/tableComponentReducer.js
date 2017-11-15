import {DATA_TABLE_LOADED, LOADING_DATA_TABLE} from '../actions/actionTypes'

export default (state = {}, action) => {
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
		default:
			return state;
	}
}