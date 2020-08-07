const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name : {
    type:String,
    required : true },
    
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'public',
    enum: ["public", "member", "admin"]
  },
  accessToken: {
    type: String
  }
})

const User = mongoose.model('user', UserSchema)

module.exports = User;

  

