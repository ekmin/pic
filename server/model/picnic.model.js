const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const picnicsSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  user_name: {
    type: String,
    required: true,
  },
  picnic_name: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  planed_date: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  victuals: [
    {
      food: {
        type: Array,
      },
      drinks: {
        type: Array,
      },
    },
  ],
  games: {
    type: Array,
  },
  things: {
    type: Array,
    required: true,
  },
  guests: {
    type: Array,
  },
  note: {
    type: String,
  },
  participations: {
    type: Array,
    required: true,
  },
  messages: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Picnic", picnicsSchema);
