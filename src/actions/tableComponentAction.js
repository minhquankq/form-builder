import HttpService from '../services/httpService'
import { LOADING_DATA_TABLE, DATA_TABLE_LOADED } from './actionTypes'

function getPaginationObject(total, numPerpage, page) {
	return {
		page: page,
		total: Math.floor(total/numPerpage)
	}
}
export function loadDataTable(url, page, filter, sort) {
	return (dispatch) => {
		dispatch({type: LOADING_DATA_TABLE})
		// prepare request info
		let numPerpage = 10;
		let requestUrl = url + '/' + numPerpage + '/' + ((page - 1) * numPerpage)
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