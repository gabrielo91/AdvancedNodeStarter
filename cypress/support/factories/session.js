const Buffer = require("safe-buffer").Buffer;
const Keygrip = require("keygrip");
const cookieKey = "123123123";
const keygrip = new Keygrip([cookieKey]);

const authenticate = (user) => {
  const sessionObject = {
    passport: {
      user: user._id.toString(),
    },
  };
  const session = Buffer.from(JSON.stringify(sessionObject)).toString("base64");

  const sig = keygrip.sign("session=" + session);
  return [session, sig];
};

module.exports = { authenticate };
