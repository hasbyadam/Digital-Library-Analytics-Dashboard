package statistic

import (
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/entity"
	"gorm.io/gorm"
)

// Repository interface allows us to access the CRUD Operations.
type Repository interface {
	FetchMonthlyTrend() (*[]entity.MonthlyTrend, error)
    FetchMostBorrowedBooks() (*[]entity.MostBorrowedBook, error)
    FetchBooksByCategory() (*[]entity.BooksByCategory, error)
}
type repository struct {
	Db *gorm.DB
}

// NewRepo is the single instance repo that is being created.
func NewRepo(db *gorm.DB) Repository {
	return &repository{
		Db: db,
	}
}

func (r *repository) FetchMonthlyTrend() (*[]entity.MonthlyTrend, error) {
    var trends []entity.MonthlyTrend
    query := `
        WITH months AS (
            SELECT
                DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month' * gs AS lending_month
            FROM
                generate_series(0, 11) AS gs
        ),
        borrow_counts AS (
            SELECT
                DATE_TRUNC('month', borrow_date) AS lending_month,
                COUNT(*) AS total_borrowed
            FROM
                digital_library.lending_records
            WHERE
                borrow_date >= (CURRENT_DATE - INTERVAL '1 year')
                AND borrow_date IS NOT NULL
                AND deleted_at IS NULL
            GROUP BY
                DATE_TRUNC('month', borrow_date)
        ),
        return_counts AS (
            SELECT
                DATE_TRUNC('month', return_date) AS lending_month,
                COUNT(*) AS total_returned
            FROM
                digital_library.lending_records
            WHERE
                return_date >= (CURRENT_DATE - INTERVAL '1 year')
                AND return_date IS NOT NULL
                AND deleted_at IS NULL
            GROUP BY
                DATE_TRUNC('month', return_date)
        )
        SELECT
            TO_CHAR(m.lending_month, 'FMMonth YYYY') AS month_year,
            COALESCE(bc.total_borrowed, 0) AS total_borrowed,
            COALESCE(rc.total_returned, 0) AS total_returned
        FROM
            months m
        LEFT JOIN
            borrow_counts bc ON m.lending_month = bc.lending_month
        LEFT JOIN
            return_counts rc ON m.lending_month = rc.lending_month
        ORDER BY
            m.lending_month;
    `
    err := r.Db.Raw(query).Scan(&trends).Error
    if err != nil {
        return nil, err
    }
    return &trends, nil
}

func (r *repository) FetchMostBorrowedBooks() (*[]entity.MostBorrowedBook, error) {
    var mostBorrowedBooks []entity.MostBorrowedBook
    query := `
        SELECT
            b.id AS book_id,
            b.title,
            b.author,
            b.category,
            COUNT(lr.id) AS total_borrows
        FROM
            digital_library.books b
        LEFT JOIN
            digital_library.lending_records lr 
            ON b.id = lr.book_id AND lr.deleted_at IS NULL
        GROUP BY
            b.id, b.title, b.author, b.category
        ORDER BY
            total_borrows DESC
        LIMIT 5
    `
    tx := r.Db.Raw(query).Scan(&mostBorrowedBooks)
    if tx.Error != nil {
        return nil, tx.Error
    }
    return &mostBorrowedBooks, nil
}

func (r *repository) FetchBooksByCategory() (*[]entity.BooksByCategory, error) {
    var booksByCategory []entity.BooksByCategory
    query := `
        SELECT
            category,
            COUNT(*) AS total_books
        FROM
            digital_library.books
        WHERE
            deleted_at IS NULL
        GROUP BY
            category
        ORDER BY
            total_books DESC
    `
    tx := r.Db.Raw(query).Scan(&booksByCategory)
    if tx.Error != nil {
        return nil, tx.Error
    }
    return &booksByCategory, nil
}

