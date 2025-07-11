**Digital Library Analytics Dashboard**
=====================================

**Setup Instructions**
--------------------

To set up the application, please follow these steps:

1. Clone the repository: `git clone https://github.com/your-repo/digital-library-analytics-dashboard.git`
2. Navigate to the project directory: `cd digital-library-analytics-dashboard`
3. Run the following command to start the containers: `docker-compose up -d`
4. Wait for the containers to start and the database to initialize.
5. Run the database table ddl and data injection (optional).
6. Access the application through your web browser at `http://localhost:3000`.

**Database Schema Explanation**
-----------------------------

The database schema is designed to store information about books, lending records, and users. The schema consists of the following tables:

### books

| Column Name | Data Type | Description |
| --- | --- | --- |
| id | uuid | Unique identifier for the book |
| title | text | Title of the book |
| author | text | Author of the book |
| isbn | text | ISBN number of the book |
| quantity | int8 | Number of copies of the book |
| category | text | Category of the book |
| created_at | timestamp | Timestamp when the book was created |
| created_by | uuid | User who created the book |
| updated_at | timestamp | Timestamp when the book was last updated |
| updated_by | uuid | User who last updated the book |
| deleted_at | timestamp | Timestamp when the book was deleted |
| deleted_by | uuid | User who deleted the book |

### lending_records

| Column Name | Data Type | Description |
| --- | --- | --- |
| id | uuid | Unique identifier for the lending record |
| book_id | uuid | Foreign key referencing the books table |
| borrower | text | Email address of the borrower |
| borrow_date | timestamp | Timestamp when the book was borrowed |
| return_date | timestamp | Timestamp when the book was returned |
| created_at | timestamp | Timestamp when the lending record was created |
| created_by | uuid | User who created the lending record |
| updated_at | timestamp | Timestamp when the lending record was last updated |
| updated_by | uuid | User who last updated the lending record |
| deleted_at | timestamp | Timestamp when the lending record was deleted |
| deleted_by | uuid | User who deleted the lending record |

### admins

| Column Name | Data Type | Description |
| --- | --- | --- |
| id | uuid | Unique identifier for the admin |
| username | text | Username of the admin |

The relationships between the tables are as follows:

* A book can have many lending records (one-to-many).
* A lending record is associated with one book (many-to-one).
* An admin can create, update, and delete books and lending records.
