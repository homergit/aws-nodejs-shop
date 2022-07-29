const response = (body, statusCode) => {
    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        statusCode,
        body: JSON.stringify(body)
    };
};

module.exports.successResponse = body => {
    return response(body, 200);
};

module.exports.validationErrorResponse = (message) => {
    return response({
        message
    }, 400);
};

module.exports.notFoundResponse = item => {
    const message = item + 'ERROR: Not Found';
    return response({
        message
    }, 404);
};

module.exports.serverErrorResponse = () => {
    const message = 'ERROR: Internal Server Error!!!';
    return response({
        message
    }, 500);
};
