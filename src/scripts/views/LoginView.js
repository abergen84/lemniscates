import React from 'react'
// import {User} from '../models/models.js'
import ACTIONS from '../actions.js'
import Header from './Header.js'

const LoginView = React.createClass({
	render: function(){
		return (
			<div id="loginView">
				<Header />
				<h1>lemniscates</h1>
				<h3>A picture is worth a thousand words..</h3>
				<h2>so get to drawing.</h2>
				<Login />
				<Register />
			</div>
			)
	}
})

const Login = React.createClass({

	getInitialState: function(){
		return {
			display: 'none'
		}
	},
	
	_handleLogin: function(event){
		event.preventDefault()
		ACTIONS.logInUser(event.currentTarget.email.value,event.currentTarget.password.value)
	},

	_toggleDisplay: function(){
		if(this.state.display === 'none'){
			this.setState({
				display: 'block'
			})
		} else {
			this.setState({
				display: 'none'
			})
		}
	},

	render: function(){
		var styleObj = {
			display: this.state.display
		}
		return (
			<div className="login credentials">
			<h3 onClick={this._toggleDisplay} >Log in</h3>
				<form onSubmit={this._handleLogin} style={styleObj} >
					<input type="text" name="email" placeholder="Enter e-mail" />
					<input type="password" name="password" placeholder="Enter password" />
					<button type="submit">Login</button>
				</form>
			</div>
			)
	}
})


const Register = React.createClass({

	getInitialState: function(){
		return {
			display: 'none'
		}
	},
	
	_handleRegister: function(event){
		event.preventDefault()
		console.log(event.currentTarget.email.value)
		ACTIONS.registerUser({
			name: event.currentTarget.username.value,
			email: event.currentTarget.email.value,
			password: event.currentTarget.password.value
		})

	},

	_toggleDisplay: function(){
		if(this.state.display === 'none'){
			this.setState({
				display: 'block'
			})
		} else {
			this.setState({
				display: 'none'
			})
		}
	},

	render: function(){
		var styleObj = {
			display: this.state.display
		}
		return (
			<div className="register credentials">
			<h3 onClick={this._toggleDisplay} >Register</h3>
				<form onSubmit={this._handleRegister} style={styleObj} >
					<input type="text" name="username" placeholder="Enter username" />
					<input type="text" name="email" placeholder="Enter e-mail" />
					<input type="password" name="password" placeholder="Enter password" />
					<button type="submit">Register</button>
				</form>
			</div>
			)
	}
})

export default LoginView