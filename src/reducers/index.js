import { combineReducers } from 'redux'
// import {routerReducer} from 'react-router-redux'
import { reducer as FormComponent } from 'redux-form'
import TableComponent from './tableComponentReducer'

const rootReducer = combineReducers({
	// routing: routerReducer,
	FormComponent,
	TableComponent
});

// const rootReducer = combineReducers(Object.assign({}, {form: formReducer}, TableComponent))
export default rootReducer;