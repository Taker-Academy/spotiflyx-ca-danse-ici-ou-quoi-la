package database

import(
	"os"
	"fmt"
	"github.com/joho/godotenv"
	"spotiflix/database/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func load_env(database *models.Database) {
	godotenv.Load()

	database.Host = (os.Getenv("DB_HOST"))
	database.Port = (os.Getenv("DB_PORT"))
	database.Password = (os.Getenv("DB_PASSWORD"))
	database.User = (os.Getenv("DB_USER"))
}

func Init_database() (models.Database, error) {
	var new models.Database
	var err error

	load_env(&new)
	database_url := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
								new.Host, new.Port, new.User, new.Password, new.Name)
	new.DB, err = gorm.Open(postgres.Open(database_url), &gorm.Config{})
	if err != nil {
		return models.Database{}, err
	}
	new.DB.AutoMigrate(&models.User{})
	return new, nil
}