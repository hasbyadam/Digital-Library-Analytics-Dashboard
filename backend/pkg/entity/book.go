package entity

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Book struct {
	EmbeddedFields
	Title    string `json:"title"`
	Author   string `json:"author"`
	ISBN     string `json:"isbn"`
	Quantity int    `json:"quantity"`
	Category string `json:"category"`
}

type EmbeddedFields struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey;" json:"id"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

func (b *Book) BeforeCreate(tx *gorm.DB) (err error) {
    if b.ID == uuid.Nil {
        b.ID = uuid.New()
    }
    return
}