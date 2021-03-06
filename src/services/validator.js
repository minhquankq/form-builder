const maxLength = max => value =>
	value && value.length > max ? `Must be ${max} characters or less` : undefined
const minLength = min => value =>
		value && value.length < min ? `Must be ${min} characters or more` : undefined
const minValue = min => value =>
		value && value < min ? `Must be at least ${min}` : undefined

export const required = value => (value ? undefined : 'Required')
export const maxLength15 = maxLength(15)
export const minLength8 = minLength(8)
export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const minValue18 = minValue(18)
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined

export const checkExistedEmail = value => {
  return fetch()
        .then(res => res.json(), err => {})
        .then(json => {
          if(json.message !== 'OK') {
            throw { email: json.message}
          }
        })
}