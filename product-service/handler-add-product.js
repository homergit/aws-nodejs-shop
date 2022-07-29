const { Client } = require('pg');

const {
    successResponse,
    serverErrorResponse,
    validationErrorResponse
} = require('./helpers/helpers');
const { validateCount, validatePrice, validateTitle, validateDescription } = require('./helpers/validators');
const { dbOptions } = require('./helpers/db-config');


module.exports.addProduct = async (event) => {
    console.log('event = ', event);
    if (event.body) {
        console.log('event.body = ', event.body);
        const client = new Client(dbOptions);
        let body;

        try {
            body = JSON.parse(event.body);

            validateTitle(body.title);
            validatePrice(body.price);
            validateCount(body.count);
            validateDescription(body.description);
        } catch (e) {
            if (e.message?.contains('VALIDATION ERROR')) {
                return validationErrorResponse(e.message);
            } else {
                return serverErrorResponse();
            }
        }

        try {
            await client.connect();

            const {title, price, description, count} = body;

            await client.query('BEGIN');

            const productResponse = await client.query(`
                    insert into products(title, price, description)
                    VALUES($1, $2, $3) RETURNING *
                `, [title, price, description]);

            const product = productResponse.rows[0];

            const stockResponse = await client.query(`
                    insert into stocks(product_id, count)
                    VALUES($1, $2) RETURNING *
                `, [product.id, count]);

            await client.query('COMMIT');

            product.count = stockResponse.rows[0].count;

            console.log('product = ', product);

            return successResponse(product);
        } catch (e) {
            await client.query('ROLLBACK');

            console.error('error: ', e);

            return serverErrorResponse();
        }
    } else {
        return validationErrorResponse('body');
    }
};
