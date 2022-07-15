'use strict';
const {MOCK_DATA} = require('./data');

module.exports.product = async (event) => {
    console.log('myEvent product = ', event);

    const getResponse = (statusCode) => ({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        statusCode: statusCode,
        body: JSON.stringify(MOCK_DATA)
    });

    // try {
    //     await mockAsyncFunction();
    // } catch {
    //     throw new Error({statusCode: 404, body: 'Not Found!'});
    // }

    return getResponse(200);
};
