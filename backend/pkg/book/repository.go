package book

import (
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/presenter"
	"gorm.io/gorm"
)

// Repository interface allows us to access the CRUD Operations.
type Repository interface {
	ReadBook() (*[]presenter.Book, error)
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

// CreateBook is a postgresql repository that helps to create books
func (r *repository) ReadBook() (*[]presenter.Book, error) {
	return nil, nil
}
