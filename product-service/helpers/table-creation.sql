

CREATE extension IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
	id UUID NOT NULL DEFAULT uuid_generate_v4(),
	title TEXT NOT NULL,
	description TEXT,
	price INTEGER,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS stocks (
	product_id UUID,
	count INTEGER,
	FOREIGN KEY ("product_id") REFERENCES "products" ("id")
);

INSERT INTO products (title, description, price) VALUES
    ('ProductOne','Short Product Description', 1),
    ('ProductTwo','Short Product Description 2', 2),
    ('ProductNew','Short Product Description 3', 3),
    ('ProductTitle','Short Product Description 4', 5),
    ('Product','Short Product Description 5', 8),
    ('Product8','Short Product Description 6', 13),
    ('Product13','Short Product Description 7', 7),
    ('Product3','Short Product Description 8', 8),
    ('Product5','Short Product Description 9', 9);

INSERT INTO stocks (count, product_id) VALUES
    ( 1,  (SELECT id from products WHERE title='ProductOne') ),
    ( 1,  (SELECT id from products WHERE title='ProductTwo' ) ),
    ( 2,  (SELECT id from products WHERE title='ProductNew' ) ),
    ( 3,  (SELECT id from products WHERE title='ProductTitle' ) ),
    ( 5,  (SELECT id from products WHERE title='Product' ) ),
    ( 8,  (SELECT id from products WHERE title='Product8' ) ),
    ( 13,  (SELECT id from products WHERE title='Product13' ) ),
    ( 21,  (SELECT id from products WHERE title='Product3' ) ),
    ( 34,  (SELECT id from products WHERE title='Product5' ) );
