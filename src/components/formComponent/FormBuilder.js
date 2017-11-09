import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
	Form,
	Alert
} from 'reactstrap'

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
			// data: {},
			validate: {}
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

	onValueChange(id, value) {
		let {data} = this.props;
		data[id] = value;
		// this.setState({data: data})
		this.props.updateData(data);
	}

	validateInput(id, value) {
		let validate = this.state.validate[id]
		let result = [];
		let error = this.state.error || {}
		if(validate) {
			validate.forEach(v => {
				let func = Validator[v.func]
				if(func) {
					let validateResult = null
					if(v.paramters) {
						validateResult = func(value, ...v.paramters)
					} else {
						validateResult = func(value)
					}
					
					if(validateResult) result.push(validateResult)
				}
			})
		}
		error[id] = result
		this.setState({
			error: error
		})
		return result;
	}

	renderField(field) {
		let {component, id, name, props} = field
		let {data} = this.props
		let Component = COMPONENTS[component]
		if(Component) {
			return <Component
								{...props}
								key={id}
								id={id}
								name={name}
								data={data}
								value={data[id]}
								validateInput={this.validateInput.bind(this)}
								onValueChange={this.onValueChange.bind(this)} 
								/>
		} else {
			return (
				<Alert color="warning" key={id}>
					The component {component} is not supported! Please contact <a href="https://www.facebook.com/minhquankq" className="alert-link">QuanVM3</a> with a cup of coffee to define.
				</Alert>
			)
		}
	}
	
	render() {
		let {fields} = this.props
		if(!fields) return null;
		let fieldsComponent = fields.map(f => this.renderField(f));
		return(
			<Form>
				{fieldsComponent}
			</Form>
		)
	}
}

FormBuilder.propTypes = {
	fields: PropTypes.array.isRequired,
	data: PropTypes.object.isRequired,
	updateData: PropTypes.func.isRequired
}

export default FormBuilder