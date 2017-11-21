// import _ from 'lodash'
import HttpService from '../services/httpService'
import {
	CLOSE_DIALOG,
	SHOW_DIALOG,
	FORM_LOADING,
	FORM_LOAD_DONE
} from './actionTypes'

export function loadFields(url) {
	return dispatch => {
		dispatch({
			type: FORM_LOADING
		})
		return HttpService.sentRequest(url)
		.then(res => res.json(), err => console.log('An error occurded.', err))
		.then(json => {
			return dispatch({
				type: FORM_LOAD_DONE,
				fields: json,
				url
			})
		})
	}
}

export function create(url, data) {
	return (dispatch, getState) => {
		// TODO handle save
		console.log(url, data)
		dispatch({
			type: CLOSE_DIALOG,
			name: 'create'
		})
	}
}

export function loadEdit(url, data) {
	return (dispatch, getState) => {
		console.log(url, data)
		dispatch({
			type: SHOW_DIALOG,
			name: 'edit'
		})
		// Load field
		let fieldsUrl = url + '/fields'
		// load data
		let dataUrl = url + '/quanvm3'// + data.email
		Promise.all([
			HttpService.sentRequest(fieldsUrl), 
			HttpService.sentRequest(dataUrl)
		])
		.then(values => {
				let fieldResponse = values[0]
				let dataResponse = values[1]
				return {
					fieldRes: fieldResponse.json(),
					dataRes: dataResponse.json()
				}
			}, err => {
				console.log('An error occurded.', err)
			}
		)
		.then(data => {
			dispatch({
				type: ''
			})
			
		})
	}
}

