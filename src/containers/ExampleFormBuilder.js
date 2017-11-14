import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Input, Button} from 'reactstrap'
import FormBuilder from '../components/formComponent/FormBuilder';
import _ from 'lodash'

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
      },
      {
        "func": "email"
      },
      {
        "func": "minLength",
        "parameters": [
          10
        ]
      }
    ]
  },
  {
    "component": "Input",
    "id": "username",
    "name": "Username",
    "props": {
      "type": "text",
      "placeholder": "Enter username",
      "value": "vmquan"
    }
  },
  {
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
      },
      {
        "func": "minLength",
        "parameters": [
          10
        ]
      }
    ]
	},
	{
    "component": "DateInput",
    "id": "brithday",
    "name": "Brithday",
    "props": {
      "renderTime": false
    }
  },
  {
    "component": "DateInput",
    "id": "party_time",
    "name": "Party time",
    "props": {
      "renderTime": true
    }
  },
  {
    "component": "RichText",
    "id": "content",
    "name": "Content",
    "props": {}
  },
  {
    "component": "Attachment",
    "id": "attachment",
    "name": "Attachment",
    "props": {}
  },
  {
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
  },
  {
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
        },
        {
          "value": "female",
          "label": "Female"
        }
      ]
    }
  },
  {
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
  },
  {
    "component": "CheckBox",
    "id": "isGay",
    "name": "Is gay?",
    "props": {
      "multiple": false
    }
  },
  {
    "component": "CheckBox",
    "id": "language",
    "name": "Language",
    "props": {
      "multiple": true,
      "options": [
        {
          "value": "java",
          "label": "Java"
        },
        {
          "value": "javascript",
          "label": "Javascript"
        },
        {
          "value": "php",
          "label": "PHP"
        }
      ]
    }
  },
  {
    "component": "RadioButton",
    "id": "country",
    "name": "Country",
    "props": {
      "options": [
        {
          "value": "vn",
          "label": "VietNam"
        },
        {
          "value": "sing",
          "label": "Singapo"
        },
        {
          "value": "thai",
          "label": "Thailand"
        }
      ]
    }
  }
]

class ExampleFormBuilder extends Component {

		constructor(props) {
				super(props);
				this.state = {
						fields: fields,
						configStr: ''
				}
		}

		componentDidMount() {
				this.setState({
						configStr: JSON.stringify(fields, null, 4)
				})
		}

		reloadConfig() {
				try {
						let configFields = JSON.parse(this.state.configStr);
						this.setState({fields: configFields})
				} catch (e) {
						console.log(e)
				}
		}

		render() {
				return (
						<div>
								<div className="row">
										<div className="col-md-4">
												<Input
														type="textarea"
														value={this.state.configStr}
														style={{
														height: "425px"
												}}
														onChange={e => this.setState({configStr: e.target.value})}/>
												<Button
														color="primary"
														size="lg"
														block
														onClick={this
														.reloadConfig
														.bind(this)}>Reload configuration</Button>
										</div>
										<div className="col-md-4 scrollbar">
												<FormBuilder fields={this.state.fields} formId={'ExampleForm'}/>
										</div>
										<div className="col-md-4">
												<pre>{JSON.stringify(this.props.data, null, 2)}</pre>
										</div>

								</div>

						</div>
				)
		}
}

const mapStateToProps = state => {
  return {
    data: _.get(state, 'form.ExampleForm.values')
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

ExampleFormBuilder = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleFormBuilder)

export default ExampleFormBuilder