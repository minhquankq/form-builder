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

const dialogName = 'filter'
let config = {"fields":[{"value":"ticket_id","name":"ID"},{"value":"title","name":"Title"},{"value":"description","name":"Description"},{"value":"status","name":"Status"},{"value":"ticket_category_code","name":"Category"},{"value":"product_info.alias","name":"Product"},{"value":"fid_info.name","name":"Fabric"},{"value":"requester","name":"Requester"},{"value":"priority_id","name":"Priority"},{"value":"source_from","name":"Source from"},{"value":"is_service_catalog_request","name":"Is Service Catelog Request"},{"value":"assigned_to.email","name":"Assignee"},{"value":"expected_at","name":"Expected At"},{"value":"created_at","name":"Created At"},{"value":"closed_at","name":"Closed At"}],"types":{"ticket_id":"String","title":"String","description":"String","status":"Array","ticket_category_code":"Array","product_info.alias":"String","fid_info.name":"String","requester":"String","priority_id":"Array","source_from":"String","is_service_catalog_request":"Boolean","assigned_to.email":"Array","expected_at":"Datetime","created_at":"Datetime","closed_at":"Datetime"},"operators":{"Datetime":["At","NotAt","Before","BeforeOrAt","After","AfterOrAt","InThePast","InTheFuture","Empty","NotEmpty"],"Boolean":["IsTrue","IsFalse","Anything","Empty","NotEmpty"],"String":["Equals","NotEquals","Empty","NotEmpty","StartsWith","EndsWith","Contains","NotContains","Anything","Same","Different"],"Array":["Includes","Excepts","Anything","Empty","NotEmpty"]},"allowInput":{"Datetime":["At","NotAt","Before","BeforeOrAt","After","AfterOrAt"],"String":["Equals","NotEquals","StartsWith","EndsWith","Contains","NotContains","Same","Different"],"Array":["Includes","Excepts"]}}
class Filter extends Component {
	constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
		this.openModal = this.openModal.bind(this);
		
		this.state = {
			data: {
							'$or': [{}]
						}
		}
	}

	componentDidMount() {
		let operators = config.operators
		for(let type in operators) {
			let arr = operators[type]
			operators[type] = arr.map(item => {
				return {
					value: item,
					name: item
				}
			})
		}
		config.operators = operators
	}

	toggle() {
    let {show, actions} = this.props;
    if(show) {
      actions.closeDialog(dialogName)
    } else {
      actions.showDialog(dialogName)
    }
	}
	
	openModal() {
    // let {config, actions} = this.props
    // if(_.isEmpty(config)) {
		// 	// TODO
    //   // actions.loadFilerConfig("http://demo2002634.mockable.io/users/fields"); 
    // }
    this.toggle();
	}
	
	handleSubmit() {
		console.log(this.state.data)
		// let {url, data, actions} = this.props
		// TODO
		// actions.filter(url, data);
		this.toggle();
	}

	handleChange(value, name, key) {
		let data = this.state.data
		let d = _.get(data, key)
		d[name] = value
		_.set(data, key, d)

		this.setState({
			data
		})
	}

	addMore(type, level, key) {
		let {data} = this.state
		if(level === 1) { // ingnore type
			let d = _.get(data, '$or')
			d.push({})
			_.set(data, '$or', d)
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
		
		this.setState({data})
	}

	removeFilter(key) {
		let {data} = this.state
		_.unset(data, key)

		let parentKey = _.dropRight(key)
		let parentData = _.get(data, parentKey)
		parentData = parentData.filter(d => !_.isUndefined(d))
		_.set(data, parentKey, parentData)
		
		this.setState({data})
	}

	renderValueInput(type, data, key) {
		let Component = null;
		switch(type) {
			case "String":
				Component = <Input
											value={data.value}
											onChange={(v) => this.handleChange(v.target.value, 'value', key)}
										/>
				break;
			case "Array":
				Component = <Select />
				break;
			case "Datetime":
				Component = <Datetime  />
				break;
			default:
		}
		return (
			<div>
				{Component}
				<FormText>Value</FormText>
			</div>
			
		);
	}

	renderFilterRow(data, key, level) {
		let {fields, types, operators} = config;
		let fieldName = _.get(data, 'field.value');
		let type = types[fieldName];
		return (
			<div className="row" key={key}>
				<div className="fields col-md-3">
					<Select
						name="fields"
						options={fields}
						onChange={(v) => this.handleChange(v, 'field', key)}
						labelKey={'name'}
						valueKey={'value'}
						placeholder={'Select field'}
						value={data.field}
					/>
					 <FormText>Choose fields</FormText>
				</div>
				<div className="operator col-md-3">
					<Select
						name="operator"
						options={operators[type]} // TODO
						onChange={(v) => this.handleChange(v && v.value, 'operator', key)}
						labelKey={'name'}
						valueKey={'value'}
						placeholder={'Select operator'}
						value={data.operator}
					/>
					 <FormText>Choose operator</FormText>
				</div>
				<div className="value col-md-3">
					{this.renderValueInput(type, data, key)}
				</div>
				<div className="filter-action-panel col-md-3">
					<Button outline color="info" onClick={this.addMore.bind(this, '$and', 2, key)}>And</Button>{' '}
					<Button outline color="info" onClick={this.addMore.bind(this, '$or', 2, key)}>Or</Button>{' '}
					<Button outline color="danger" onClick={this.removeFilter.bind(this, key)}><i className="fa fa-times" /></Button>
				</div>
			</div>
		)
	}

	renderFilter(data, key, level) {
		if(Array.isArray(data)) {
			// data is array
			let arrRowFilter = data.map((d, i) => this.renderFilter(d, _.concat(key, i), level));
			let labelClassName = 'condition-label '
			let filterClassName = 'filter-panel '
			if(data.length !== 1) {
				labelClassName += 'col-md-1'
				filterClassName += 'col-md-11'
			} else {
				filterClassName += 'col-md-12'
			}
			return (
				<div className="row" key={key}>
					<div className={labelClassName}>
						{data.length !== 1 && <span>{key[key.length -1]}</span>} 
					</div>
					<div className={filterClassName}>
						{arrRowFilter}
					</div>
				</div>
			)
		} else {
			// data is object
			if(!_.isEmpty(data['$or'])) {
				// data has key $or
				return this.renderFilter(data['$or'], _.concat(key,'$or'), level + 1)
			} else if(!_.isEmpty(data['$and'])) {
					// data has key $and
					return this.renderFilter(data['$and'], _.concat(key,'$and'), level + 1)
			} else {
				// data is filter row
				return this.renderFilterRow(data, key, level)
			}
		}
	}
	
	renderContent() {
		let {data} = this.state;
    return (
      <div>
				{/* Content will be put here */}
				{this.renderFilter(data['$or'], ['$or'], 1)}
      </div>
    )
	}
	
	renderLoading() {
    let {formLoading} = this.props
    if(formLoading) {
      return (
        <h2>Loading...</h2>
      )
    }
    return null;
  }
	
	render() {
		return (
      <div>
        <Button outline color="info" onClick={this.openModal}>
          <i className="fa fa-filter" aria-hidden="true"></i>{' '}Filter
        </Button>
        <Modal
          isOpen={this.props.show}
					toggle={this.toggle}
					className={"big-modal"}
          backdrop="static">
          <ModalHeader toggle={this.toggle}>
            <i className="fa fa-filter" aria-hidden="true"/>{' '}
            Filter
          </ModalHeader>
          <ModalBody>
            {/* Content will be here */}
            {this.renderLoading()}
            {this.renderContent()}
          </ModalBody>
          <ModalFooter>
            <Button color="success" disabled={this.props.isError} onClick={this.handleSubmit}>OK</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
	}
}

Filter.propTypes = {
	url: PropTypes.string
}

// TODO
export default connect(state => {
  // let isError = !_.isEmpty(_.get(state, 'form.Filter.syncErrors')) || !_.isEmpty(_.get(state, 'form.Filter.asyncErrors'))
    return {
      // data: _.get(state, 'form.Filter.values'),
      // isError: isError,
      show: _.get(state, 'TableComponent.showDialog.' + dialogName, false),
      // fields: _.get(state, 'FormComponent.fields', []),
      // formLoading: _.get(state, 'FormComponent.formLoading', false)
    }
  },
  dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })
)(Filter)