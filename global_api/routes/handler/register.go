package handler

import(
	"spotiflix/database/user_handling"
	"io"
	"encoding/json"
	"net/http"
	"strings"
	"github.com/gin-gonic/gin"
	"spotiflix/database/models"
)

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
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}
		_, err = user_handling.Find_user_by_email(data_base.DB, tmp.Email)
		if err == nil {
			ctx.JSON(http.StatusBadRequest, "email already found")
			return
		}
		user_handling.Insert_new_user(data_base.DB, tmp.Email, tmp.Password)
	}
	return fn;
}