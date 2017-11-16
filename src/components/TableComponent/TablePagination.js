import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const SHOW_PAGE = 3;
export default class TablePagination extends Component {
	changePage(page) {
		this.props.handleChangePage(page)
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
			<div className="row">
				<div className="col-md-6">
					<Pagination>
						<PaginationItem disabled={page===1} onClick={this.changePage.bind(this, page-1)}>
							<PaginationLink previous href={'#/'+ (page -1)} />
						</PaginationItem>
						{this.renderMore(start !== 1)}
						{pageComponents}
						{this.renderMore(end !== total)}
						<PaginationItem disabled={page===total} onClick={this.changePage.bind(this, page + 1)}>
							<PaginationLink next href={'#/'+ (page +1)} />
						</PaginationItem>
					</Pagination>
				</div>
				<div className="col-md-6">
					<i>{page} / {total}</i>
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