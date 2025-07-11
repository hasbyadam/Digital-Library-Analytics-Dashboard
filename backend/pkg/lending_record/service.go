package lendingRecord

import (
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/book"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/entity"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/presenter"
	"gopkg.in/guregu/null.v4"
)

// Service is an interface from which our api module can access our repository of all our models
type Service interface {
	InsertLendingRecord(LendingRecord *entity.LendingRecord) (*presenter.LendingRecord, error)
	ReturnBook(returnDate time.Time, id uuid.UUID) (*presenter.LendingRecord, error)
	FetchLendingRecords() (*[]presenter.LendingRecord, error)
	RemoveLendingRecord(ID uuid.UUID) error
}

type service struct {
	repository Repository
	book       book.Service
}

// NewService is used to create a single instance of the service
func NewService(r Repository, book book.Service) Service {
	return &service{
		repository: r,
		book:       book,
	}
}

// InsertdLendingRecord is a service layer that helps insert LendingRecord in dLendingRecordShop
func (s *service) InsertLendingRecord(LendingRecord *entity.LendingRecord) (*presenter.LendingRecord, error) {

	book, err := s.book.FetchBookById(LendingRecord.BookID)
	if err != nil {
		return nil, err
	}
	if book == nil {
		return nil, errors.New("book not found")
	}

	res, err := s.repository.CreateLendingRecord(LendingRecord)
	if err != nil {
		return nil, err
	}

	return &presenter.LendingRecord{
		ID:         res.ID,
		Book:       book,
		Borrower:   res.Borrower,
		BorrowDate: res.BorrowDate,
	}, nil
}

func (s *service) ReturnBook(returnDate time.Time, id uuid.UUID) (*presenter.LendingRecord, error) {
	lendingRecord, err := s.repository.FetchLendingRecordById(id)
	if err != nil {
		return nil, err
	}
	if lendingRecord == nil {
		return nil, errors.New("lending record not found")
	}
	if lendingRecord.ReturnDate.Valid {
		return nil, errors.New("book already returned")
	}

	book, err := s.book.FetchBookById(lendingRecord.BookID)
	if err != nil {
		return nil, err
	}
	if book == nil {
		return nil, errors.New("book not found")
	}

	lendingRecord.ReturnDate = null.TimeFrom(time.Time(returnDate))
	_, err = s.repository.UpdateLendingRecord(lendingRecord)
	if err != nil {
		return nil, err
	}

	return &presenter.LendingRecord{
		ID:         lendingRecord.ID,
		Book:       book,
		Borrower:   lendingRecord.Borrower,
		BorrowDate: lendingRecord.BorrowDate,
		ReturnDate: lendingRecord.ReturnDate,
	}, nil
}

func (s *service) FetchLendingRecords() (*[]presenter.LendingRecord, error) {
    lendingRecords, err := s.repository.FetchLendingRecords()
    if err != nil {
        return nil, err
    }

    return lendingRecords, nil
}

func (s *service) RemoveLendingRecord(ID uuid.UUID) error {
	return s.repository.DeleteLendingRecords(ID)
}
