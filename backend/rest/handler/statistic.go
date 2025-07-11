package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/statistic"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/presenter"
)

// GetMonthlyTrend returns the monthly trend of lending records
func GetMonthlyTrend(s statistic.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {
		trend, err := s.FetchMonthlyTrend()
		if err != nil {
			c.Status(fiber.StatusInternalServerError)
			return c.JSON(presenter.ErrorResponse(err))
		}

		return c.JSON(presenter.SuccessResponse(trend))
	}
}

func GetMostBorrowedBook(s statistic.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {
		trend, err := s.FetchMostBorrowedBooks()
		if err != nil {
			c.Status(fiber.StatusInternalServerError)
			return c.JSON(presenter.ErrorResponse(err))
		}

		return c.JSON(presenter.SuccessResponse(trend))
	}
}

func GetBooksByCategory(s statistic.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {
		trend, err := s.FetchBooksByCategory()
		if err != nil {
			c.Status(fiber.StatusInternalServerError)
			return c.JSON(presenter.ErrorResponse(err))
		}

		return c.JSON(presenter.SuccessResponse(trend))
	}
}
