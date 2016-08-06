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
		var date = moment().startOf('day')
		var formattedDate = date.format("M-D-YYYY")
		return formattedDate
	},

	_getTheme: function(){
		return ACTIONS.getTheme(THEMES)
	},

	render: function(){
		let loginName
		if(User.getCurrentUser()){
			loginName = `Welcome back ${User.getCurrentUser().name}!`
		}
		return (
			<div id="dashboard">
					<p>{loginName}</p>
					<h3>Today's date: {this._getDate()}</h3>
					<h3>Today's theme: {this._getTheme()}</h3>
					<a href="#profile">Your profile</a>
					<a href="#drawing/create">Draw</a> 
					<a href="#archive">View past winners</a>
			</div>
			)
	}

})

const DrawingListing = React.createClass({
	render: function(){
		return (
			<div id="drawingListing">
				<h1>Latest submissions</h1>
				{this.props.drawingCollection.map((model)=> {
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
			<div className="drawing">
				<h3 onClick={this._goToDrawing} >{this.props.drawModel.get('title')}</h3>
				<img onClick={this._goToDrawing} src={this.props.drawModel.get('imageUrl')} />
				{/*<MiniDrawing drawModel={this.props.drawModel} />*/}
			</div>
			)
	}
})

export default DashboardView