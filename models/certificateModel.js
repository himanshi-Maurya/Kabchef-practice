const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;



const certificateSchema = new Schema ({
    certiId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
  },
  imageUrl: {
      type: String,
      required: true
  },
  certiNumber: {
      type: Number
  }
  });

  
  certificateSchema.plugin(AutoIncrement, { id: 'certiNumber_seq', inc_field: 'certiNumber' })
  exports.Certificate = new mongoose.model("certificate", certificateSchema);