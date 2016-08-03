const checkAuth = function(req, res, next){
  if(!req.user) {
    res.status(400).send( 'no authenticated user for current session' )
  }
  else next()
}

const errorHandler = function(err, req, res, next) {
  console.log(err)
  res.render(err);
  return
} 

const checkForQueries = function(req, res, next){
  let queryBuilder = {}

  let errList = ''

  let queryCommandFunctions= {
    dateRange: function(schemaProp){

        let earlyDate = req.query['_QRY_dateRange-date'][0].split('-')
        let laterDate = req.query['_QRY_dateRange-date'][1].split('-')    

        if (earlyDate.length !== 3 || laterDate.length !== 3){
          errList += 'hey you need to do the formatting YYYY-M-D'
          return
        }    

        let rangeQuery = {}

        rangeQuery[schemaProp] = {
            '$gte': new Date( parseInt(earlyDate[0]), parseInt(earlyDate[1])-1, parseInt(earlyDate[2]) ), 
            '$lt' : new Date( parseInt(laterDate[0]), parseInt(laterDate[1])-1, parseInt(laterDate[2]) ), 
        }

        console.log( 'qry For The goose')
        Object.assign(queryBuilder, rangeQuery)
    }
  }

  for (var key in req.query){

    if (key.indexOf('_QRY') !== -1 ){
      let qryCommand = key.slice(5).split('-')
      let commandName =  qryCommand[0]
      let schemaProperty =  qryCommand[1]
      queryCommandFunctions[ commandName ]( schemaProperty )
    } else {
       queryBuilder[key] = req.query[key]
    }
  }

  req.query = queryBuilder
  if(errList.length > 1){
    res.status(400).send(errList)
  } else {
    next();

  }

}

const cookifyUser = function(req,res,next) {
  if (req.user) {
    res.cookie(global.PROJECT_NAME + '_user',JSON.stringify(req.user))
    res.cookie('tiy_full_stack_app_name', global.PROJECT_NAME)
    next()
  }
  else {
    console.log('no user')
    res.cookie(global.PROJECT_NAME + '_user','null')
    res.cookie('tiy_full_stack_app_name', global.PROJECT_NAME)
    next()
  }
}

module.exports = {
  checkAuth: checkAuth,
  errorHandler: errorHandler,
  cookifyUser: cookifyUser, 
  checkForQueries: checkForQueries
}