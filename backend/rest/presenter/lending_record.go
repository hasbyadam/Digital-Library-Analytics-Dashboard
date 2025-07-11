package presenter

import (
	"time"

	"github.com/google/uuid"
	"gopkg.in/guregu/null.v4"
)

type LendingRecord struct {
	ID         uuid.UUID `json:"id"`
	*Book      `json:"book"`
	Borrower   string    `json:"borrower"`
	BorrowDate time.Time `json:"borrow_date"`
	ReturnDate null.Time `json:"return_date,omitempty"`
}
