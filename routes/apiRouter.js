let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')
let mw = require('../config/middleware.js')

let User = require('../db/schema.js').User
let Drawing = require('../db/schema.js').Drawing

  
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password",function(err, record){
        if(err || !record) return res.json(err)
        let recordWithUpdates = helpers.updateFields(record, req.body)
        recordWithUpdates.save(function(err){
          if(err) return res.json(err) 
          res.json(recordWithUpdates)
        })
      })
    })
    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

    //Creating a Drawing
    apiRouter
      .post('/drawing', function(request, response){
        let newDrawing = new Drawing(request.body)
        newDrawing.save(function(error){
          if(error){
            console.log(error)
            response.json({
              error: error
            })
          } else {
            response.json(newDrawing)
          }
        })
      })

      //Fetching all drawings
      .get('/drawings', mw.checkForQueries, function(request, response){
        console.log(request.query)
        // let qry = { date: {'$gte': new Date(2016, 6, 27), '$lt': new Date(2016, 6, 30)}}

        Drawing.find(request.query, function(error, results){
          if(error){
            console.log(error)
            response.json({
              error: error
            })
          } else {
            // console.log(results)
            response.json(results)
          }
        })
      })

    //Get all drawings associated with an account
    apiRouter.get('/myDrawings', function(request, response){
      if(request.user){
        Drawing.find({user_email: request.user.email}, function(error,results){
          if(error){
            console.log(error)
            response.json({
              error: error
            })
          }
          else {
            console.log(results)
            response.json(results)
          }
        })
      }
    })

    //Get drawings by date
    // var currentDate = new Date()
    // var oneDay = currentDate.setDate(currentDate.getDate()-1)
    // var oneDayAgo = new Date(oneDay).toJSON().slice(0,10)
    // var twoDaysAgo = currentDate.setDate(currentDate.getDate()-2)
    // var threeDaysAgo = currentDate.setDate(currentDate.getDate()-3)
    // var fourDaysAgo = currentDate.setDate(currentDate.getDate()-4)
    // var fiveDaysAgo = currentDate.setDate(currentDate.getDate()-5)
    // var sixDaysAgo = currentDate.setDate(currentDate.getDate()-6)
    // var sevenDaysAgo = currentDate.setDate(currentDate.getDate()-7)

    // apiRouter.get('/drawingsByDate/', function(request, response){
    //   Drawing.find({date: {'$gte': new Date(2016, 6, 27), '$lt': new Date(2016, 6, 30)}}, function(error, results){
    //     if(error){
    //       console.log(error)
    //       response.json({
    //         error: error
    //       })
    //     }
    //     else {
    //       console.log(results)
    //       response.json(results)
    //     }
    //   })
    // })

    //Get an individual drawing
    apiRouter
      .get('/drawing/:_id', function(request, response){
        Drawing.findOne({_id: request.params._id}, function(error, results){
          if(error){
            console.log(error)
            response.json({
              error: error
            })
          } else {
            console.log(results)
            response.json(results)
          }
        })
      })
      //Update a drawing (TBD)
      .put('/drawing/:_id', function(request, response){
        Drawing.findByIdAndUpdate(request.params._id, request.body, function(error, results){
          if(error){
            console.log(error)
            response.json({
              error: error
            })
          } else {
            console.log(results)
            response.json(results)
          }
        })
      })

      //Deleting a drawing
      .delete('/drawing/:_id', function(request, response){
        Drawing.remove({_id: request.params._id}, function(error, results){
          if(error){
            console.log(error)
            response.json({
              error: error
            })
          } else {
            console.log(results)
            response.json(results)
          }
        })
      })

module.exports = apiRouter