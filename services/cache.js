const mongoose = require("mongoose");

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function () {
  console.log("We cachd the function ");
  return exec.apply(this, arguments);
};
