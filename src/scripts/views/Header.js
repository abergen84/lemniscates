import React from 'react'
import ACTIONS from '../actions.js'
import {User} from '../models/models.js'

const Header = React.createClass({
	
	_logOut(){
		ACTIONS.logOutUser()
	},

	render: function(){
		let loginName
		if(User.getCurrentUser()){
			loginName = User.getCurrentUser().name
		}
		return (
			<header>
				<h1>lemniscates</h1>
				<p>{loginName}</p>
				<a href="#profile">Your profile</a>
				<a href="#drawing/create">Create Your Masterpiece!</a>
				<a href="#home">Home</a>
				<a href="#" onClick={this._logOut} >Logout</a>
			</header>
			)
	}
})

export default Header