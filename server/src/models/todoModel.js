const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  user_name: {
    type: String,
  },
  user_id: {
    type: String,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
