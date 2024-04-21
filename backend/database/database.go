package database

import(
	"os"
	"fmt"
	"github.com/joho/godotenv"
	"spotiflix/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func (database *models.database)load_env() (error) {
	godotenv.Load()

	database.Host = (os.Getenv("DB_HOST"))
	database.Port = (os.Getenv("DB_PORT"))
	database.Password = (os.Getenv("DB_PASSWORD"))
	database.User = (os.Getenv("DB_USER"))
}

func init_database() (models.database, error) {
	var new models.database

	err := new.load_env() 
	if err != nil {
		return (nil, err)
	}
	database_url := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
								new.Host, new.Port, new.User, new.Password, new.Name)
	new.DB, err = gorm.Open(postgres.Open(database_url), &gorm.Config{})
	if err != nil {
		return (nil, err)
	}
	new.DB.AutoMigrate(&models.user{})
	return (new, nil)
}