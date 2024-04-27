package user_handling

import(
	"errors"
	"spotiflix/database/hash"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type user struct {
	Id       string `gorm:"primaryKey" json:"Id"`
	Email string `json:"email"`
	Password string `json:"password"`
	Musics []string `json:"musics"`
}

func Find_user_by_email(database *gorm.DB, email string) (user, error){
	var search_user user

	result := database.First(&search_user, "email = ?", email).Select(email)
	if result.RowsAffected == 0 {
		return user{}, errors.New("email not found")
	}
	return search_user, nil
}

func Insert_new_user(database *gorm.DB, email string, password string) error {
	_, err := Find_user_by_email(database, email)
	if err != nil {
		return errors.New("email allready used");
	}
	var new user
	new.Id = uuid.NewString()
	new.Email = email
	new.Password = hash.Hash_password(password)
	new.Musics = []string{}

	database.Create(new)
	return nil
}