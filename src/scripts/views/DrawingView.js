import React from 'react'
import Backbone from 'backbone'
import {User} from '../models/models.js'
import ACTIONS from '../actions.js'
import Header from './Header.js'
import {DrawingModel} from '../models/models.js'
import $ from 'jquery'


const DrawingView = React.createClass({

	matrix: Array(40).fill(null).map((val) => Array(50).fill('white')),

	getInitialState: function(){
		return {
			painting: false,
			currentPaintingColor: 'black'
		}
	},

	componentWillMount(){
		window.matrix = this.matrix
		//this listener will pick up on the paint color on the Box component, placing it on the 
		//matrix: Array(2000) at the top of this component for its fill color
		Backbone.Events.on('paint',(boxFillObj) => {     //put this on the store.js
			let row = boxFillObj.rowIndex,
				col = boxFillObj.colIndex

			this.matrix[row][col] = boxFillObj.fill
			// console.log(this.matrix)
			// console.log(this.matrix[boxFillObj.i])
			// console.log(this.matrix)
		})

		Backbone.Events.on('modifyAppState', (stateObj)=>{
			this.setState(stateObj)
		})

		// Backbone.Events.on('resetCanvas', ()=> {
		// 	this.matrix = Array(40).fill(null).map((val) => Array(50).fill('white'))
		// 	// return this.matrix
		// 	console.log(this.matrix)
		// })
	},

	componentWillUnmount: function(){
		Backbone.Events.off('paint')
		Backbone.Events.off('modifyAppState')
	},


	render: function(){
		console.log('hellooooo')
		console.log(this.state.painting)
		// console.log(typeof this.props.matrix)
		// console.log(this.matrix instanceof Array)
		// console.log(this.matrix)
		return (
			<div id="drawingView">
				<Header />
				<DrawingCanvas 
					totalLength={this.matrix.length} 
					matrix={this.matrix} 
					painting={this.state.painting} 
					currentPaintingColor={this.state.currentPaintingColor} />
				<Toolbox />
				<SaveFeature matrix={this.matrix} />
			</div>
			)
	}
})

const DrawingCanvas = React.createClass({

	_togglePainting: function(){
		console.log('PAINTING!!')
		let stateObj = {}

		if(!this.props.painting){
			stateObj.painting = true
			
		}  else {
			stateObj.painting = false

		}

		Backbone.Events.trigger("modifyAppState", stateObj)

	},

	_populateRows: function(){
		return this.props.matrix.map((rowArray,i) =>
			<Row 
				rowArray={rowArray}
				rowIndex={i}
				key={i}
				painting={this.props.painting}
				currentPaintingColor={this.props.currentPaintingColor} />)
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
			key={i}
			painting={this.props.painting}
			currentPaintingColor={this.props.currentPaintingColor} />)
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

	getInitialState: function() {
		return {
			fill: 'white'
		}
	},
	
	_colorBox: function() {
		if (this.props.painting) {
			this.setState({
				fill: this.props.currentPaintingColor
			})
			Backbone.Events.trigger('paint', {    //put this on actions.js
				rowIndex: this.props.rowIndex, 
				colIndex: this.props.colIndex,
				fill: this.props.currentPaintingColor 
			})
		}
	},

	render: function(){
		let styleObj = {
			background: this.state.fill
		}
		return (
			<div style={styleObj} className="box" onMouseEnter={this._colorBox} >
			</div>
			)
	}
})

const Toolbox = React.createClass({
	
	_resetCanvas: function(){
		console.log('reset man!')
		Backbone.Events.trigger('resetCanvas')
	},

	render: function(){
		return (
			<div id="toolbox">
			<button onClick={this._resetCanvas}>Reset Canvas</button>
				{ ["#000000", //black 
				"#26A65B", // green (Eucalyptus)
				"#19B5FE", // blue (Dodger Blue)
				"#F22613", // red (Pomegranate)
				"#F9BF3B", // yellow (Saffron)
				"#F9690E", // orange (Ectasy)
				"#9A12B3", // purple (Seance)
				"#BFBFBF", // silver (Silver)
				"#FFFFFF"].map((colorVal,i)=>{return <PaletteColor bgColor={colorVal} key={i} />}) }
			</div>
			)
	}
})

const PaletteColor = React.createClass({

	_changeColor: function(event){
		event.preventDefault()
		// console.log(event.currentTarget.dataset.colorval) // 'data-' can be accessed via dataset on currentTarget
		Backbone.Events.trigger('modifyAppState', 
			{
				currentPaintingColor: event.currentTarget.dataset.colorval
			})
	},

	render: function(){
		let palletteStyle = {
			margin: "4px 4px", 
			width: '30px', 
			height: '30px', 
			borderRadius: "50%", 
			border: "1px solid black",
			display: 'inline-block', 
			background: this.props.bgColor
		}
		return (
			<span onClick={this._changeColor} 
			data-colorval={this.props.bgColor} 
			style={palletteStyle}></span>
			)
	}
})

const SaveFeature = React.createClass({

	storedTitle: null,
	
	_saveDrawing: function(e){
		e.preventDefault()
		this.storedTitle = e.currentTarget.title.value
		console.log(User.getCurrentUser().email)
		var self = this

			html2canvas(document.querySelector('#canvas'), {
			onrendered: function(canvas){
				var imgData = ''
				imgData = canvas.toDataURL("image/jpeg", 0.5)
				// console.log(imgData)

				ACTIONS.saveDrawing({
				title: self.storedTitle,
				boxValues: self.props.matrix,
				user_email: User.getCurrentUser().email,
				name: User.getCurrentUser().name,
				imageUrl: imgData
				})
			},
			// logging: true
		})

			// ACTIONS.saveDrawing({
			// title: e.currentTarget.title.value,
			// boxValues: this.props.matrix,
			// user_email: User.getCurrentUser().email,
			// name: User.getCurrentUser().name,
			// imageUrl: imgData
			// })
	},

	render: function(){
		return (
			<div id="saveBox">
			{/*<button onClick={this._toCanvas}>make canvas</button>*/}
			<p>Ready to submit? Warning: no editing once submitted!</p>
				<form onSubmit={this._saveDrawing}>
					<input type="text" name="title" placeholder="Name" />
					<button type="submit">Submit</button>
				</form>
			</div>
			)
	}
})




export default DrawingView