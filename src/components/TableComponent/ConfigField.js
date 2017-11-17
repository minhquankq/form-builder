import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { 
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter, 
	Form, 
	FormGroup, 
	Label, 
	Input 
} from 'reactstrap';


export default class ConfigField extends Component {
	constructor(props) {
    super(props);
    this.state = {
			modal: false,
			data: {}
    };

		this.toggle = this.toggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	componentDidMount() {
		let {data} = this.props
		if(!_.isEmpty(data)) {
			this.setState({
				data: data
			})
		}
	}

  toggle() {
    this.setState({modal: !this.state.modal});
	}

	handleSubmit() {
		this.props.submit(this.state.data)
		this.toggle()
	}

	onChange(key, value) {
		let {data} = this.state
		data[key] = value
		this.setState(data);
	}
	
	renderContent() {
		if(!this.state.modal) return null;
		let {fields} = this.props
		let {data} = this.state
		console.log(data)
		let fieldsComponent = fields.map(f => {
			return (
				<FormGroup key={f.name}>
					<Label> 
						<Input type="checkbox" 
							value={data[f.name]}
							onChange={e => this.onChange(f.name, e.target.checked)}
							checked={data[f.name]}
							 />
							{f.label} 
					</Label>
				</FormGroup>
			)
		})
		return (
			<Form className="modal-form">
				{fieldsComponent}
			</Form>
		)
	}

  render() {
    return (
      <div>
        <Button outline color="info" onClick={this.toggle}>
					<i className="fa fa-eye" aria-hidden="true"></i>{' '}Display
				</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={'static'}>
          <ModalHeader toggle={this.toggle}><i className="fa fa-eye" aria-hidden="true"/> Display fields</ModalHeader>
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

ConfigField.propTypes = {
	fields: PropTypes.array.isRequired,
	submit: PropTypes.func.isRequired,
	data: PropTypes.array
}