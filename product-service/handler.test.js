const products = require('./handler.js');

test('should set mock data', () => {
    jest.spyOn(JSON, 'stringify');
    products.products({});

    expect(JSON.stringify).toHaveBeenCalled();
});
