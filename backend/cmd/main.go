package main

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/book"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/pkg/lending_record"
	"github.com/hasbyadam/Digital-Library-Analytics-Dashboard/rest/route"
	log "github.com/sirupsen/logrus"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/joho/godotenv"
)

func init() {
	//log config
	log.SetFormatter(&log.JSONFormatter{})

	//prepare enviroment variable
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	log.Info("Success loading .env file")
}

func main() {
	//prepare database
	dbHost := os.Getenv("DATABASE_HOST")
	dbPort := os.Getenv("DATABASE_PORT")
	dbUser := os.Getenv("DATABASE_USER")
	dbPass := os.Getenv("DATABASE_PASS")
	dbName := os.Getenv("DATABASE_NAME")
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		dbHost, dbPort, dbUser, dbPass, dbName, "disable")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}
	log.Info("Database connection success!")

	bookRepo := book.NewRepo(db)
	bookService := book.NewService(bookRepo)

	lendingRecordRepo := lendingRecord.NewRepo(db)
	lendingRecordService := lendingRecord.NewService(lendingRecordRepo, bookService)

	app := fiber.New()
	app.Use(cors.New())
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello Test")
	})

	api := app.Group("/api")
	v1 := api.Group("/v1")

	route.BookRouter(v1, bookService)
	route.LendingRecordRouter(v1, lendingRecordService)

	log.Fatal(app.Listen(":8080"))
}
