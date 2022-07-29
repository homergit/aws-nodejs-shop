const { Client } = require('pg');

const { notFoundResponse, serverErrorResponse, successResponse, validationErrorResponse } = require('./helpers/helpers');
const { dbOptions } = require('./helpers/db-config');

module.exports.product = async ( event ) => {
    console.log('event = ', event);
    const client = new Client(dbOptions);
    try {
        await client.connect();
        const { pathParameters } = event;
        const { id } = pathParameters;
        const { rows: products } = await client.query(`
            select products.id,
            products.title,
            products.price,
            products.description,
            stocks.count from products left join stocks on products.id = stocks.product_id where products.id=$1
        `, [id]);

        console.log('products', products);

        if( !products[0] ){
            return notFoundResponse('product');
        }
        return successResponse(products[0]);
    } catch(e) {
        console.log('DB error: ', e);

        if((e.code && e.code === '22P02') ){
            return validationErrorResponse('id should be uuid format');
        }

        return serverErrorResponse();
    } finally {
        client.end();
    }
};
