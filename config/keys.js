if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else if (process.env.NODE_ENV === "ci") {
  module.exports = require("./dev");
} else {
  module.exports = require("./dev");
}
