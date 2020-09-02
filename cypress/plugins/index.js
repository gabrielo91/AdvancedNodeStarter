// Database setup

require("../../models/User");

const mongoose = require("mongoose");
const keys = require("../../config/keys");
const User = mongoose.model("User");

module.exports = (on, config) => {
  on("task", {
    createUser() {
      mongoose.connect(keys.mongoURI);
      return new User({}).save();
    },
  });
};
