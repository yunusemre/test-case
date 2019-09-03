import React from 'react'
import { toast } from 'react-toastify'
import ItemList from '../components/ItemList'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import Remove from '../components/Remove'
import Pagination from '../components/Pagination'
import { set, get } from '../utils'

class Home extends React.Component {
	state = {
		page: 1,
		pageSize: 5,
		name: null,
		id: null,
		isRemove: false,
		pageOfItems: [],
		data: get('data') || []
	};

	options = [
		{ value: -1, label: 'Less Voted' },
		{ value: 1, label: 'Most Voted' }
	]

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
		this.setState({ data: getItem }, () => {
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
		const updatedList = this.state.data.map(member => member.id === id ?
			{ ...member, count: member.count + asc, timer: Date.now() } : member)
		updatedList.sort((a, b) => a.count == b.count ?
			(a.timer > b.timer ? b.timer - a.timer : null) : b.count - a.count)
		this.setState({ data: updatedList })
		set('data', updatedList)
	};

	render() {
		const { name, data, page, pageOfItems, pageSize } = this.state;
		return (
			<div className="container">
				<div className="width600">
					<div className="row mb-2 mt-2">
						<div className="col-3">
							<div className="point-box">
								<div className="counter">
									<Link to="/add">+</Link>
								</div>
							</div>
						</div>
						<div className="col-9">
							<h4 className="mt-4">Submit a link</h4>
						</div>
					</div>
					{
						data.length > 0 && 
						<Select
							options={this.options}
							className="mb-2"
							onChange={this.selectOrder}
						/>
					}
					<ItemList
						arr={pageOfItems}
						onRemove={this.isRemove}
						plus={this.Counter.bind(this, 1)}
						minus={this.Counter.bind(this, -1)}
					/>
					<Pagination
						items={data}
						initialPage={page}
						pageSize={pageSize}
						onChangePage={this.onChangePage}
					/>
					<Remove
						name={name}
						accept={this.onRemove}
						cancel={this.onCancel}
					/>
				</div>
			</div>
		);
	}
}

export default Home
