import React from 'react'
import _ from 'lodash'

const DEFAULT_TEMPLATE_NAME = 'defaultTemplate'
const renderValue = (value, isList) => {
	if (typeof(value) === 'object') {
		if(Array.isArray(value)) {
			// Array
			let itemComponent = value.map(v => renderValue(v, true));
			return (
				<ul>
					{itemComponent}
				</ul>
			)
		} else {
			// Object
			let itemComponent = _.keys(value).map(k => <li key={k}><strong>{k}</strong> {renderValue(value[k])}</li>)
			return (
				<ul key={Math.random()}>
					{itemComponent}
				</ul>
			) 
		}
	} else {
		if(isList) {
			return <li key={value}>{getValue(value)}</li>
		} else {
			return <span key={value}>{getValue(value)}</span>;
		}
	}
}

const getValue = (value) => {
	if(typeof(value) == 'boolean') {
		return value === true ? 'yes' : 'no'
	} else {
		return _.toString(value);
	}
}

const TEMPLATES = {
	defaultTemplate: (data, field) => {
		return renderValue(_.get(data, field.name));
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