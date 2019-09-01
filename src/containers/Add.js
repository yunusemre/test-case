import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'
import { set, get } from '../utils'

class Add extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			url: '',
			id: null,
			count: 0
		}
	}
	goBack = () => this.props.history.goBack()

	onSubmit = (e) => {
		e.preventDefault()
		e.target.disabled = true
		this.saveDataToLocalStorage(this.state)
		toast.success(`${this.state.name} Add`)
		setTimeout(() => this.props.history.push('/'), 1000)
	}

	saveDataToLocalStorage(data) {
		const oldArray = get('data') || []
		const newArray = [data, ...oldArray]
		set('data', newArray)
	}

	OnChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value, id: Date.now() })
	}

	render() {
		return (
			<div className="container">
				<button className="btn btn-xs" onClick={this.goBack}>
					&laquo; List
				</button>
				<div className="container">
					<div className="width600">
						<h2>Add new link</h2>
						<div className="row mb-2">
							<div className="col">
								<form>
									<div className="form-group">
										<label>Name</label>
										<input type="name" required name="name" onChange={this.OnChange} className="form-control" placeholder="Enter name" />
									</div>
									<div className="form-group">
										<label>Url</label>
										<input type="url" required name="url" onChange={this.OnChange} className="form-control" placeholder="Url name" pattern="^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$" />
									</div>
									<div className="float-right">
										<button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Add</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<ToastContainer />
			</div>
		)
	}
}

export default Add
