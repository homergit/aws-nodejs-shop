const {products} = require('./handler.js');

const mockHeaders = {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
};

test('should check responce data', async () => {
    const responce = await products({test: 'test'});

    expect(responce.headers).toStrictEqual(mockHeaders);
    expect(responce.body).toBeTruthy();
    expect(responce.statusCode).toBe(200);
});
