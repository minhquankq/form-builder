import React from 'react'
import _ from 'lodash'

const DEFAULT_TEMPLATE_NAME = 'defaultTemplate'
const getValue = (value, isList) => {
	if(typeof(value) === 'string') {
		if(isList) {
			return <li key={value}>{value}</li>
		} else {
			return <span key={value}>{value}</span>;
		}
	} else if (typeof(value) === 'object') {
		if(Array.isArray(value)) {
			// Array
			let itemComponent = value.map(v => this.renderValue(v, true));
			return (
				<ul>
					{itemComponent}
				</ul>
			)
		} else {
			// Object
			let itemComponent = _.keys(value).map(k => <li key={k}><strong>{k}</strong> {this.renderValue(value[k])}</li>)
			return (
				<ul key={Math.random()}>
					{itemComponent}
				</ul>
			) 
		}
	}
}
const TEMPLATES = {
	defaultTemplate: (data, field) => {
		return getValue(_.get(data, field.name));
	},
	
	plaintext: (data, field) => {
		return <div className="content" dangerouslySetInnerHTML={{__html: _.get(data, field.name)}}></div>;
	}
}

export default (data, field) => {
	let template = TEMPLATES[field.outputType];
	if(!template) {
		template = TEMPLATES[DEFAULT_TEMPLATE_NAME]
	}
	return template(data, field);
}