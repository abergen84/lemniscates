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
		ACTIONS.fetchDrawings({
			url: '/api/drawingsByDate'
		})
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
	
	// _handleClick(){
	// 	ACTIONS.fetchDrawings({
	// 		url: '/api/drawingsByDate'
	// 	})
	// },

	render(){
		return (
			<div id="weekContainer">
				{/*<a href="#" onClick={this._handleClick }>{yesterday}</a>*/}
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
	render(){
		return (
			<div className="dateListing">
				<p>{this.props.model.get('title')}</p>
			</div>
			)
	}
})

export default ArchiveView