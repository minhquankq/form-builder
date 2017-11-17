import _ from 'lodash'
import CryptoJS from 'crypto-js'
import HttpService from '../services/httpService'
import { LOADING_DATA_TABLE, DATA_TABLE_LOADED } from './actionTypes'

function getPaginationObject(total, numPerpage, page) {
	return {
		page: page,
		total: Math.ceil(total/numPerpage)
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
export function loadDataTable(url, page, filter, sort) {
	return (dispatch) => {
		dispatch({type: LOADING_DATA_TABLE})
		// prepare request info
		let numPerpage = 10;
		let requestUrl = url + '/' + numPerpage + '/' + ((page - 1) * numPerpage) + '?data=' + getFilterAndSort(filter, sort);
		return HttpService.sentRequest(requestUrl)
			.then(res => res.json(), err => console.log('An error occurded.', err))
			.then(json => {
				//TODO check http status
				return dispatch({
					type: DATA_TABLE_LOADED,
					data: json,
					url,
					pagination: getPaginationObject(json.total, numPerpage, page)
				})
			})
	}
}