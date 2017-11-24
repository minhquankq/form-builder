import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { Form, Alert } from 'reactstrap'
import _ from 'lodash'

import AutoComplete from './AutoComplete'
import TextInput from './TextInput'
import CheckBox from './CheckBox'
import RadioButton from './RadioButton'
import DateInput from './DateInput'

import * as Validator from '../../services/validator'
import * as AsyncValidator from '../../services/asyncValidate'

const COMPONENTS = {
	Input: TextInput,
	Select: AutoComplete,
	CheckBox: CheckBox,
	RadioButton: RadioButton,
	DateInput: DateInput
}

class FromComponent extends Component {
	renderField(field) {
		let {component, id, name, props} = field
		let validates = _.isEmpty(field.validate) ? null : field.validate.map(v => {
			return Validator[v]
		})
		let Component = COMPONENTS[component]
		if(Component) {
			return <Field
								name={id}
								label={name}
								component={Component}
								{...props}
								key={id}
								validate={validates}
								 />
		} else {
			return (
				<Alert color="warning" key={id}>
					The component <b>{component}</b> is not supported! Please contact <a href="https://www.facebook.com/minhquankq" className="alert-link">QuanVM3</a> with a cup of coffee to define.
				</Alert>
			)
		}
	}

	render() {
		let {fields} = this.props
		if(!fields) return null;
		let fieldsComponent = fields.map(f => this.renderField(f));
		return(
			<Form onSubmit={(e) => {e.preventDefault(); console.log('onSubmit');} }>
				{fieldsComponent}
				{/* this input help to active onSubmit event */}
				<input type="submit" style={{visibility: 'hidden'}} />
			</Form>
		)
	}
}

FromComponent.propTypes = {
	fields: PropTypes.array.isRequired
}

let asyncValidate = (values, dispatch, props, field) => {
	let fieldConfig = props.fields.filter(f => f.id === field);
	let funcName = !_.isEmpty(fieldConfig) && fieldConfig[0]['asyncValidate']
	if(!_.isEmpty(funcName)) {
		return AsyncValidator[funcName](values[field], field)
	} else {
		return AsyncValidator.emptyPromise();
	}
}

let mapStateToProps = (state, props) => {
	let {formId, data} = props
	return {
			form: formId,
			initialValues: data
	};
}

let form = reduxForm({
	enableReinitialize: true,
	asyncValidate: asyncValidate,
})(FromComponent)

export default connect(mapStateToProps)(form)