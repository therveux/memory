const AWS = require("aws-sdk");
const path = require("path");

AWS.config.loadFromPath(path.resolve(__dirname, "config.json"));
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

exports.uploadFile = async (fileStream, fileName) => {
  const uploadParams = {
    Bucket: "memorybucket",
    Key: fileName,
    Body: fileStream,
    ACL: "public-read-write",
    CacheControl: "max-age=31536000"
  };
  try {
    const result = await s3.upload(uploadParams).promise();
    console.log(result);
    console.log(result.Location);
    return result.Location;
  } catch (err) {
    console.log("ERROR", err);
    return "";
  }
};
