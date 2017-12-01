import _ from 'lodash'
import CryptoJS from 'crypto-js'
import HttpService from '../services/httpService'
import { 
	LOADING_DATA_TABLE, 
	DATA_TABLE_LOADED, 
	SHOW_DIALOG, 
	CLOSE_DIALOG,
	DATA_TABLE_LOADE_ERROR
} from './actionTypes'

function getPaginationObject(total, numPerpage, page) {
	return {
		page,
		total,
		numPerpage
	}
}

function getFilterAndSort(filter, sort) {
	let result = {}
	if(!_.isEmpty(filter)) {
		filter = _.keys(filter).map(k => {
			let fil = {}
			fil[k] = {
				'$regex': filter[k],
				'$options': 'i'
			}
			return fil
		})
		result.wheres = {"$and": filter}
	}
	if(!_.isEmpty(sort)) {
		result.orders = sort;
	}
	var words = CryptoJS.enc.Utf8.parse(JSON.stringify(result))
	return CryptoJS.enc.Base64.stringify(words);
}

export function loadDataTable(url, pagination, filter, sort) {
	return (dispatch) => {
		dispatch({type: LOADING_DATA_TABLE})
		// prepare request info
		let {numPerpage = 10, page = 1} = pagination
		let requestUrl = url + '/' + numPerpage + '/' + ((page - 1) * numPerpage);
		requestUrl = url
		return HttpService.sentRequest(requestUrl)
			.then(
				res => res.json(), 
				err => {
					console.log('An error occurded.', err)
					dispatch({
						type: DATA_TABLE_LOADE_ERROR,
						ERROR: err
					})
				})
			.then(json => {
				if(!_.isEmpty(json))
					return dispatch({
						type: DATA_TABLE_LOADED,
						data: json,
						url,
						pagination: getPaginationObject(json.total, numPerpage, page)
					})
			})
	}
}

export function showDialog(name) {
	return dispatch => {
		dispatch({
			type: SHOW_DIALOG,
			name: name
		})
	}
}

export function closeDialog(name) {
	return dispatch => {
		dispatch({
			type: CLOSE_DIALOG,
			name: name
		})
	}
}

export function remove(url, data) {
	return dispatch => {
		console.log('delete', url, data)
	}
}