package route

import (
	"github.com/gofiber/fiber/v2"
	lendingRecord "github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/lending_record"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/handler"
)

// BookRouter is the Router for GoFiber App
func LendingRecordRouter(app fiber.Router, service lendingRecord.Service) {
	lendingRecord := app.Group("/lending-record")
	lendingRecord.Post("/:bookId", handler.AddLendingRecord(service))
	lendingRecord.Put("/:id", handler.ReturnBook(service))
	lendingRecord.Get("/", handler.FetchLendingRecords(service))
	lendingRecord.Delete("/:id", handler.RemoveLendingRecord(service))
}
