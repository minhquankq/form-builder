export function require(value) {
	if(value) return null;
	return {
		message: "This field is required"
	};
}
export function email(value) {
	// eslint-disable-next-line
	let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let result = re.test(value);
	if(result) return null;
	return {
		message: "This field require email format"
	}
}

export function minLength(value, minLength) {
	if(!value || value.length < minLength) {
		return {
			message: "This field require min length is " + minLength
		}
	}
	return null;
}
