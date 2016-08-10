import React from 'react'
import Backbone from 'backbone'
import {User} from '../models/models.js'
import ACTIONS from '../actions.js'
import Header from './Header.js'
import {DrawingModel} from '../models/models.js'
import $ from 'jquery'
import toastr from 'toastr'


const DrawingView = React.createClass({

	matrix: Array(40).fill(null).map((val) => Array(50).fill('white')),

	getInitialState: function(){
		return {		
			painting: false,
			currentPaintingColor: '#000000',
			nuclearClear: true		
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
			console.log('top level clear state???',  this.state.nuclearClear)
			
			if (this.state.nuclearClear) {
				console.log('resetting nuclear clear....')
				this.setState({
					nuclearClear: false
				})
			}
		})

		Backbone.Events.on('modifyAppState', (stateObj)=>{
			this.setState(stateObj)
		})

		Backbone.Events.on('resetCanvas', ()=> {
			this.matrix = Array(40).fill(null).map((val) => Array(50).fill('white'))
			this.setState({
				nuclearClear: true,
			})
		})

		Backbone.Events.trigger('resetCanvas')


	},

	componentWillUnmount: function(){

		Backbone.Events.off('paint')
		Backbone.Events.off('modifyAppState')
		Backbone.Events.off('resetCanvas')

	},


	render: function(){
		// console.log('hellooooo')
		// console.log(this.state.painting)
		// console.log(typeof this.props.matrix)
		// console.log(this.matrix instanceof Array)
		// console.log(this.matrix)
		return (
			<div id="drawingView">
				<Header />
				<DrawingCanvas
					wasCleared={this.state.nuclearClear}
					totalLength={this.matrix.length} 
					matrix={this.matrix} 
					painting={this.state.painting} 
					currentPaintingColor={this.state.currentPaintingColor} />
				<Toolbox painting= {this.state.painting} currentPaintingColor={this.state.currentPaintingColor} />
				<SaveFeature matrix={this.matrix} />
			</div>
			)
	}
})

const DrawingCanvas = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
	  return true
	},

	_togglePainting: function(){
		let stateObj = {}

		if(!this.props.painting){
			console.log('PAINTING!!')
			stateObj.painting = true
			
		}  else {
			stateObj.painting = false
			console.log('NOT PAINTING!!')

		}

		Backbone.Events.trigger("modifyAppState", stateObj)

	},

	_populateRows: function(){
		return this.props.matrix.map((rowArray,i) =>
			<Row 
				wasCleared={this.props.wasCleared}
				rowArray={rowArray}
				rowIndex={i}
				key={i}
				painting={this.props.painting}
				currentPaintingColor={this.props.currentPaintingColor} />)
	},

	render: function(){
		return (
			<div id="canvasWrapper">
				<div id="canvas" onClick={this._togglePainting} >
					{this._populateRows()}
				</div>
			</div>
			)
		}
})

const Row = React.createClass({

	_createBoxes: function(){
		return this.props.rowArray.map((fill,i) => <Box 
			wasCleared={this.props.wasCleared}
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

	componentWillMount: function() {
		// React.initializeTouchEvents(true)
	},
	
	componentWillReceiveProps: function(newProps){
		if (newProps.wasCleared){
			this.setState({
				fill: newProps.fill
			})
		}

		// if (this.props.painting) {
		// 	this.setState({
		// 		fill: this.props.currentPaintingColor
		// 	})
		// }
		
	},

	_detectMobile: function(){
		
	if(navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)){
		return true
	}
	else {
		return false
	}


		// if(window.innerWidth <= 800 && window.innerHeight <= 600) {
		// 	return true
		// } else {
		// 	return false
		// }
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
		let div = this._detectMobile() ? <div style={styleObj} className="box" onTouchMove={this._colorBox} ></div> : <div style={styleObj} className="box" onMouseEnter={this._colorBox}></div>
		return div
		
	}
})

const Toolbox = React.createClass({
	
	_resetCanvas: function(){
		console.log('reset man!')
		Backbone.Events.trigger('resetCanvas')
	},

	render: function(){
		let paintbrush
		let paintStyle
		if(this.props.painting){
			paintbrush = 'brush on'
			paintStyle = {
				color: '#F7882F',
				fontWeight: '900',
			}
		} else {
			paintbrush = 'brush off'
		}
		return (
			<div id="toolbox">
			<div id="paintbrush">
				<span><p style={paintStyle}>{paintbrush}</p></span>
			</div>
			<button onClick={this._resetCanvas}>Reset</button>
				{ 
					[ "#000000", //black 
					"#26A65B", // green (Eucalyptus)
					"#AFE313", // lime (inchworm)
					"#9DE093", // granny smith apple
					"#19B5FE", // blue (Dodger Blue)
					"#6CDAE7", // turquoise blue 
					"#00468C", // midnight blue
					"#F22613", // red (Pomegranate)
					"#FE4C40", // sunset orange
					"#F9BF3B", // yellow (Saffron)
					"#FAFA37", // maxiumum yellow
					"#F9690E", // orange (Ectasy)
					"#9A12B3", // purple (Seance)
					"#FC74FD", // pink flamingo
					"#FF3399", // wild strawberry
					"#BFBFBF", // silver (Silver)
					"#87421F", // fuzzy wuzzy 
					"#FFCBA4", // peach
					"#DA8A67", // copper
					"#FFFFFF"].map((colorVal,i)=>{return <PaletteColor bgColor={colorVal} 
						active={colorVal === this.props.currentPaintingColor} 
						key={i} />}) 
				}
			</div>
			)
	}
})

const PaletteColor = React.createClass({
	
	_changeColor: function(event){
		event.preventDefault()
		// this.refs.color.className = 'active'
		// console.log(event.currentTarget.dataset.colorval) // 'data-' can be accessed via dataset on currentTarget
		Backbone.Events.trigger('modifyAppState', 
			{
				currentPaintingColor: event.currentTarget.dataset.colorval
			})
	},

	render: function(){

		const widthColor = this.props.active ? '40px' : '30px';
		const heightColor = this.props.active ? '40px' : '30px';
		let palletteStyle = {
			margin: "4px 4px", 
			width: widthColor, 
			height: heightColor, 
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
				imgData = canvas.toDataURL("image/jpeg", 0.1)

				ACTIONS.saveDrawing({
				title: self.storedTitle,
				boxValues: self.props.matrix,
				user_email: User.getCurrentUser().email,
				name: User.getCurrentUser().name,
				imageUrl: imgData
				})
			},
		})
			toastr.success('Drawing submitted!')
	},

	render: function(){
		return (
			<div id="saveBox">
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