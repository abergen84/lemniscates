import React from 'react'
import Backbone from 'backbone'
import {User} from '../models/models.js'
import ACTIONS from '../actions.js'
import Header from './Header.js'
import STORE from '../store.js'
import toastr from 'toastr'
import moment from 'moment'

const ArchiveView = React.createClass({
	
	getInitialState(){
		return STORE.getData()
	},

	componentWillMount(){
		// _«keyword flag»_«queryTypeName»-«fieldInSchema»
		// ACTIONS.fetchDrawings({})
		STORE.on('updateContent', ()=>{
			this.setState(STORE.getData())
		})
	},

	componentWillUnmount(){
		STORE.off('updateContent')
	},

	render(){
		return (
			<div id="archiveView">
				<Header />
				<LastWeek />
				<DateListings drawingCollection={this.state.drawingCollection} />
			</div>
			)
	}
})

const LastWeek = React.createClass({
	
	_handleClick(event){
		event.preventDefault()
		var date = moment().startOf('day')
		var formattedDate = date.format("YYYY-M-D")
		var dynamicDate
		if(event.target.value === 'yesterday'){
			var yesterday = moment(date).subtract(1, 'days')
			dynamicDate = yesterday.format("YYYY-M-D")
			console.log('this should be yesterday', dynamicDate)
		} else if (event.target.value === 'week') {
			var week = moment(date).subtract(7, 'days')
			dynamicDate = week.format("YYYY-M-D")
			console.log('this should be a week ago', dynamicDate)
		} else if (event.target.value === 'month') {
			var month = moment(date).subtract(1, 'month')
			dynamicDate = month.format("YYYY-M-D")
			console.log('this should be a month ago', dynamicDate)
		}
		// _«keyword flag»_«queryTypeName»-«fieldInSchema»
		ACTIONS.fetchDrawings({
			'_QRY_dateRange-date': [ dynamicDate,  formattedDate ] //less than date, greater than date
		})							//'2016-7-31' (format)
	},

	render(){
		return (
			<div id="winnerContainer">
				<h2>Previous Winners</h2>
				<button value="yesterday" onClick={this._handleClick }>yesterday</button>
				<button value="week" onClick={this._handleClick}>week</button>
				<button value="month" onClick={this._handleClick}>month</button>
			</div>
			)
	}
})

const DateListings = React.createClass({
	render(){
		return (
			<div id="dateListings">
				{this.props.drawingCollection.map((model)=> {
					return <DateListing model={model} key={model.cid} />
				})}
			</div>
			)
	}
})

const DateListing = React.createClass({
	
	_handleClick(){
		location.hash = 'drawing/detail/' + this.props.model.get('_id')
	},

	render(){
		return (
			<div className="dateListing">
				<p onClick={this._handleClick} >{this.props.model.get('title')}</p>
				<img onClick={this._handleClick} src={this.props.model.get('imageUrl')} />
			</div>
			)
	}
})

export default ArchiveView