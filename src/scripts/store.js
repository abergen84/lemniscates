import React from 'react'
import Backbone from 'backbone'
import init from './init'
import {User} from './models/models.js'
import {DrawingCollection} from './models/models.js'
import {DrawingModel} from './models/models.js'
import _ from 'underscore'

const STORE = _.extend(Backbone.Events, {

	data: {
		drawingCollection: new DrawingCollection(),
		drawingModel: new DrawingModel()
	},

	getData: function(){
		return _.clone(this.data)
	},

	emitChange: function(){
		this.trigger('updateContent')
	},

	initialize: function(){
		this.data.drawingCollection.on('sync update', this.emitChange.bind(this))
		this.data.drawingModel.on('sync update', this.emitChange.bind(this))
		// this.data.drawingCollection.sortByField('likes')
	}
})

STORE.initialize()



export default STORE

