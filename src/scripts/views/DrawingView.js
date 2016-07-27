import React from 'react'
import Backbone from 'backbone'
import {User} from '../models/models.js'
import ACTIONS from '../actions.js'
import Header from './Header.js'

const DrawingView = React.createClass({

	selected: Array(2000).fill('white'),

	getInitialState: function(){
		return {
			painting: false,
			currentPaintingColor: 'black'
		}
	},

	componentWillMount(){

		Backbone.Events.on('paint',(boxFillObj) => {
			this.selected[boxFillObj.i] = boxFillObj.color  //why did it work when boxFillObj.fill was used?
			console.log(boxFillObj.i)
		})

		Backbone.Events.on('modifyAppState', (stateObj)=>{
			this.setState(stateObj)
		})
	},


	render: function(){
		// console.log(this.state.selected.length)
		console.log(this.state.painting)
		return (
			<div id="drawingView">
				<Header />
				<DrawingCanvas 
					totalLength={this.selected.length} 
					boxValues={this.selected} 
					painting={this.state.painting} 
					currentPaintingColor={this.state.currentPaintingColor} />
				<Toolbox />
				<SaveFeature />
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

			
		// console.log(this.state.painting)
	},


	_populateRows: function(){
		var rowsArray = []
		for(var i = 50; i <= this.props.totalLength; i+=50){
			rowsArray.push(<Row selected={this.props.boxValues} 
				boxValues={this.props.boxValues.slice(i-50,i)} 
				key={i}
				painting={this.props.painting}
				currentPaintingColor={this.props.currentPaintingColor} />)
		}
		return rowsArray
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
		return this.props.boxValues.map((val,i) => <Box 
			selected={this.props.boxValues[i]} 
			myIndex={i} 
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
			fill: '#fff'
		}
	},
	
	_colorBox: function() {
		if (this.props.painting) {
			this.setState({
				fill: this.props.currentPaintingColor //if painting, this needs to be this.props.currentPaintingColor
			})
			Backbone.Events.trigger('paint', {
				i: this.props.myIndex,
				color: this.state.fill
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
	
	render: function(){
		return (
			<div id="toolbox">
				{ ["#000000", //black 
				"#26A65B", // green (Eucalyptus)
				"#19B5FE", // blue (Dodger Blue)
				"#F22613", // red (Pomegranate)
				"#F9BF3B", // yellow (Saffron)
				"#F9690E", // orange (Ectasy)
				"#9A12B3", // purple (Seance)
				"#BFBFBF", // silver (Silver)
				"#FFFFFF"].map((colorVal)=>{return <PaletteColor bgColor={colorVal}/>}) }
			</div>
			)
	}
})

const PaletteColor = React.createClass({

	_changeColor: function(event){
		event.preventDefault()
		console.log(event.currentTarget.dataset)
		console.log(event.currentTarget.dataset.colorval) // 'data-' can be accessed via dataset on currentTarget
		Backbone.Events.trigger('modifyAppState', 
			{currentPaintingColor: event.currentTarget.dataset.colorval})
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
	render: function(){
		return (
			<div id="saveBox">
			<p>Ready to submit? Warning: no editing once submitted!</p>
				<form>
					<input type="text" placeholder="Name" />
					<button type="submit">Submit</button>
				</form>
			</div>
			)
	}
})










export default DrawingView