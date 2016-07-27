import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import {User} from './models/models.js'
import LoginView from './views/LoginView.js'
import DashboardView from './views/DashboardView.js'
import DrawingView from './views/DrawingView.js'


const app = function() {
  var Router = Backbone.Router.extend({
  	routes: {
  		"drawing/archive":"goArchive",
  		"drawing/create":"createDrawing",
  		"login":"goLogin",
  		"home":"goHome",
  		"*catchall":"routeHome"
  	},

  	initialize: function(){
  		Backbone.history.start()
  		this.on('route', function(handlerName){ //handlerName is the route (could be any of the above)
  			if(!User.getCurrentUser()){  //idea is to re-route to the login page should the user NOT be logged in.
  				location.hash = "login"
  			}
  		})
  	},

  	routeHome: function(){
  		location.hash = "home"
  	},

  	goLogin: function(){
  		ReactDOM.render(<LoginView />, document.querySelector('.container'))
  	},

  	goHome: function(){
  		ReactDOM.render(<DashboardView />, document.querySelector('.container'))
  	},

  	createDrawing: function(){
  		ReactDOM.render(<DrawingView />, document.querySelector('.container'))
  	},

  	goArchive: function(){
  		// ReactDOM.render(<ArchiveView />, document.querySelector('.container'))
  	}

  })




new Router()

}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..