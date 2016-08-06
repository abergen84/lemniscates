import React from 'react'
import {User} from '../models/models.js'
import ACTIONS from '../actions.js'
import Header from './Header.js'

const HomeView = React.createClass({
	render: function(){
		return (
			<div id="homeView">
				<Header />
				<Home />
			</div>
			)
	}
})

const Home = React.createClass({
	render(){
		return (
			<div id="mainBox">
				<h3>A picture is worth a thousand words..</h3>
				<h4>so get to drawing.</h4>
				<div id="registerOrLogin">
					<a href="#login">Sign Up</a>
					<a href="#login">Register</a>
				</div>
			</div>
			)
	}
})


export default HomeView