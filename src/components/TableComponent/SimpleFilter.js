import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
	Collapse, 
	Button,
} from 'reactstrap';
import _ from 'lodash'

import FilterComponent from './FilterComponent';

const INIT_DATA = {'or': [{}]}
let CONFIG = {"fields":[{"value":"ticket_id","name":"ID"},{"value":"title","name":"Title"},{"value":"description","name":"Description"},{"value":"status","name":"Status"},{"value":"ticket_category_code","name":"Category"},{"value":"product_info.alias","name":"Product"},{"value":"fid_info.name","name":"Fabric"},{"value":"requester","name":"Requester"},{"value":"priority_id","name":"Priority"},{"value":"source_from","name":"Source from"},{"value":"is_service_catalog_request","name":"Is Service Catelog Request"},{"value":"assigned_to.email","name":"Assignee"},{"value":"expected_at","name":"Expected At"},{"value":"created_at","name":"Created At"},{"value":"closed_at","name":"Closed At"}],"types":{"ticket_id":"String","title":"String","description":"String","status":"Array","ticket_category_code":"Array","product_info.alias":"String","fid_info.name":"String","requester":"String","priority_id":"Array","source_from":"String","is_service_catalog_request":"Boolean","assigned_to.email":"Array","expected_at":"Datetime","created_at":"Datetime","closed_at":"Datetime"},"operators":{"Datetime":["At","NotAt","Before","BeforeOrAt","After","AfterOrAt","InThePast","InTheFuture","Empty","NotEmpty"],"Array":["Includes","Excepts","Anything","Empty","NotEmpty"],"String":["Equals","NotEquals","Empty","NotEmpty","StartsWith","EndsWith","Contains","NotContains","Anything","Same","Different"],"Boolean":["IsTrue","IsFalse","Anything","Empty","NotEmpty"]},"allowInput":{"Datetime":["At","NotAt","Before","BeforeOrAt","After","AfterOrAt"],"Array":["Includes","Excepts"],"String":["Equals","NotEquals","StartsWith","EndsWith","Contains","NotContains","Same","Different"]}}
export default class SimpleFilter extends Component {
	constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { 
			collapse: false,
			data: _.cloneDeep(INIT_DATA)
		};
  }

	toggle() {
    this.setState({ collapse: !this.state.collapse });
	}

	render() {
		let {data} = this.state;
		let collapseIcon = this.state.collapse ? 'fa fa-caret-down' : 'fa fa-caret-right'
		return (
			<div className="simple-filter-panel">
				<Button onClick={this.toggle} color="link">
					<i className={collapseIcon} aria-hidden="true" /> {' '}Filter
				</Button>
				<Collapse
          isOpen={this.state.collapse}
        >
					<FilterComponent 
						data={data} 
						onChange={d => this.setState({data: d})}
						simple={true}
						config={CONFIG}
						/>
					
					<Button color="link" onClick={()=>console.log(this.state.data)}><i className="fa fa-check" /></Button>
					<Button color="link" onClick={() => this.setState({data: _.cloneDeep(INIT_DATA)})}><i className="fa fa-times" style={{color: 'red'}} /></Button>
				</Collapse>
			</div>
		)
	}
}

SimpleFilter.propTypes = {
	
}