const {product} = require('./handler-product.js');

const mockHeaders = {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
};

test('should set mock data', async () => {
    const responce = await product({test: 'test'});

    expect(responce.headers).toStrictEqual(mockHeaders);
    expect(responce.body).toBeTruthy();
    expect(responce.statusCode).toBe(200);
});
