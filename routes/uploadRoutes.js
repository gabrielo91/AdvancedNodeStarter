const AWS = require("aws-sdk");
const keys = require("../config/keys");
const requireLogin = require("../middlewares/requireLogin");
const uuid = require("uuid/v1");

const s3 = new AWS.S3({
  accessKeyId: keys.access_key_id,
  secretAccessKey: keys.secret_access_key,
});

module.exports = (app) => {
  app.get("/api/upload", requireLogin, (req, res) => {
    const userId = req.user.id;
    const date = new Date().toISOString().substring(0, 10);
    const fileName = uuid();
    const key = `${userId}/${date}/${fileName}.jpeg`;
    const params = {
      Bucket: "blog-bucket-advanced-node",
      Key: key,
      ContentType: "image/jpeg",
    };
    s3.getSignedUrl("putObject", params, (err, url) => {
      res.send({ key, url });
    });
  });
};
