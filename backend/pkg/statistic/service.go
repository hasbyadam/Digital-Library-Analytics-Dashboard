package statistic

import "github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/presenter"

// Service is an interface from which our api module can access our repository of all our models
type Service interface {
	FetchMonthlyTrend() (*presenter.MonthlyTrend, error)
	FetchMostBorrowedBooks() (*presenter.MostBorrowedBook, error)
	FetchBooksByCategory() (*presenter.BooksByCategory, error)
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

func (s *service) FetchMonthlyTrend() (*presenter.MonthlyTrend, error) {
	var trends presenter.MonthlyTrend
	data, err := s.repository.FetchMonthlyTrend()
	if err != nil {
		return nil, err
	}

	for _, v := range *data {
		trends.MonthYear = append(trends.MonthYear, v.MonthYear)
		trends.TotalBorrowed = append(trends.TotalBorrowed, v.TotalBorrowed)
		trends.TotalReturned = append(trends.TotalReturned, v.TotalReturned)
	}

	return &trends, nil
}

func (s *service) FetchMostBorrowedBooks() (*presenter.MostBorrowedBook, error) {
	var res presenter.MostBorrowedBook
	data, err := s.repository.FetchMostBorrowedBooks()
	if err != nil {
		return nil, err
	}

	for _, v := range *data {
		res.Titles = append(res.Titles, v.Title)
		res.BorrowCounts = append(res.BorrowCounts, v.TotalBorrows)
	}

	return &res, nil
}

func (s *service) FetchBooksByCategory() (*presenter.BooksByCategory, error) {
	var res presenter.BooksByCategory
	data, err := s.repository.FetchBooksByCategory()
	if err != nil {
		return nil, err
	}

	for _, v := range *data {
		res.Categories = append(res.Categories, v.Category)
		res.Counts = append(res.Counts, v.TotalBooks)
	}

	return &res, nil
}
