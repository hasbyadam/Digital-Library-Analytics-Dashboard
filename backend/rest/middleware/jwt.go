package middleware

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

func JwtMiddleware(c *fiber.Ctx) error {

	auth := c.Get("Authorization")
	if auth == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing token"})
	}

	token, err := jwt.Parse(auth, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SECRET_KEY")), nil
	})
	if err != nil || !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid or expired token"})
	}

	return c.Next()
}

// Protected route handler
func Protected(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{"message": "Welcome to the protected route!"})
}
