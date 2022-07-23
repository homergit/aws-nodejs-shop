'use strict';
const {mockAsyncFunction, getResponse} = require('./data');

module.exports.products = async (event) => {
    try {
        await mockAsyncFunction();
    } catch {
        throw new Error({statusCode: 404, body: 'Not Found! Products not found'});
    }

    return getResponse(200);
};
