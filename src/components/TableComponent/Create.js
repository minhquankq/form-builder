import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {ActionCreators} from '../../actions'
import FromComponent from '../FormComponent'

const dialogName = 'create'
class Create extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openCreateForm = this.openCreateForm.bind(this);
  }

  toggle() {
    let {show, actions} = this.props;
    if(show) {
      actions.closeDialog(dialogName)
    } else {
      actions.showDialog(dialogName)
    }
  }

  openCreateForm() {
    let {fields, actions} = this.props
    if(_.isEmpty(fields)) {
      // TODO load fields by key whatever... maybe depend on url
      actions.loadFields("http://demo2002634.mockable.io/users/fields"); 
    }
    this.toggle();
  }

  handleSubmit() {
    let {url, data, actions} = this.props
    actions.create(url, data);
  }

  renderContent() {
    return (
      <div>
        <FromComponent fields={this.props.fields} formId={'Create'} mode={'CREATE'} />
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
        <Button outline color="info" onClick={this.openCreateForm}>
          <i className="fa fa-plus" aria-hidden="true"></i>{' '}Create
        </Button>
        <Modal
          isOpen={this.props.show}
          toggle={this.toggle}
          backdrop="static"
          size="lg">
          <ModalHeader toggle={this.toggle}>
            <i className="fa fa-plus" aria-hidden="true"/>{' '}
            Create new
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

Create.propTypes = {
  url: PropTypes.string
}

export default connect(state => {
  let isError = !_.isEmpty(_.get(state, 'form.Create.syncErrors')) || !_.isEmpty(_.get(state, 'form.Create.asyncErrors'))
    return {
      data: _.get(state, 'form.Create.values'),
      isError: isError,
      show: _.get(state, 'TableComponent.showDialog.' + dialogName, false),
      fields: _.get(state, 'FormComponent.fields', []),
      formLoading: _.get(state, 'FormComponent.formLoading', false)
    }
  },
  dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })
)(Create)