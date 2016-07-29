import React from 'react'

const Header = React.createClass({
	render: function(){
		return (
			<header>
				<h1>lemniscates</h1>
				<a href="#drawing/create">Create Your Masterpiece!</a>
				<a href="#home">Home</a>
			</header>
			)
	}
})

export default Header