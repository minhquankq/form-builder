import {
	FORM_LOADING,
	FORM_LOAD_DONE
} from '../actions/actionTypes'

export default (state = {}, action) => {
	switch(action.type) {
		case FORM_LOADING:
			return {
				...state,
				formLoading: true,
			}
		case FORM_LOAD_DONE:
			return {
				...state,
				fields: action.fields,
				formLoading: false,
			}
		default:
		return state;
	}
}