import React from 'react'
import Backbone from 'backbone'
import {User} from '../models/models.js'
import ACTIONS from '../actions.js'
import Header from './Header.js'
import STORE from '../store.js'
import toastr from 'toastr'

const SingleDrawingView = React.createClass({

	getInitialState(){
		return STORE.getData()
	},

	componentWillMount(){
		// console.log(this.matrix)
		// console.log(this.props.id)
		// console.log(this.state)
		// console.log(this.state.drawingModel)
		ACTIONS.fetchOneDrawing({
			url: '/api/drawing/' + this.props.id
		})
		STORE.on('updateContent', ()=> {
			// console.log(this.state.drawingModel.get('boxValues'))
			this.setState(
				STORE.getData()
				)
		})
	},

	componentWillUnmount(){
		STORE.off('updateContent')
		ACTIONS.clearDrawingModel()
	},

	render(){
		return (
			<div id="singleDrawingView">
				<Header />
				<h2>{this.state.drawingModel.get('title')}</h2>
				<p>by {this.state.drawingModel.get('name')}</p>
				<a id="backHome" href="#home">back home</a>
				<DrawingListing matrix={this.state.drawingModel} />
				<UserInteraction drawingModel={this.state.drawingModel} />
			</div>
			)
	}
})

const DrawingListing = React.createClass({
	
	_populateRows: function(){
		// console.log(this.props.matrix)
		return this.props.matrix.get('boxValues').map((rowArray,i) => //values arent back yet so it cant map, thus on drawing 
			<Row 													//model we put a default array so it can continue before
				rowArray={rowArray}									//data fetches
				rowIndex={i}
				key={i} />)
	},

	render: function(){
		return (
			<div id="canvas">
				{this._populateRows()}
			</div>
			)
		}
})

const Row = React.createClass({

	_createBoxes: function(){
		return this.props.rowArray.map((fill,i) => <Box 
			fill={fill} 
			colIndex={i}
			rowIndex={this.props.rowIndex}
			rowArray={this.props.rowArray}
			key={i} />)
	},

	render: function(){
		return (
			<div className="row">
				{this._createBoxes()}
			</div>
			)
	}
})

const Box = React.createClass({

	render: function(){
		// console.log(this.props.fill)

		let fillStyle = {
			background: this.props.fill
		}

		return (
			<div className="box" style={fillStyle}>
			</div>
			)
	}
})

const UserInteraction = React.createClass({
	
	_handleLike(){
		console.log('like button pressed')
		ACTIONS.addLike(this.props.drawingModel,User.getCurrentUser())
		toastr.info('Liked')
		// setTimeout(()=>{if(this.props.drawingModel.get('likes').indexOf(User.getCurrentUser()._id) > 0){
		// toastr.warning('Already liked this!')
		// }},500)
	},

	_handleDelete(){
		// ACTIONS.deleteDrawing(this.props.drawingModel.get('_id'))
		ACTIONS.deleteDrawing({
			url: '/api/drawing/' + this.props.drawingModel.get('_id')
		})
	},

	_handleComments(event){
		event.preventDefault()
		console.log('test')
		// ACTIONS.addComment({
		// 	// url: '/api/drawing/' + this.props.drawingModel.get('_id'),
		// 	comment: event.currentTarget.comment.value
		// })
		ACTIONS.addComment(this.props.drawingModel, event.currentTarget.comment.value, User.getCurrentUser().name)
		event.currentTarget.comment.value = ''
	},

	render(){
		let likeButton = 'Like this'
		console.log(this.props.drawingModel.get('likes'))
		console.log(this.props.drawingModel.get('likes').indexOf(User.getCurrentUser()._id) > 0)
		console.log(this.props.drawingModel)
		// 	likeButton = 'liked'
		let buttonStyle 
		if(User.getCurrentUser().email == this.props.drawingModel.get('user_email')){
			buttonStyle = {
				display: "inline-block",
			}
		} else {
			buttonStyle = {
				display: "none"
			}
		}
		return (
			<div id="userInteraction">
				<button onClick={this._handleLike} >{likeButton}</button>
				<span>{this.props.drawingModel.get('likes').length}</span>
				<button id="remove" onClick={this._handleDelete} style={buttonStyle} >Delete Drawing</button>
				<p>Leave a comment</p>
				<form onSubmit={this._handleComments}>
					<textarea type="text" name="comment" placeholder="comment" />
					<button type="submit">say it</button>
				</form>
				{this.props.drawingModel.get('comment').map((comment,i)=>{
					return <Comment drawingModel={this.props.drawingModel} comment={comment} key={i} />
				})}
			</div>
			)
	}
})

const Comment = React.createClass({
	render(){
		// <h5>{this.props.drawingModel.get('name')}</h5>
		return (
			<div className="comment">
				<p>{this.props.comment}</p>
			</div>
			)
	}
})


export default SingleDrawingView