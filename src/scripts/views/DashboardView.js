import React from 'react'
import Backbone from 'backbone'
import {User} from '../models/models.js'
import ACTIONS from '../actions.js'
import Header from './Header.js'

const DashboardView = React.createClass({
	render: function(){
		return (
			<div id="dashboardView">
				<Header />
				<Dashboard />
				<DrawingListing />
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

			</div>
		)
	}
})

export default DashboardView