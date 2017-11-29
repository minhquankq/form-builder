import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
	Collapse, 
	Button,
} from 'reactstrap';

import FilterRow from './FilterRow';

export default class SimpleFilter extends Component {
	constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

	toggle() {
    this.setState({ collapse: !this.state.collapse });
	}

	render() {
		let collapseIcon = this.state.collapse ? 'fa fa-caret-down' : 'fa fa-caret-right'
		return (
			<div className="simple-filter-panel">
				<Button onClick={this.toggle} color="link">
					<i className={collapseIcon} aria-hidden="true" /> {' '}Filter
				</Button>
				<Collapse
          isOpen={this.state.collapse}
        >
					<FilterRow filterChange={filter => console.log(filter)}/>
					<Button color="link"><i className="fa fa-check" /></Button>
					<Button color="link"><i className="fa fa-times" style={{color: 'red'}} /></Button>
				</Collapse>
			</div>
		)
	}
}

SimpleFilter.propTypes = {
	
}