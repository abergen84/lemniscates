import React from 'react'
import Backbone from 'backbone'
import {User} from '../models/models.js'
import ACTIONS from '../actions.js'
import Header from './Header.js'

const DrawingView = React.createClass({
	
	getInitialState: function(){
		return {
			selected: Array(2000).fill(false)
		}
	},

	componentWillMount(){
		Backbone.Events.on('paint', (i) => {
			this.setState({
				selected: this.state.selected.slice(0,i).concat([true]).concat(this.state.selected.slice(i+1))
			})
		})
	},

	render: function(){
		// console.log(this.state.selected.length)
		return (
			<div id="drawingView">
				<Header />
				<DrawingCanvas totalLength={this.state.selected.length} boxValues={this.state.selected} />
				<Toolbox />
				<SaveFeature />
			</div>
			)
	}
})

const DrawingCanvas = React.createClass({

	// getInitialState() {
	// 	return {
	// 		rows: this.props.totalLength/100
	// 	}
	// },

	// _populateRows: function(){
	// 	Array(this.state.rows).fill(true).map((x) => { 
	// 	<Row totalLength={this.props.totalLength} selected={this.props.boxValues} />
	// 	// console.log(x)
	// 	})
	// },

	// render: function(){
	// 	return (
	// 		<div id="canvas">
	// 			{
	// 				this._populateRows()
	// 			}
	// 		</div>
	// 	)
	// }

	_populateRows: function(){
		var rowsArray = []
		for(var i = 50; i <= this.props.totalLength; i+=50){
			rowsArray.push(<Row selected={this.props.boxValues} columnRange={[i-50,i]} key={i} />)
		}
		return rowsArray
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

	// getInitialState() {
	// 	return {
	// 		cols: this.props.totalLength/50
	// 	}
	// },

	// _populateBoxes: function(){
	// 	Array(this.state.cols).fill(true).map((x,i) => {
	// 		<Box selected={this.props.selected[i]} /> 
	// 		console.log(x)
	// 	})

	// },

	// render: function(){
	// 	// console.log(this.props.selected)
	// 	return (
	// 		<div className="row">
	// 		{
	// 			this._populateBoxes()	
	// 		}
	// 		</div>
	// 		)
	// }

	_createBoxes: function(){
		var columnBoxes = []
		for(var i = this.props.columnRange[0]; i < this.props.columnRange[1]; i++){
			var columnBox = <Box selected={this.props.selected[i]} myIndex={i} key={i} />
			// console.log(this.props.selected)
			columnBoxes.push(columnBox)
		}
		return columnBoxes

	},

	render: function(){
		// console.log(this.props.boxes)
		return (
			<div className="row">
				{this._createBoxes()}
			</div>
			)
	}
})

const Box = React.createClass({
	
	_colorBox: function() {
		Backbone.Events.trigger('paint', this.props.myIndex)
	},

	render: function(){
		// console.log(this.props.myIndex)
		var active = "box"
		if(this.props.selected){
			active = "box black"
		} 
		Backbone.Events.on('changeGreen', function(value){
			active = "box " + value
			// console.log(active)
		})
		return (
			<div className={active} onMouseEnter={this._colorBox} >
			</div>
			)
	}
})

const Toolbox = React.createClass({
	
	_changeColor: function(event){
		event.preventDefault()
		console.log(event.currentTarget.value)
		Backbone.Events.trigger('changeGreen', event.currentTarget.value)
	},

	render: function(){
		return (
			<div id="toolbox">
				<button onClick={this._changeColor} value="green">green</button>
			</div>
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