import Backbone from 'backbone'
import {User} from './models/models.js'
import {DrawingModel,DrawingCollection} from './models/models.js'
import STORE from './store.js'


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
	},

	logOutUser: function(){
		User.logout().then(()=> {
			location.hash = "login"
		})
	},

	saveDrawing: function(drawObj){
		let savedDrawing = new DrawingModel(drawObj)
		savedDrawing.save().then(function(responseData){
			console.log(responseData)
			location.hash = "home"
		}, function(error){
			console.log(error)
		})
	},

	fetchDrawings: function(queryObj){
		STORE.data.drawingCollection.fetch({
			data: queryObj,
			url: '/api/drawing/'
		})
	},




}

export default ACTIONS