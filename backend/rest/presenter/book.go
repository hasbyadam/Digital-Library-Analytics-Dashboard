package presenter

import (
	"github.com/gofiber/fiber/v2"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/entity"
)

// Book is the presenter object which will be passed in the response by Handler
type Book struct {
	
}

// BookSuccessResponse is the singular SuccessResponse that will be passed in the response by
// Handler
func BookSuccessResponse(data *entity.Book) *fiber.Map {
	book := Book{
		
	}
	return &fiber.Map{
		"status": true,
		"data":   book,
		"error":  nil,
	}
}

// BooksSuccessResponse is the list SuccessResponse that will be passed in the response by Handler
func BooksSuccessResponse(data *[]Book) *fiber.Map {
	return &fiber.Map{
		"status": true,
		"data":   data,
		"error":  nil,
	}
}

// BookErrorResponse is the ErrorResponse that will be passed in the response by Handler
func BookErrorResponse(err error) *fiber.Map {
	return &fiber.Map{
		"status": false,
		"data":   "",
		"error":  err.Error(),
	}
}
