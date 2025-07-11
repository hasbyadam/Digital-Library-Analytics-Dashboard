package statistic

import "github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/presenter"

// Service is an interface from which our api module can access our repository of all our models
type Service interface {
	FetchMonthlyTrend() (*presenter.MonthlyTrend, error)
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
