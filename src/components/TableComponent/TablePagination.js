import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const SHOW_PAGE = 3;
const PAGES=[10,15,20,25,30]
export default class TablePagination extends Component {
	
	changePage(page) {
		this.props.handleChangePage(page)
	}

	changeNumPerPage(num) {
		this.props.onChangeNumPerPage(num)
	}

	renderMore(isRender) {
		if(isRender) {
			return (
				<PaginationItem disabled>
					<PaginationLink>...</PaginationLink>
				</PaginationItem>
			)
		}
		return null;
	}

	render() {
		let {page, total} = this.props
		let start = Math.max(page - SHOW_PAGE, 1)
		let end = Math.min(page + SHOW_PAGE, total)
		let pageComponents = [];
		for(let i = start; i <= end; i++) {
			pageComponents.push(
				<PaginationItem active={page===i} disabled={page===i} key={i} onClick={this.changePage.bind(this, i)}>
					<PaginationLink href={'#/'+ i}>{i}</PaginationLink>
				</PaginationItem>
			)
		}
		return (
			<div className="table-pagination">
				<div className="select-num-per-page">
					<Input type="select" 
						onChange={v => this.changeNumPerPage(v.target.value)}
						value={this.props.numPerpage}>
						{PAGES.map(p => <option value={p} key={p}>{p}</option>)}
					</Input>
				</div>
				<div className="pagination-bar">
					<Pagination>
						<PaginationItem disabled={page===1} onClick={this.changePage.bind(this, page-1)}>
							<PaginationLink previous href={'#/'+ page} />
						</PaginationItem>
						{this.renderMore(start !== 1)}
						{pageComponents}
						{this.renderMore(end !== total)}
						<PaginationItem disabled={page===total} onClick={this.changePage.bind(this, page + 1)}>
							<PaginationLink next href={'#/'+ page} />
						</PaginationItem>
					</Pagination>
				</div>
				
			</div>
		)
	}
}

TablePagination.propTypes = {
	total: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	handleChangePage: PropTypes.func.isRequired
}