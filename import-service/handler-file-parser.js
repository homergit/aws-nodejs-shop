const AWS = require("aws-sdk");
const csv = require("csv-parser");
const { FOLDER_UPLOAD, FOLDER_PARSED } = require('./helper');

module.exports.importFileParserDev = async (event) => {
  console.log('fileParser event = ', JSON.stringify(event));

  const s3 = new AWS.S3({ region: "eu-west-1" });
  const bucketName = event.Records[0].s3.bucket.name;
  const keyName = event.Records[0].s3.object.key;

  const moveFileToParsed = async () => {
    await s3
      .copyObject({
        Bucket: bucketName,
        CopySource: `${bucketName}/${event.Records[0].s3.object.key}`,
        Key: event.Records[0].s3.object.key.replace(FOLDER_UPLOAD, FOLDER_PARSED),
      })
      .promise();

    await s3
      .deleteObject({
        Bucket: bucketName,
        Key: event.Records[0].s3.object.key,
      })
      .promise();
  };

  try {
    const s3ReadStream = s3.getObject({
      Bucket: bucketName,
      Key: keyName,
    }).createReadStream();

    s3ReadStream
      .pipe(csv())
      .on("data", (data) => console.log(data))
      .on("end", moveFileToParsed);

    return { success: true };
  } catch (err) {
    console.error(JSON.stringify(err));
    return { success: false };
  }
};
