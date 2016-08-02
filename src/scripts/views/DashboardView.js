import React from 'react'
import Backbone from 'backbone'
import {User} from '../models/models.js'
import ACTIONS from '../actions.js'
import Header from './Header.js'
import STORE from '../store.js'

const DashboardView = React.createClass({
	
	getInitialState(){
		return STORE.getData()
	},

	componentWillMount: function(){
		ACTIONS.fetchDrawings({
			url: '/api/drawings/'
		})
		STORE.on('updateContent', ()=> {
			this.setState(
			STORE.getData()
			)
		})
	},

	componentWillUnmount: function(){
		STORE.off('updateContent')
	},

	render: function(){
		return (
			<div id="dashboardView">
				<Header />
				<Dashboard />
				<DrawingListing drawingCollection={this.state.drawingCollection} />
			</div>
			)
	}
})

const Dashboard = React.createClass({
	
	_getDate: function(){
		var dateObj = new Date()
		// console.log(dateObj.getUTCFullYear())
		var year = dateObj.getUTCFullYear()
		var month = dateObj.getUTCMonth() + 1
		var day = dateObj.getUTCDate()
		var newDate = `${month}/${day}/${year}`
		return newDate
	},

	render: function(){
		return (
			<div id="dashboard">
				<h3>{this._getDate()} theme: TBD</h3>
			</div>
			)
	}

})

const DrawingListing = React.createClass({
	render: function(){
		return (
			<div id="drawingListing">
				{this.props.drawingCollection.map((model)=> {
					return <Drawing drawModel={model} key={model.cid} />
				})}
			</div>
		)
	}
})

const Drawing = React.createClass({
	
	_goToDrawing: function(){
		location.hash = `drawing/detail/${this.props.drawModel.get('_id')}`
	},

	render: function(){
		return (
			<div className="drawing">
				<h5 onClick={this._goToDrawing} >{this.props.drawModel.get('title')}</h5>
				<img src={this.props.drawModel.get('imageUrl')} />
				{/*<MiniDrawing drawModel={this.props.drawModel} />*/}
			</div>
			)
	}
})

// const MiniDrawing = React.createClass({
// 	_populateRows: function(){
// 		// console.log(this.props.matrix)
// 		return this.props.drawModel.get('boxValues').map((rowArray,i) => 
// 			<Row 													
// 				rowArray={rowArray}									
// 				rowIndex={i}
// 				key={i} />)
// 	},

// 	render: function(){
// 		return (
// 			<div id="canvas">
// 				{this._populateRows()}
// 			</div>
// 			)
// 		}
// })

// const Row = React.createClass({

// 	_createBoxes: function(){
// 		return this.props.rowArray.map((fill,i) => <Box 
// 			fill={fill} 
// 			colIndex={i}
// 			rowIndex={this.props.rowIndex}
// 			rowArray={this.props.rowArray}
// 			key={i} />)
// 	},

// 	render: function(){
// 		return (
// 			<div className="row">
// 				{this._createBoxes()}
// 			</div>
// 			)
// 	}
// })

// const Box = React.createClass({

// 	render: function(){

// 		let fillStyle = {
// 			background: this.props.fill
// 		}

// 		return (
// 			<div className="box" style={fillStyle}>
// 			</div>
// 			)
// 	}
// })

export default DashboardView