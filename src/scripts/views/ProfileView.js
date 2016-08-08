import React from 'react'
import Backbone from 'backbone'
import {User} from '../models/models.js'
import ACTIONS from '../actions.js'
import Header from './Header.js'
import STORE from '../store.js'

const ProfileView = React.createClass({
	
	getInitialState(){
		return STORE.getData()
	},

	componentWillMount(){
		ACTIONS.fetchDrawings({
			user_email: User.getCurrentUser().email
		})
		STORE.on('updateContent', ()=> {
			this.setState(STORE.getData())
		})
	},

	componentWillUnmount(){
		STORE.off('updateContent')
		ACTIONS.clearDrawingModel()
	},

	render(){
		return (
			<div id="profileView">
				<Header />
				<ProfileInfo />
				<h1>Your drawings</h1>
				<YourDrawings yourDrawingCollection={this.state.drawingCollection} />
			</div>
			)
	}
})

const ProfileInfo = React.createClass({
	render(){
		return (
			<div id="profileInfo">
			</div>
			)
	}
})

const YourDrawings = React.createClass({
	render(){
		return (
			<div id="yourDrawings">
				{
					this.props.yourDrawingCollection.map((model)=>{
					return <Drawing yourDrawingModel={model} key={model.cid} />
					})
				}
			</div>
			)
	}
})


const Drawing = React.createClass({
	
	_handleClick(){
		location.hash = `drawing/detail/${this.props.yourDrawingModel.get('_id')}`
	},

	render(){
		return (
			<div onClick={this._handleClick} className="singleDrawing">
				<h3>{this.props.yourDrawingModel.get('title')}</h3>
				<img src={this.props.yourDrawingModel.get('imageUrl')} />
				<h4>artist: you</h4>
				<p>Likes: {this.props.yourDrawingModel.get('likes').length}</p>
			</div>
			)
	}
})




export default ProfileView