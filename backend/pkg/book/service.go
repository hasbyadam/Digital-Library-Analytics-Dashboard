package book

import "github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/entity"

// Service is an interface from which our api module can access our repository of all our models
type Service interface {
	
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
	return nil, nil
}