'use strict';
const {MOCK_DATA} = require('./data');

module.exports.products = async (event) => {
    console.log('myEvent products = ', event);

    const getResponse = (statusCode) => ({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        statusCode: statusCode,
        body: JSON.stringify(MOCK_DATA)
    });

    this.mockAsyncFunction = () => {
        const promise = new Promise((resolve, reject) => {
            resolve("done!");
        });
        return promise;
    };

    try {
        let a = 5;
        await this.mockAsyncFunction();
    } catch {
        console.log(1000);
        throw new Error({statusCode: 404, body: 'Not Found! Products not found'});
    }

    return getResponse(200);
};
