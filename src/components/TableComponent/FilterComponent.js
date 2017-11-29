import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter, 
	FormText,
	Input
} from 'reactstrap';
import Select from 'react-select';
import Datetime from 'react-datetime'

import {ActionCreators} from '../../actions'
import FilterRow from './FilterRow';

const OR = 'or'
const AND = 'and'

export default class FilterComponent extends Component {
	constructor(props) {
    super(props);
	}

	handleChange(filter, key) {
		let data = this.props.data
		_.set(data, key, filter)

		this.props.onChange(data);
	}

	addMore(type, level, key) {
		let {data} = this.props
		if(level === 1) { // ingnore type
			let d = _.get(data, OR)
			d.push({})
			_.set(data, OR, d)
		} else {
			let parent = key[key.length -2]
			if(type === parent) {
				let parentKey = _.dropRight(key)
				let d = _.get(data, parentKey)
				d.push({})
				_.set(data, parentKey, d)
			} else {
				let d = _.get(data, key)
				let _d = {}
				_d[type] = [d, {}]
				_.set(data, key, _d)
			}
		}
		
		this.props.onChange(data);
	}

	removeFilter(key) {
		let {data} = this.props
		_.unset(data, key)

		let parentKey = _.dropRight(key)
		let parentData = _.get(data, parentKey)
		parentData = parentData.filter(d => !_.isUndefined(d))
		_.set(data, parentKey, parentData)
		
		this.props.onChange(data);
	}

	renderFilterRow(data, key, level) {
		let {simple} = this.props
		return (
			<div className="row" key={key}>
				<div className="col-md-9">
					<FilterRow 
						data={data} 
						filterChange={filter => this.handleChange(filter, key)} 
						config={this.props.config}/>
				</div>
				<div className="filter-action-panel col-md-3">
					<Button outline color="info" onClick={this.addMore.bind(this, AND, 2, key)}>And</Button>{' '}
					{!simple && <Button outline color="info" onClick={this.addMore.bind(this, OR, 2, key)}>Or</Button>} {' '}
					<Button outline color="danger" onClick={this.removeFilter.bind(this, key)}><i className="fa fa-times" /></Button>
				</div>
			</div>
		)
	}

	renderFilter(data, key, level) {
		let {simple} = this.props
		if(Array.isArray(data)) {
			// data is array
			let arrRowFilter = data.map((d, i) => this.renderFilter(d, _.concat(key, i), level));
			let labelClassName = 'condition-label '
			let filterClassName = 'filter-panel '
			if(data.length !== 1 && simple !== true) {
				labelClassName += 'col-md-1'
				filterClassName += 'col-md-11'
			} else {
				filterClassName += 'col-md-12'
			}
			return (
				<div className="row" key={key}>
					{!simple && <div className={labelClassName}>
						{data.length !== 1 && <span>{key[key.length -1]}</span>} 
					</div>}
					<div className={filterClassName}>
						{arrRowFilter}
					</div>
				</div>
			)
		} else {
			// data is object
			if(!_.isEmpty(data[OR])) {
				// data has key $or
				return this.renderFilter(data[OR], _.concat(key,OR), level + 1)
			} else if(!_.isEmpty(data[AND])) {
					// data has key $and
					return this.renderFilter(data[AND], _.concat(key,AND), level + 1)
			} else {
				// data is filter row
				return this.renderFilterRow(data, key, level)
			}
		}
	}

	render() {
		let {data} = this.props;
    return (
      <div>
				{/* Content will be put here */}
				{this.renderFilter(data[OR], [OR], 1)}
      </div>
    )
	}
}

FilterComponent.propTypes = {
	config: PropTypes.object
}