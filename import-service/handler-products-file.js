const AWS = require('aws-sdk');
const { successResponse, errorResponse, HttpStatusCodes, BUCKET, FOLDER_UPLOAD } = require('./helper');

module.exports.importProductsFileDev = async ( event ) => {
  console.log('importProductsFileDev input: ',JSON.stringify(event));

  try {
    const s3 = new AWS.S3({ region: "eu-west-1" });
    const params = {
      Bucket: BUCKET,
      Key: `${FOLDER_UPLOAD}/${event.queryStringParameters.name}`,
      ContentType: 'text/csv',
      Expires: 60
    };
    const s3PutObjectUrl = await s3.getSignedUrlPromise('putObject', params);
    return successResponse(s3PutObjectUrl);
  } catch (err) {
    return errorResponse(err, HttpStatusCodes.INTERNAL_SERVER_ERROR)
  }
};
