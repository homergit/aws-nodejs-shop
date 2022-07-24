const { Client } = require('pg');

const { notFoundResponse, serverErrorResponse, successResponse } = require('./helpers/helpers');
const { dbOptions } = require('./helpers/db-config');

module.exports.products = async ( event ) => {
    console.log('event = ', event);

    const client = new Client(dbOptions);
    try {
        await client.connect();

        const { rows: products } = await client.query(`
            select
              products.id,
              products.title,
              products.price,
              products.description,
              stocks.count
                from products left join stocks on products.id = stocks.product_id ;
          `);

        console.log('products ', products);

        if( !products.length ){
            return notFoundResponse('product');
        }

        return successResponse(products);
    } catch(e){
        console.error('500 error: ', e);

        return serverErrorResponse('product');
    }
};
