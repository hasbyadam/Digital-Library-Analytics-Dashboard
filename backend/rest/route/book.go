package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/book"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/handler"
)

// BookRouter is the Router for GoFiber App
func BookRouter(app fiber.Router, service book.Service) {
	app.Get("/book", handler.GetBooks(service))
	app.Post("/book", handler.AddBook(service))
	app.Put("/book/:id", handler.UpdateBook(service))
	app.Delete("/book/:id", handler.RemoveBook(service))
}



