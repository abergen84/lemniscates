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
			if(responseData === undefined) {
				toastr.warning('please input correct username and password')	
			} else {
				toastr.info(`user ${email} logged in!`)
				location.hash = "home"
			}
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
		STORE.data.drawingCollection.fetch({
			data: queryObj || {}
		})
		.then(function(responseData){
			console.log(responseData)
		})
	},

	// fetchDrawings: function(queryObj){
	// 	STORE.data.drawingCollection.fetch(queryObj)
	// 	.then(function(responseData){
	// 		console.log(responseData)
	// 	})
	// },

	fetchOneDrawing: function(queryObj){
		STORE.data.drawingModel.fetch(queryObj)
		.then(function(responseData){
			console.log(responseData)
		})
	},

	clearDrawingModel: function(){
		STORE.data.drawingModel.clear()
		STORE.data.drawingModel.set(STORE.data.drawingModel.defaults)
		// console.log(STORE.data.drawingModel.defaults)
	},

	addLike: function(drawing, user){
		console.log('this is adding like')
		console.log(drawing)
		if(drawing.get('likes').indexOf(user._id) < 0){
			drawing.set({
				likes: drawing.get('likes').concat(user._id)
			})
			drawing.save()
			.then(()=> STORE.data.drawingModel.fetch())
		}
	},

	deleteDrawing: function(queryObj){
		console.log('deleting record')
		// console.log(STORE.data.drawingModel)
		var deletedDrawing = STORE.data.drawingModel
		deletedDrawing.destroy(queryObj).then(()=> {
			return location.hash = "profile"
		})
	},

	addComment: function(drawing, value, name){
		// var drawing = STORE.data.drawingModel
		drawing.set({
			comment: drawing.get('comment').concat(name + ' says: ' + value)
		})
		drawing.save().then(()=>{
			drawing.fetch()
		})
	},

	getTheme: function(themes){
		console.log('theme generator', themes[Math.floor(Math.random() * themes.length)])	
		return themes[Math.floor(Math.random() * themes.length)]
	},




}

export default ACTIONS