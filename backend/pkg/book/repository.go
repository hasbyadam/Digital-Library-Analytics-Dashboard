package book

import (
	"github.com/google/uuid"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/entity"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/presenter"
	"github.com/jinzhu/copier"
	"gorm.io/gorm"
)

// Repository interface allows us to access the CRUD Operations.
type Repository interface {
	ReadBook() (*[]presenter.Book, error)
	AddBook(book *entity.Book) (*entity.Book, error)
	UpdateBook(book *entity.Book) (*entity.Book, error)
	DeleteBook(ID uuid.UUID) error
	ReadBookById(ID uuid.UUID) (*presenter.Book, error)
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
	var book []entity.Book
	tx := r.Db.Table("digital_library.books").Find(&book)
	if tx.Error != nil {
		return nil, tx.Error
	}
	var presenterBooks []presenter.Book
	copier.Copy(&presenterBooks, &book)

	return &presenterBooks, nil
}

func (r *repository) AddBook(book *entity.Book) (*entity.Book, error) {
	tx := r.Db.Table("digital_library.books").Create(&book)
	if tx.Error != nil {
		return nil, tx.Error
	}
	return book, nil
}

func (r *repository) UpdateBook(book *entity.Book) (*entity.Book, error) {
	tx := r.Db.Table("digital_library.books").Save(&book)
	if tx.Error != nil {
		return nil, tx.Error
	}
	return book, nil
}

func (r *repository) DeleteBook(ID uuid.UUID) error {
	tx := r.Db.Table("digital_library.books").Delete(&entity.Book{}, ID)
	if tx.Error != nil {
		return tx.Error
	}
	return nil
}

func (r *repository) ReadBookById(id uuid.UUID) (*presenter.Book, error) {
    var book entity.Book
    tx := r.Db.Table("digital_library.books").Where("id = ?", id).First(&book)
    if tx.Error != nil {
        return nil, tx.Error
    }
    var presenterBook presenter.Book
    copier.Copy(&presenterBook, &book)
    return &presenterBook, nil
}


