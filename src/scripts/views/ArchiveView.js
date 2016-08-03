import React from 'react'
import Backbone from 'backbone'
import {User} from '../models/models.js'
import ACTIONS from '../actions.js'
import Header from './Header.js'
import STORE from '../store.js'
import toastr from 'toastr'

const ArchiveView = React.createClass({
	
	getInitialState(){
		return STORE.getData()
	},

	componentWillMount(){
		// _«keyword flag»_«queryTypeName»-«fieldInSchema»
		ACTIONS.fetchDrawings({})
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
		console.log(event.target.value)
		var date = new Date()
		var year = date.getUTCFullYear()
		var month = date.getUTCMonth() + 1
		var day = date.getUTCDate()
		// if(event.target.value === 'yesterday'){
		var yesterdayDay = date.getUTCDate() - 1
		// }
		console.log(date)
		var yesterdayDate = `${year}-${month}-${yesterdayDay}`
		console.log('yesterday', yesterdayDate)
		var todayDate = `${year}-${month}-${day}`
		console.log('today', todayDate)
		// _«keyword flag»_«queryTypeName»-«fieldInSchema»
		ACTIONS.fetchDrawings({
			'_QRY_dateRange-date': [ yesterdayDate,  todayDate ] //less than date, greater than date
		})							//'2016-7-31' (format)
	},

	render(){
		return (
			<div id="winnerContainer">
				<h2>Previous Winners</h2>
				<button value="yesterday" onClick={this._handleClick }>yesterday</button>
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