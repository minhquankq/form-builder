import React, {Component} from 'react'
import {Input, Button} from 'reactstrap'
import FormBuilder from '../components/formComponent/FormBuilder';

const fields = [
		{
				component: 'DateInput',
				id: 'brithday',
				name: 'Brithday',
				props: {}
		}, {
				component: 'Input',
				id: 'email',
				name: 'Email',
				props: {
						type: 'email',
						placeholder: 'Enter an email'
				},
				validate: [
						{
								func: "require"
						}, {
								func: "email"
						}, {
								func: "minLength",
								paramters: [10]
						}
				]
		}, {
				component: 'Input',
				id: 'name',
				name: 'Name',
				props: {
						type: 'text',
						placeholder: 'Enter username'
				}
		}, {
				component: 'Password',
				id: 'password',
				name: 'Password',
				props: {
						type: 'text',
						placeholder: 'Enter username'
				}
		}, {
				component: "Input",
				id: "description",
				name: "Description",
				props: {
						type: "textarea",
						placeholder: 'Some information about you',
						style: {
								"height": "200px",
						}
				}
		}, {
				component: 'Select',
				id: 'sex',
				name: 'Sex',
				props: {
						placeholder: 'Select sex',
						async: false,
						options: [
								{
										value: 'male',
										label: 'Male'
								}, {
										value: 'female',
										label: 'Female'
								}
						]
				}
		}, {
				component: 'Select',
				id: 'address',
				name: 'Address',
				props: {
						async: true,
						multi: true,
						url: 'http://localhost:8088/address',
						labelKey: 'name',
						valueKey: 'id'
				}
		}, {
				component: 'CheckBox',
				id: 'isGay',
				name: 'Is gay?',
				props: {
						multiple: false
				}
		}, {
				component: 'CheckBox',
				id: 'language',
				name: 'Language',
				props: {
						multiple: true,
						options: [
								{
										value: 'java',
										label: 'Java'
								}, {
										value: 'javascript',
										label: 'Javascript'
								}, {
										value: 'php',
										label: 'PHP'
								}
						]
				}
		}, {
				component: 'RadioButton',
				id: 'country',
				name: 'Country',
				props: {
						options: [
								{
										value: 'vn',
										label: 'VietNam'
								}, {
										value: 'sing',
										label: 'Singapo'
								}, {
										value: 'thai',
										label: 'Thailand'
								}
						]
				}
		}
]

export default class ExampleFormBuilder extends Component {

		constructor(props) {
				super(props);
				this.state = {
						fields: fields,
						configStr: '',
						data: {}
				}
		}

		componentDidMount() {
				this.setState({
						configStr: JSON.stringify(fields, null, 4)
				})
		}

		_reloadConfig() {
				try {
						let configFields = JSON.parse(this.state.configStr);
						this.setState({fields: configFields})
				} catch (e) {
						console.log(e)
				}
		}

		updateData(data) {
				this.setState({data: data})
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
														height: "650px"
												}}
														onChange={e => this.setState({configStr: e.target.value})}/>
												<Button
														color="primary"
														size="lg"
														block
														onClick={this
														._reloadConfig
														.bind(this)}>Reload configuration</Button>
										</div>
										<div className="col-md-4">
												<FormBuilder
														fields={this.state.fields}
														data={this.state.data}
														updateData={this
														.updateData
														.bind(this)}/>
										</div>
										<div className="col-md-4">
												<pre>{JSON.stringify(this.state.data, null, 2)}</pre>
										</div>

								</div>

						</div>
				)
		}
}