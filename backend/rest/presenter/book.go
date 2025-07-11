package presenter

import (
	"github.com/google/uuid"
)

// Book is the presenter object which will be passed in the response by Handler
type Book struct {
	Id       uuid.UUID `json:"id"`
	Title    string    `json:"title"`
	Author   string    `json:"author"`
	ISBN     string    `json:"isbn"`
	Quantity int       `json:"quantity"`
	Category string    `json:"category"`
}
