package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/book"
)

// AddBook is handler/controller which creates Books in the BookShop
func GetBooks(service book.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {

		return c.JSON("")
	}
}
