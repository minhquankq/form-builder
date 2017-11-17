import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {ActionCreators} from '../../actions'
import FromComponent from '../FormComponent'

const fields = [
  {
    "component": "Input",
    "id": "email",
    "name": "Email",
    "props": {
      "type": "email",
      "placeholder": "Enter an email"
    },
    "validate": [
      {
        "func": "require"
      }, {
        "func": "email"
      }, {
        "func": "minLength",
        "parameters": [10]
      }
    ]
  }, {
    "component": "Input",
    "id": "username",
    "name": "Username",
    "props": {
      "type": "text",
      "placeholder": "Enter username",
      "value": "vmquan"
    }
  }, {
    "component": "Input",
    "id": "password",
    "name": "Password",
    "props": {
      "type": "password",
      "placeholder": "Enter password"
    },
    "validate": [
      {
        "func": "require"
      }, {
        "func": "minLength",
        "parameters": [10]
      }
    ]
  }, {
    "component": "DateInput",
    "id": "brithday",
    "name": "Brithday",
    "props": {
      "renderTime": false
    }
  }, {
    "component": "DateInput",
    "id": "party_time",
    "name": "Party time",
    "props": {
      "renderTime": true
    }
  }, {
    "component": "RichText",
    "id": "content",
    "name": "Content",
    "props": {}
  }, {
    "component": "Attachment",
    "id": "attachment",
    "name": "Attachment",
    "props": {}
  }, {
    "component": "Input",
    "id": "description",
    "name": "Description",
    "props": {
      "type": "textarea",
      "placeholder": "Some information about you",
      "style": {
        "height": "200px"
      }
    }
  }, {
    "component": "Select",
    "id": "sex",
    "name": "Sex",
    "props": {
      "placeholder": "Select sex",
      "async": false,
      "options": [
        {
          "value": "male",
          "label": "Male"
        }, {
          "value": "female",
          "label": "Female"
        }
      ]
    }
  }, {
    "component": "Select",
    "id": "address",
    "name": "Address",
    "props": {
      "async": true,
      "multi": true,
      "url": "http://localhost:8088/address",
      "labelKey": "name",
      "valueKey": "id"
    }
  }, {
    "component": "CheckBox",
    "id": "isGay",
    "name": "Is gay?",
    "props": {
      "multiple": false
    }
  }, {
    "component": "CheckBox",
    "id": "language",
    "name": "Language",
    "props": {
      "multiple": true,
      "options": [
        {
          "value": "java",
          "label": "Java"
        }, {
          "value": "javascript",
          "label": "Javascript"
        }, {
          "value": "php",
          "label": "PHP"
        }
      ]
    }
  }, {
    "component": "RadioButton",
    "id": "country",
    "name": "Country",
    "props": {
      "options": [
        {
          "value": "vn",
          "label": "VietNam"
        }, {
          "value": "sing",
          "label": "Singapo"
        }, {
          "value": "thai",
          "label": "Thailand"
        }
      ]
    }
  }
]

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      data: {}
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    let {data} = this.props
    if (!_.isEmpty(data)) {
      this.setState({data: data})
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  renderContent() {
    return (
      <div>
        <FromComponent fields={fields} formId={'Create'}/>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Button outline color="info" onClick={this.toggle}>
          <i className="fa fa-plus" aria-hidden="true"></i>{' '}Create
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          backdrop="static"
          size="lg">
          <ModalHeader toggle={this.toggle}>
            <i className="fa fa-plus" aria-hidden="true"/>{' '}
            Create new
          </ModalHeader>
          <ModalBody>
            {/* Content will be here */}
            {this.renderContent()}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.handleSubmit}>OK</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Create.propTypes = {
  data: PropTypes.array
}

export default connect(state => {
  return {}
}, dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
  dispatch
}))(Create)