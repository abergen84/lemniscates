//Creating a row and col system the easy way:

//FOR ROWS

// getInitialState() {
	// 	return {
	// 		rows: 20
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


//FOR COLUMNS

	// getInitialState() {
	// 	return {
	// 		cols: 50
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