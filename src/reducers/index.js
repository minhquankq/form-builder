import { combineReducers } from 'redux'
// import {routerReducer} from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import TableComponent from './tableComponentReducer'
import FormComponent from './formComponentReducer'

const rootReducer = combineReducers({
	// routing: routerReducer,
	form: formReducer,
	TableComponent,
	FormComponent
});
export default rootReducer;