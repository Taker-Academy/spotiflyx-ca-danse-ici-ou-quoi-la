package user_handling

import(
	"errors"
	"spotiflix/database/models"
	"github.com/google/uuid"
)

func (database *gorm.DB)Find_user_by_email(email string) (models.user, error){
	var user models.user

	result := database.First(&user, "email = ?", email).Select(email)
	if result.RowsAffected == 0 {
		return nil, errors.New("email not found")
	}
	return user, nil
}

func (database *gorm.DB)Insert_new_user(email string, password string) error {
	check, err := Find_user_by_email(email)
	if err != nil {
		return errors.New("email allready used");
	}
	var new models.user
	new.Id = uuid.NewString()
	new.Email = email
	new.Password = hash.Hash_password(password)

	database.Create(new)
	return nil
}