package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/statistic"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/handler"
)

func StatisticRouter(app fiber.Router, service statistic.Service) {
	statistic := app.Group("/statistic")
	statistic.Get("/monthly-trend", handler.GetMonthlyTrend(service))
	statistic.Get("/most-borrowed-book", handler.GetMostBorrowedBook(service))
	statistic.Get("/books-by-category", handler.GetBooksByCategory(service))
}
