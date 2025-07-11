package entity

import "github.com/google/uuid"

type MonthlyTrend struct {
	MonthYear     string
	TotalBorrowed int
	TotalReturned int
}

type MostBorrowedBook struct {
	ID           uuid.UUID
	Title        string
	Author       string
	Category     string
	TotalBorrows int
}

type BooksByCategory struct {
	Category   string
	TotalBooks int
}
