const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------
const usersSchema = new Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
   // example of optional fields
  name:      { type: String },
  createdAt: { type: Date, default: Date.now }

})

const drawingSchema = new Schema({
	title: { type: String, required: true },
	boxValues: { type: Array, default: [] },
	likes: { type: [String], default: [] },
	date: { type: Date, default: Date.now }
})

module.exports = {
  User: createModel('User', usersSchema),
  Drawing: createModel('Drawing', drawingSchema)
}
