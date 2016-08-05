import Backbone from 'backbone'
import $ from 'jquery'
import {app_name} from '../app'
import toastr from 'toastr'

const DrawingModel = Backbone.Model.extend({
	urlRoot: '/api/drawing',
	idAttribute: '_id',
	defaults: {
		boxValues: [],
		likes: [],
		comment: []  //need this here so that React can go ahead and populate the rows and columns before the 
	}					//data comes back. See SingleDrawingView -> DrawingListing -> populateRows. the value of
})						//this.props.matrix hasnt come back yet before react wants to render it, so have to put default

const DrawingCollection = Backbone.Collection.extend({
	model: DrawingModel,
	url: '/api/drawings',
	sort_key: 'id',
	// comparator: function(model){
	// 	return model.get(this.sort_key)
	// },
	// sortByField: function(fieldName){
	// 	this.sort_key = fieldName
	// 	this.sort()
	// },
	initialize(){
		// this.sortByField('likes')
	}
})


// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
const UserAuthModel = Backbone.Model.extend({
	urlRoot: '/api/users',
	idAttribute: '_id'
})

UserAuthModel.register = function(newUserData) {
	if(typeof newUserData !== 'object') {  throw new Error("User.register needs to be of type object with email & password properties") }
	if(!newUserData.email || !newUserData.password) {  throw new Error("object needs email + password properties") }

	return $.ajax({
		method: 'POST',
		type: 'json',
		url: '/auth/register',
		data: newUserData
	})
}

UserAuthModel.login = function(email, password) {
	if(!email || !password || email === '' || password === '') {  
		throw new Error("User.login(«email», «password») method needs strings for email, password arguments") 
	}

	if(typeof email !== 'string' || typeof password !== 'string' ) {  
		throw new Error("User.login(«email», «password») email + password arguments should both be strings") 
	}

	return $.ajax({
		method: 'POST',
		type: 'json',
		url: '/auth/login',
		data: {
			email: email,
			password: password
		}
	}).then((userData) => {
		localStorage[app_name + '_user'] = JSON.stringify(userData)
		return userData
	},(err)=> {console.log(err.responseText)})
}

UserAuthModel.logout = function() {
	return $.getJSON('/auth/logout').then(()=>{
		localStorage[app_name + '_user'] = null
	})
}

UserAuthModel.getCurrentUser = function() {
	return localStorage[app_name + '_user'] ? JSON.parse(localStorage[app_name + '_user']) : null
}


// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
// ^^ DO NOT TOUCH ^^

// but, you may extend the UserAuthModel Constructor (which is a Backbone Model)
const User = UserAuthModel.extend({
	initialize: function(){

	}
})

export { User, DrawingModel, DrawingCollection }
