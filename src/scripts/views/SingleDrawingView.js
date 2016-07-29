import React from 'react'
import Backbone from 'backbone'
import {User} from '../models/models.js'
import ACTIONS from '../actions.js'
import Header from './Header.js'
import STORE from '../store.js'

const SingleDrawingView = React.createClass({

	getInitialState(){
		return STORE.getData()
	},

	componentWillMount(){
		// console.log(this.matrix)
		console.log(this.props.id)
		console.log(this.state)
		console.log(this.state.drawingModel)
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

	render(){
		return (
			<div id="singleDrawingView">
				<Header />
				<DrawingListing matrix={this.state.drawingModel} />
			</div>
			)
	}
})

const DrawingListing = React.createClass({
	
	_populateRows: function(){
		console.log(this.props.matrix)
		return this.props.matrix.get('boxValues').map((rowArray,i) =>
			<Row 
				rowArray={rowArray}
				rowIndex={i}
				key={i} />)
	},

	render: function(){
		return (
			<div id="canvas" onClick={this._togglePainting} >
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


export default SingleDrawingView