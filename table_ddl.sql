-- digital_library.admins definition

-- Drop table

-- DROP TABLE admins;

CREATE TABLE admins (
	id uuid NOT NULL,
	username text NULL,
	CONSTRAINT admins_pk PRIMARY KEY (id)
);

-- digital_library.books definition

-- Drop table

-- DROP TABLE books;

CREATE TABLE books (
	id uuid NOT NULL,
	title text NULL,
	author text NULL,
	isbn text NULL,
	quantity int8 NULL,
	category text NULL,
	created_at timestamp NOT NULL,
	created_by uuid NULL,
	updated_at timestamp NULL,
	updated_by uuid NULL,
	deleted_at timestamp NULL,
	deleted_by uuid NULL,
	CONSTRAINT books_pk PRIMARY KEY (id),
	CONSTRAINT books_unique UNIQUE (isbn)
);

-- digital_library.lending_records definition

-- Drop table

-- DROP TABLE lending_records;

CREATE TABLE lending_records (
	id uuid NOT NULL,
	book_id uuid NOT NULL,
	borrower text NULL,
	borrow_date timestamp NULL,
	return_date timestamp NULL,
	created_at timestamp NULL,
	created_by uuid NULL,
	updated_at timestamp NULL,
	updated_by uuid NULL,
	deleted_at timestamp NULL,
	deleted_by uuid NULL,
	CONSTRAINT lending_records_pk PRIMARY KEY (id)
);


-- digital_library.lending_records foreign keys

ALTER TABLE digital_library.lending_records ADD CONSTRAINT lending_records_books_fk FOREIGN KEY (book_id) REFERENCES books(id);

