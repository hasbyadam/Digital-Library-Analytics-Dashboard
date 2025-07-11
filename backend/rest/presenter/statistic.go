package presenter

type MonthlyTrend struct {
	MonthYear     []string `json:"month_year"`
	TotalBorrowed []int    `json:"total_borrowed"`
	TotalReturned []int    `json:"total_returned"`
}

type MostBorrowedBook struct {
	Titles       []string `json:"titles"`
	BorrowCounts []int    `json:"borrow_counts"`
}

type BooksByCategory struct {
	Categories []string `json:"categories"`
	Counts     []int    `json:"counts"`
}
