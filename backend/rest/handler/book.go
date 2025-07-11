package handler

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/book"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/entity"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/presenter"
)

// AddBook is handler/controller which creates Books in the BookShop
func AddBook(service book.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var requestBody entity.Book
		err := c.BodyParser(&requestBody)
		if err != nil {
			c.Status(http.StatusBadRequest)
			return c.JSON(presenter.ErrorResponse(err))
		}
		if requestBody.Author == "" || requestBody.Title == "" {
			c.Status(http.StatusInternalServerError)
			return c.JSON(presenter.ErrorResponse(errors.New(
				"please specify title and author")))
		}
		result, err := service.InsertBook(&requestBody)
		if err != nil {
			c.Status(http.StatusInternalServerError)
			return c.JSON(presenter.ErrorResponse(err))
		}
		return c.JSON(presenter.SuccessResponse(result))
	}
}

func GetBooks(service book.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {
		result, err := service.FetchBook()
		if err != nil {
			c.Status(http.StatusInternalServerError)
			return c.JSON(presenter.ErrorResponse(err))
		}
		return c.JSON(presenter.SuccessResponse(result))
	}
}

func UpdateBook(service book.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {
		id := c.Params("id")
		if id == "" {
			c.Status(http.StatusBadRequest)
			return c.JSON(presenter.ErrorResponse(fmt.Errorf("missing book ID in path")))
		}

		idParsed, err := uuid.Parse(id)
		if err != nil {
			c.Status(http.StatusBadRequest)
			return c.JSON(presenter.ErrorResponse(errors.New("invalid id")))
		}

		var requestBody entity.Book
		err = c.BodyParser(&requestBody)
		if err != nil {
			c.Status(http.StatusBadRequest)
			return c.JSON(presenter.ErrorResponse(err))
		}

		requestBody.ID = idParsed
		result, err := service.UpdateBook(&requestBody)
		if err != nil {
			c.Status(http.StatusInternalServerError)
			return c.JSON(presenter.ErrorResponse(err))
		}

		return c.JSON(presenter.SuccessResponse(result))
	}
}

func RemoveBook(service book.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {
		id := c.Params("id")
		if id == "" {
			c.Status(http.StatusBadRequest)
			return c.JSON(presenter.ErrorResponse(fmt.Errorf("missing book ID in path")))
		}

		idParsed, err := uuid.Parse(id)
		if err != nil {
			c.Status(http.StatusBadRequest)
			return c.JSON(presenter.ErrorResponse(errors.New("invalid id")))
		}

		err = service.RemoveBook(idParsed)
		if err != nil {
			c.Status(http.StatusInternalServerError)
			return c.JSON(presenter.ErrorResponse(err))
		}

		return c.JSON(&fiber.Map{
			"status": true,
			"data":   "deleted successfully",
			"err":    nil,
		})
	}
}
