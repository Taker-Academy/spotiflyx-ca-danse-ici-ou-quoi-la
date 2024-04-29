package handler

import(
	"spotiflix/database/user_handling"
	"spotiflix/global_api/token"
	"io"
	"fmt"
	"encoding/json"
	"net/http"
	"strings"
	"github.com/gin-gonic/gin"
	"spotiflix/database/models"
)

func Get_user_response(Email string, Id string) (models.Response_user, error) {
	var to_return models.Response_user
	var err error

	to_return.Token, err = token.Generate_token(Id)
	if (err != nil) {
		return models.Response_user{}, err
	}
	to_return.Email = Email
	return to_return, nil
}

func Create_user(data_base models.Database) gin.HandlerFunc {
	fn := func(ctx *gin.Context) {
		json_data, err := io.ReadAll(ctx.Request.Body)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		var tmp models.New_user
		json.Unmarshal(json_data, &tmp)
		decoder := json.NewDecoder(strings.NewReader(string(json_data)))
		decoder.DisallowUnknownFields()
		err = decoder.Decode(&tmp)
		fmt.Println(decoder)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}
		_, err = user_handling.Find_user_by_email(data_base.DB, tmp.Email)
		if err == nil {
			ctx.JSON(http.StatusBadRequest, "email already found")
			return
		}
		id, err := user_handling.Insert_new_user(data_base.DB, tmp.Email, tmp.Password)
		response, err := Get_user_response(tmp.Email, id)
		ctx.JSON(http.StatusOK, response)
		return
	}
	return fn;
}