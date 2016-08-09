import React from 'react'
import Backbone from 'backbone'
import {User} from '../models/models.js'
import ACTIONS from '../actions.js'
import Header from './Header.js'
import STORE from '../store.js'
import moment from 'moment'
import {THEMES} from '../themes.js'

const DashboardView = React.createClass({
	
	getInitialState(){
		return STORE.getData()
	},

	componentWillMount: function(){
		var startDate = moment().startOf('day')
		var formattedStartDate = startDate.format("YYYY-M-D")
		console.log(formattedStartDate)
		var endDate = moment().startOf('day')
		var tomorrow = moment(endDate).add(1, 'days')
		var formattedEndDate = tomorrow.format("YYYY-M-D")
		console.log(formattedEndDate)

		ACTIONS.fetchDrawings()
		// {
		// 			'_QRY_dateRange-date': [ formattedStartDate,  formattedEndDate ]
		// 		}
		STORE.on('updateContent', ()=> {
			this.setState(
			STORE.getData()
			)
		})
	},

	componentWillUnmount: function(){
		STORE.off('updateContent')
		ACTIONS.clearDrawingCollection()
	},

	render: function(){
		return (
			<div id="dashboardView">
				<Header />
				<h1 id="dashboardTitle">lemniscates</h1>
				<Dashboard />
				<DrawingListing drawingCollection={this.state.drawingCollection} />
			</div>
			)
	}
})

const Dashboard = React.createClass({
	
	_getDate: function(){
		var date = moment().startOf('day')
		var formattedDate = date.format("M-D-YYYY")
		return formattedDate
	},

	// _getTheme: function(){
	// 	return ACTIONS.getTheme(THEMES)
	// },

	render: function(){
		let loginName
		if(User.getCurrentUser()){
			loginName = `Welcome back ${User.getCurrentUser().name}!`
		}
		return (
			<div id="dashboard">
					<p>{loginName}</p>
					<h3>Today's date: {this._getDate()}</h3>
					<a href="#profile">Your profile</a>
					<a href="#drawing/create">Draw something!</a> 
					<a href="#drawing/archive">View past winners</a>
			</div>
			)
	}

})

const DrawingListing = React.createClass({
	render: function(){
		return (
			<div id="drawingListing">
				<h1>Latest submissions</h1>
				{this.props.drawingCollection.models
					.sort((a,b)=>{return b.get('likes').length - a.get('likes').length})
					.map((model)=> {
					return <Drawing drawModel={model} key={model.cid} />
				})}
			</div>
		)
	}
})

const Drawing = React.createClass({
	
	_goToDrawing: function(){
		location.hash = `drawing/detail/${this.props.drawModel.get('_id')}`
	},

	render: function(){
		return (
			<div className="drawing" onClick={this._goToDrawing} >
				<h3>{this.props.drawModel.get('title')}</h3>
				<img src={this.props.drawModel.get('imageUrl')} />
				<h4>artist: {this.props.drawModel.get('name')}</h4>
				<h4 className="submitted">submitted: {this.props.drawModel.get('date').substr(0,10)}</h4>
				<p>Likes: {this.props.drawModel.get('likes').length}</p>
				<p className="comments">Comments: {this.props.drawModel.get('comment').length}</p>
			</div>
			)
	}
})

export default DashboardView