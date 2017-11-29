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

const dialogName = 'filter'
const OR = 'or'
const AND = 'and'
class AdvanceFilter extends Component {
	constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
		this.openModal = this.openModal.bind(this);
		
		this.state = {
			data: {
							'or': [{}]
						}
		}
	}

	componentDidMount() {

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

	handleChange(filter, key) {
		let data = this.state.data
		_.set(data, key, filter)

		this.setState({
			data
		})
	}

	addMore(type, level, key) {
		let {data} = this.state
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
		return (
			<div className="row" key={key}>
				<div className="col-md-9">
					<FilterRow data={data} filterChange={filter => this.handleChange(filter, key)}/>
				</div>
				<div className="filter-action-panel col-md-3">
					<Button outline color="info" onClick={this.addMore.bind(this, AND, 2, key)}>And</Button>{' '}
					<Button outline color="info" onClick={this.addMore.bind(this, OR, 2, key)}>Or</Button>{' '}
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
	
	renderContent() {
		let {data} = this.state;
    return (
      <div>
				{/* Content will be put here */}
				{this.renderFilter(data[OR], [OR], 1)}
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
          <i className="fa fa-filter" aria-hidden="true"></i>{' '}Advance Filter
        </Button>
				<Button outline color="info" onClick={this.openModal}>
          <i className="fa fa-eraser" aria-hidden="true"></i>{' '}Clear Filter
        </Button>
        <Modal
          isOpen={this.props.show}
					toggle={this.toggle}
					className={"big-modal"}
          backdrop="static">
          <ModalHeader toggle={this.toggle}>
            <i className="fa fa-filter" aria-hidden="true"/>{' '}
            Advance Filter
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

AdvanceFilter.propTypes = {
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
)(AdvanceFilter)