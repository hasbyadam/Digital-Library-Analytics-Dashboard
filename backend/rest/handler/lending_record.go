package handler

import (
	"errors"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/entity"
	lendingRecord "github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/lending_record"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/presenter"
)

func AddLendingRecord(service lendingRecord.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {
		bookId := c.Params("bookId")
		if bookId == "" {
			c.Status(http.StatusBadRequest)
			return c.JSON(presenter.ErrorResponse(errors.New("missing bookId in path")))
		}
		bookIdParsed, err := uuid.Parse(bookId)
		if  err != nil {
			c.Status(http.StatusBadRequest)
			return c.JSON(presenter.ErrorResponse(errors.New("invalid bookId")))
		}

		var requestBody entity.LendingRecord
		err = c.BodyParser(&requestBody)
		if err != nil {
			c.Status(http.StatusBadRequest)
			return c.JSON(presenter.ErrorResponse(err))
		}

		if requestBody.Borrower == "" || requestBody.BorrowDate.IsZero() {
			c.Status(http.StatusInternalServerError)
			return c.JSON(presenter.ErrorResponse(errors.New("please specify borrower and borrow date")))
		}

		result, err := service.InsertLendingRecord(&entity.LendingRecord{
			BookID:     bookIdParsed,
			Borrower:   requestBody.Borrower,
			BorrowDate: requestBody.BorrowDate,
		})
		if err != nil {
			c.Status(http.StatusInternalServerError)
			return c.JSON(presenter.ErrorResponse(err))
		}
		return c.JSON(presenter.SuccessResponse(result))
	}
}

func ReturnBook(service lendingRecord.Service) fiber.Handler {
    return func(c *fiber.Ctx) error {
        id := c.Params("id")
        if id == "" {
            c.Status(http.StatusBadRequest)
            return c.JSON(presenter.ErrorResponse(errors.New("missing id in path")))
        }

        idParsed, err := uuid.Parse(id)
        if err != nil {
            c.Status(http.StatusBadRequest)
            return c.JSON(presenter.ErrorResponse(errors.New("invalid id")))
        }

        var lendingRecord entity.LendingRecord
        err = c.BodyParser(&lendingRecord)
        if err != nil {
            c.Status(http.StatusBadRequest)
            return c.JSON(presenter.ErrorResponse(errors.New("invalid request body")))
        }

        // Validate return date
        if lendingRecord.ReturnDate.IsZero() {
            c.Status(http.StatusBadRequest)
            return c.JSON(presenter.ErrorResponse(errors.New("return date is required")))
        }

        result, err := service.ReturnBook(lendingRecord.ReturnDate.Time, idParsed)
        if err != nil {
            c.Status(http.StatusInternalServerError)
            return c.JSON(presenter.ErrorResponse(err))
        }

        return c.JSON(presenter.SuccessResponse(result))
    }
}

func FetchLendingRecords(service lendingRecord.Service) fiber.Handler {
    return func(c *fiber.Ctx) error {
        lendingRecords, err := service.FetchLendingRecords()
        if err != nil {
            c.Status(http.StatusInternalServerError)
            return c.JSON(presenter.ErrorResponse(err))
        }

        return c.JSON(presenter.SuccessResponse(lendingRecords))
    }
}

func RemoveLendingRecord(service lendingRecord.Service) fiber.Handler {
	return func(c *fiber.Ctx) error {
		id := c.Params("id")
		if id == "" {
			c.Status(http.StatusBadRequest)
			return c.JSON(presenter.ErrorResponse(errors.New("missing id in path")))
		}

		idParsed, err := uuid.Parse(id)
		if err != nil {
			c.Status(http.StatusBadRequest)
			return c.JSON(presenter.ErrorResponse(errors.New("invalid id")))
		}

		err = service.RemoveLendingRecord(idParsed)
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






