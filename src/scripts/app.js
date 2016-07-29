import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import {User} from './models/models.js'
import LoginView from './views/LoginView.js'
import DashboardView from './views/DashboardView.js'
import DrawingView from './views/DrawingView.js'
import SingleDrawingView from './views/SingleDrawingView.js'


const app = function() {
  var Router = Backbone.Router.extend({
  	routes: {
  		"drawing/detail/:id":"viewDrawing",
  		"profile":"goProfile",
  		"drawing/archive":"goArchive",
  		"drawing/create":"createDrawing",
  		"login":"goLogin",
  		"home":"goHome",
  		"*catchall":"routeHome"
  	},

  	initialize: function(){
  		this.on('route', function(handlerName){ //handlerName is the route (could be any of the above)
  			if(!User.getCurrentUser()){  //idea is to re-route to the login page should the user NOT be logged in.
  				location.hash = "login"
  			}
  		})
  		Backbone.history.start()
  	},

  	routeHome: function(){
  		location.hash = "home"
  	},

  	goLogin: function(){
  		console.log('routing login')
  		ReactDOM.render(<LoginView />, document.querySelector('.container'))
  	},

  	goHome: function(){
  		console.log('routing home')
  		ReactDOM.render(<DashboardView />, document.querySelector('.container'))
  	},

  	createDrawing: function(){
  		console.log('routing create drawing')
  		ReactDOM.render(<DrawingView />, document.querySelector('.container'))
  	},

  	goArchive: function(){
  		console.log('routing archive')
  		// ReactDOM.render(<ArchiveView />, document.querySelector('.container'))
  	},

  	viewDrawing: function(id){
  		console.log('routing view drawing')
  		ReactDOM.render(<SingleDrawingView id={id} />, document.querySelector('.container'))	
  	},

  	goProfile: function(){
  		// ReactDOM.render(<ProfileView />, document.querySelector('.container'))		
  	}

  })




new Router()

}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..