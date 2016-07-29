import React from 'react'
import Backbone from 'backbone'
import {User} from '../models/models.js'
import ACTIONS from '../actions.js'
import Header from './Header.js'
import STORE from '../store.js'

const DashboardView = React.createClass({
	
	getInitialState(){
		return STORE.getData()
	},

	componentWillMount: function(){
		ACTIONS.fetchDrawings()
		STORE.on('updateContent', ()=> {
			this.setState(
			STORE.getData()
			)
		})
	},

	componentWillUnmount: function(){
		STORE.off('updateContent')
	},

	render: function(){
		return (
			<div id="dashboardView">
				<Header />
				<Dashboard />
				<DrawingListing drawingCollection={this.state.drawingCollection} />
			</div>
			)
	}
})

const Dashboard = React.createClass({
	
	_getDate: function(){
		var dateObj = new Date()
		// console.log(dateObj.getUTCFullYear())
		var year = dateObj.getUTCFullYear()
		var month = dateObj.getUTCMonth() + 1
		var day = dateObj.getUTCDate()
		var newDate = `${month}/${day}/${year}`
		return newDate
	},

	render: function(){
		return (
			<div id="dashboard">
				<h3>{this._getDate()} theme: TBD</h3>
			</div>
			)
	}

})

const DrawingListing = React.createClass({
	render: function(){
		return (
			<div id="drawingListing">
				{this.props.drawingCollection.map((model)=> {
					return <Drawing drawModel={model} key={model.cid} />
				})}
			</div>
		)
	}
})

const Drawing = React.createClass({
	render: function(){
		return (
			<div className="drawing">
				<h5>{this.props.drawModel.get('title')}</h5>
			</div>
			)
	}
})

export default DashboardView