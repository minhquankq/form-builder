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
} from 'reactstrap';

import {ActionCreators} from '../../actions'
import FilterComponent from './FilterComponent';

let CONFIG = {"fields":[{"value":"ticket_id","name":"ID"},{"value":"title","name":"Title"},{"value":"description","name":"Description"},{"value":"status","name":"Status"},{"value":"ticket_category_code","name":"Category"},{"value":"product_info.alias","name":"Product"},{"value":"fid_info.name","name":"Fabric"},{"value":"requester","name":"Requester"},{"value":"priority_id","name":"Priority"},{"value":"source_from","name":"Source from"},{"value":"is_service_catalog_request","name":"Is Service Catelog Request"},{"value":"assigned_to.email","name":"Assignee"},{"value":"expected_at","name":"Expected At"},{"value":"created_at","name":"Created At"},{"value":"closed_at","name":"Closed At"}],"types":{"ticket_id":"String","title":"String","description":"String","status":"Array","ticket_category_code":"Array","product_info.alias":"String","fid_info.name":"String","requester":"String","priority_id":"Array","source_from":"String","is_service_catalog_request":"Boolean","assigned_to.email":"Array","expected_at":"Datetime","created_at":"Datetime","closed_at":"Datetime"},"operators":{"Datetime":["At","NotAt","Before","BeforeOrAt","After","AfterOrAt","InThePast","InTheFuture","Empty","NotEmpty"],"Array":["Includes","Excepts","Anything","Empty","NotEmpty"],"String":["Equals","NotEquals","Empty","NotEmpty","StartsWith","EndsWith","Contains","NotContains","Anything","Same","Different"],"Boolean":["IsTrue","IsFalse","Anything","Empty","NotEmpty"]},"allowInput":{"Datetime":["At","NotAt","Before","BeforeOrAt","After","AfterOrAt"],"Array":["Includes","Excepts"],"String":["Equals","NotEquals","StartsWith","EndsWith","Contains","NotContains","Same","Different"]}}
const dialogName = 'filter'
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

	renderContent() {
		let {data} = this.state;
    return (
      <div>
				{/* Content will be put here */}
				<FilterComponent 
					data={data} 
					onChange={d => this.setState({data: d})}
					simple={false}
					config={CONFIG}
					/>
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