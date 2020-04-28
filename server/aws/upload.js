const AWS = require("aws-sdk");
const path = require("path");

let tempConfig = AWS.config;
tempConfig.credentials = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.ACCESS_SECRET
};
tempConfig.region = process.env.REGION;
const s3 = new AWS.S3(tempConfig);

exports.uploadFile = async (fileStream, fileName) => {
  const uploadParams = {
    Bucket: process.env.BUCKET,
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
