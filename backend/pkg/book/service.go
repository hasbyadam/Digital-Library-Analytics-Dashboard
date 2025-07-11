package book

import (
	"github.com/google/uuid"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/entity"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/presenter"
)

// Service is an interface from which our api module can access our repository of all our models
type Service interface {
	InsertBook(*entity.Book) (*entity.Book, error)
	FetchBook() (*[]presenter.Book, error)
	UpdateBook(*entity.Book) (*entity.Book, error)
	RemoveBook(ID uuid.UUID) error
	FetchBookById(id uuid.UUID) (*presenter.Book, error)
}

type service struct {
	repository Repository
}

// NewService is used to create a single instance of the service
func NewService(r Repository) Service {
	return &service{
		repository: r,
	}
}

// InsertBook is a service layer that helps insert book in BookShop
func (s *service) InsertBook(book *entity.Book) (*entity.Book, error) {
	return s.repository.AddBook(book)
}

func (s *service) FetchBook() (*[]presenter.Book, error) {
	return s.repository.ReadBook()
}

func (s *service) UpdateBook(book *entity.Book) (*entity.Book, error) {
	return s.repository.UpdateBook(book)
}

func (s *service)RemoveBook(ID uuid.UUID) error {
	return s.repository.DeleteBook(ID)
}

func (s *service) FetchBookById(id uuid.UUID) (*presenter.Book, error) {
	return s.repository.ReadBookById(id)
}