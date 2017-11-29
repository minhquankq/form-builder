import React from 'react'
import { Input } from 'reactstrap'
import Select from 'react-select'
import _ from 'lodash'
import ReactDateTime  from 'react-datetime'

export const String = (value, onChange, props) => {
	return <Input onChange={v => onChange(v.target.value)} type="text" value={value}/>
}

export const NumberLong = (value, onChange, props) => {
	return <Input onChange={v => onChange(v.target.value)} type="number" value={value}/>
}

export const Datetime = (value, onChange, props) => {
	return <ReactDateTime 
					onChange={(v) => onChange(v)}
					value={value} 
					closeOnSelect={true} 
					timeConstraints={{ minutes: { step: 5 }}}
					dateFormat="YYYY-MM-DD"
					{...props}
					/>;
}

export const Array = (value, onChange, props) => {
	if(_.get(props, 'isSync')) {
		return null;
	} else {
		return <Select
						name="value"
						{...props}
						onChange={(v) => onChange(v)}
						labelKey={'name'}
						valueKey={'value'}
						placeholder={'Select value'}
						value={value}
					/>
	}
}

// export const Boolean = (value, onChange, props) => {
// 	return <Select
// 					name="value"
// 					options={[{value: true, name: 'Yes'},{value: false, name: 'No'}]}
// 					onChange={(v) => onChange(v)}
// 					labelKey={'name'}
// 					valueKey={'value'}
// 					placeholder={'Select value'}
// 					value={value}
// 				/>
// }