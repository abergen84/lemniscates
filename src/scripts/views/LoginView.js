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
				<Login />
				<Register />
			</div>
			)
	}
})

const Login = React.createClass({
	
	_handleLogin: function(event){
		event.preventDefault()
		ACTIONS.logInUser(event.currentTarget.email.value,event.currentTarget.password.value)
	},

	render: function(){
		return (
			<div className="login credentials">
			<h3>Log in</h3>
				<form onSubmit={this._handleLogin}>
					<input type="text" name="email" placeholder="Enter e-mail" />
					<input type="password" name="password" placeholder="Enter password" />
					<button type="submit">Login</button>
				</form>
			</div>
			)
	}
})


const Register = React.createClass({
	
	_handleRegister: function(event){
		event.preventDefault()
		console.log(event.currentTarget.email.value)
		ACTIONS.registerUser({
			name: event.currentTarget.username.value,
			email: event.currentTarget.email.value,
			password: event.currentTarget.password.value
		})

	},

	render: function(){
		return (
			<div className="register credentials">
			<h3>Register</h3>
				<form onSubmit={this._handleRegister}>
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