package entity

import (
	"time"

	"github.com/google/uuid"
	"gopkg.in/guregu/null.v4"
	"gorm.io/gorm"
)

type LendingRecord struct {
	EmbeddedFields
	BookID     uuid.UUID `json:"book_id"`
	Borrower   string    `json:"borrower"`
	BorrowDate time.Time `json:"borrow_date"`
	ReturnDate null.Time `json:"return_date"`
}

func (b *LendingRecord) BeforeCreate(tx *gorm.DB) (err error) {
	if b.ID == uuid.Nil {
		b.ID = uuid.New()
	}
	return
}
