package presenter

type MonthlyTrend struct {
	MonthYear     []string `json:"month_year"`
	TotalBorrowed []int    `json:"total_borrowed"`
	TotalReturned []int    `json:"total_returned"`
}
