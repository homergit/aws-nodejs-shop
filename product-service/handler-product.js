'use strict';
const data = require('./data');

module.exports.product = async (event) => {
    return data.getResponse(200);
};
