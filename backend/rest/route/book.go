package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/book"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/handler"
)

// BookRouter is the Router for GoFiber App
func BookRouter(app fiber.Router, service book.Service) {
	book := app.Group("/book")
	book.Get("/", handler.GetBooks(service))
	book.Post("/", handler.AddBook(service))
	book.Put("/:id", handler.UpdateBook(service))
	book.Delete("/:id", handler.RemoveBook(service))
}



