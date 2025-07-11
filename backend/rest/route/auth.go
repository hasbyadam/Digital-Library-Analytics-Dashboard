package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/handler"
)

func AuthRouter(app fiber.Router) {
	app.Post("/login", handler.Login)
}
