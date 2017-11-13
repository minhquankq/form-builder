import React, { Component } from 'react';
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

const COMPONENTS = {
	Input: TextInput,
	Select: AutoComplete,
	CheckBox: CheckBox,
	RadioButton: RadioButton,
	DateInput: DateInput
}

class FormBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
		let {fields} = this.props
		let validate = {}
		if(fields) {
			fields.forEach(f => {
				validate[f.id] = f.validate
			})
			this.setState({
				validate: validate
			})
		}
	}

	renderField(field) {
		let {component, id, name, props} = field
		let Component = COMPONENTS[component]
		if(Component) {
			return <Field name={id} label={name} component={Component} {...props} key={id} />
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
			<Form onSubmit={() => console.log('Submmitted')}>
				{fieldsComponent}
			</Form>
		)
	}
}

FormBuilder.propTypes = {
	fields: PropTypes.array.isRequired
}

const validate = (values, props) => {
	const errors = {}
	props.fields.forEach(f => {
		let error = errors[f.id] || [];
		errors[f.id] = error
		if(f.validate) {
			f.validate.forEach(v => {
				let parameters = v.parameters || [];
				let validateResult = Validator[v.func](values[f.id], ...parameters)
				if(validateResult !== null)
					error.push(validateResult);
			})
		}
		if(_.isEmpty(error)) {
			delete errors[f.id]
		}
	})

	return errors;
}

FormBuilder = reduxForm({
	form: 'formBuilder',
	validate
})(FormBuilder)

export default FormBuilder