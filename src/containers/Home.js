import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'
import ItemList from '../components/ItemList'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import Remove from '../components/Remove'
import Pagination from '../components/Pagination'
import 'react-toastify/dist/ReactToastify.css'
import { set, get } from '../utils'

class Home extends React.Component {
	state = {
		page: 1,
		pageSize: 5,
		name: null,
		id: null,
		isRemove: false,
		options: [
			{ value: -1, label: 'Less Voted' },
			{ value: 1, label: 'Most Voted' }
		],
		pageOfItems: [],
		data: get('data') || []
	};

	onChangePage = (pageOfItems, page) => {
		this.setState({ pageOfItems, page })
	}

	isRemove = (res) => {
		this.setState({ name: res.name, id: res.id })
	}

	onCancel = () => {
		this.setState({ name: null })
	}

	onRemove = () => {
		const oldArray = get('data')
		const newArr = oldArray.filter(res => res.id != this.state.id)
		set('data', newArr)
		const getItem = get('data')
		this.setState({ data: getItem, isRemove: true }, () => {
			toast.success(`${this.state.name} Silindi`)
			this.setState({ name: null })
		})
	}

	selectOrder = (e) => {
		const { value } = e
		let itemsCopy = this.state.data.slice()
		itemsCopy.sort((a, b) => {
			if (value == 1) return b.count - a.count
			if (value == -1) return a.count - b.count
		})
		set('data', itemsCopy)
		this.setState({ data: itemsCopy })
	}

	Counter = (asc, id) => {
		const updatedList = this.state.data.map(member => {
			if (member.id === id) {
				return { ...member, count: member.count + asc, timer: Date.now() };
			} else {
				return member;
			}
		});
		updatedList.sort((a, b) => {
			if (a.count == b.count) {
				if (a.timer > b.timer) {
					return b.timer - a.timer
				}
			}
			return b.count - a.count
		})
		this.setState({ data: updatedList })
		set('data', updatedList)
	};

	render() {
		return (
			<div className="container">
				<div className="width600">
					<div className="row mb-2 mt-2">
						<div className="col-3">
							<div className="point-box">
								<section className="counter">
									<Link to="/add">+</Link>
								</section>
							</div>
						</div>
						<div className="col-9">
							<h4 className="mt-4">Submit a link</h4>
						</div>
					</div>
					<Select
						options={this.state.options}
						className="mb-2"
						onChange={this.selectOrder}
					/>
					{this.state.data.length === 0 &&
						<div className="alert alert-info">You do not have any data</div>
					}
					<hr />
					<ItemList
						arr={this.state.pageOfItems}
						onRemove={this.isRemove}
						Up={this.Counter.bind(this, 1)}
						Down={this.Counter.bind(this, -1)}
					/>
					<Pagination
						items={this.state.data}
						initialPage={this.state.page}
						pageSize={this.state.pageSize}
						onChangePage={this.onChangePage}
					/>

					{
						this.state.name != null &&
						<Remove
							name={this.state.name}
							ok={this.onRemove}
							cancel={this.onCancel}
						/>
					}
				</div>
				<ToastContainer />
			</div>
		);
	}
}

Home.defaultProps = {
	data: [],
	pageOfItems: []
}

Home.propTypes = {
	data: PropTypes.array.isRequired,
	pageOfItems: PropTypes.array.isRequired
}

export default Home
