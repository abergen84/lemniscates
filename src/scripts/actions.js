import Backbone from 'backbone'
import {User} from './models/models.js'
import {DrawingModel, DrawingCollection} from './models/models.js'
import STORE from './store.js'
import toastr from 'toastr'


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
			toastr.info(`user ${email} logged in!`)
			location.hash = "home"
		}, function(error){
			console.log(error)
			toastr.info("error logging in.")
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
		STORE.data.drawingCollection.fetch(queryObj)
	},

	fetchOneDrawing: function(queryObj){
		STORE.data.drawingModel.fetch(queryObj)
		.then(function(responseData){
			console.log(responseData)
		})
	}




}

export default ACTIONS