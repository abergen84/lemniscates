import Backbone from 'backbone'
import {User} from './models/models.js'


const ACTIONS = {

	registerUser: function(userObj){
		var self = this
		User.register(userObj).then(function(){
			self.logInUser(userObj.email, userObj.password)
		}, function(error){
			alert('Failure to register')
			console.log(error)
		})
	},

	logInUser: function(email,password){
		User.login(email,password).then(function(responseData){
			console.log(responseData)
			alert('Logged in!')
			location.hash = "home"
		}, function(error){
			console.log(error)
			alert('Error logging in')
		})
	}




}

export default ACTIONS