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

const COMPONENTS = {
	Input: TextInput,
	Select: AutoComplete,
	CheckBox: CheckBox,
	RadioButton: RadioButton,
	DateInput: DateInput
}

class FromComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {

	}

	renderField(field) {
		let {component, id, name, props} = field
		let validates = field.validate.map(v => {
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
			<Form onSubmit={(e) => console.log('e')}>
				{fieldsComponent}
			</Form>
		)
	}
}

FromComponent.propTypes = {
	fields: PropTypes.array.isRequired
}

// const validate = (values, props) => {
// 	const errors = {}
// 	props.fields.forEach(f => {
// 		let error = errors[f.id] || [];
// 		errors[f.id] = error
// 		if(f.validate) {
// 			f.validate.forEach(v => {
// 				let parameters = v.parameters || [];
// 				let validateResult = Validator[v.func](values[f.id], ...parameters)
// 				if(validateResult !== null)
// 					error.push(validateResult);
// 			})
// 		}
// 		if(_.isEmpty(error)) {
// 			delete errors[f.id]
// 		}
// 	})

// 	return errors;
// }

function mapStateToProps(state, props) {
	let formId = props.formId || 'formBuilder'
	return {
			form: formId
	};
}

export default connect(mapStateToProps)(reduxForm(
																								{ 
																									enableReinitialize: true, 
																								})(FromComponent));