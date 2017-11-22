import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {ActionCreators} from '../../actions'
import FromComponent from '../FormComponent'

const dialogName = 'edit'
class Edit extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openEditForm = this.openEditForm.bind(this);
  }

  toggle() {
    let {show, actions} = this.props;
    if(show) {
      actions.closeDialog(dialogName)
    } else {
      actions.showDialog(dialogName)
    }
  }

  openEditForm() {
    let {fields, actions} = this.props
    if(_.isEmpty(fields)) {
      // TODO load fields by key whatever... maybe depend on url
      actions.loadFields("http://demo2002634.mockable.io/users/fields");
    }
    this.toggle();
  }

  handleSubmit() {
    let {url, data, actions} = this.props
    actions.edit(url, data);
  }

  renderContent() {
    return (
      <div>
        <FromComponent fields={this.props.fields} data={this.props.initData} formId={'Edit'} mode={'EDIT'} />
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
    let {error} = this.props
    let isError = !_.isEmpty(error);
    return (
      <div>
        <Modal
          isOpen={this.props.show}
          toggle={this.toggle}
          backdrop="static"
          size="lg">
          <ModalHeader toggle={this.toggle}>
            <i className="fa fa-plus" aria-hidden="true"/>{' '}
						Edit
          </ModalHeader>
          <ModalBody>
            {/* Content will be here */}
            {this.renderLoading()}
            {this.renderContent()}
          </ModalBody>
          <ModalFooter>
            <Button color="success" disabled={isError} onClick={this.handleSubmit}>OK</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Edit.propTypes = {
  url: PropTypes.string
}

export default connect(state => {
    return {
      error: _.get(state, 'form.Edit.syncErrors'),
      show: _.get(state, 'TableComponent.showDialog.' + dialogName, false),
      data: _.get(state, 'form.Edit.values'),
      fields: _.get(state, 'FormComponent.fields', []),
      initData: _.get(state, 'FormComponent.data'),
      formLoading: _.get(state, 'FormComponent.formLoading', false),
    }
  },
  dispatch => ({ actions: bindActionCreators(ActionCreators, dispatch), dispatch })
)(Edit)