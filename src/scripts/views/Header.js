import React from 'react'
import ACTIONS from '../actions.js'
import {User} from '../models/models.js'

const Header = React.createClass({
	
	_logOut(){
		ACTIONS.logOutUser()
	},

	render: function(){
		return (
			<header>
				<div id="navMenu">
					<a href="#home">Home</a>
					<a href="#profile">Profile</a>
					<a href="#drawing/create">Create Your Masterpiece!</a>
					<a href="#drawing/archive">Archive</a>
					<a href="#" onClick={this._logOut} >Logout</a>
				</div>
			</header>
			)
	}
})

export default Header