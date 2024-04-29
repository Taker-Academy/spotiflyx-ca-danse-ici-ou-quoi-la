package handler

import(
	"spotiflix/database/hash"
	"spotiflix/global_api/token"
	"encoding/json"
	"net/http"
	"io"
	"strings"
	"github.com/gin-gonic/gin"
	"spotiflix/database/models"
)

func Update_user(data_base models.Database) gin.HandlerFunc {
	fn := func(ctx *gin.Context) {
		token_id, err, code := token.Verify_token(ctx)
		if err != nil {
			ctx.JSON(code, err)
			return
		}
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
		result := data_base.DB.Model(models.User{}).Where("id = ?", token_id).Updates(
			models.User{Email: tmp.Email, Password: hash.Hash_password(tmp.Password)})
		if (result.Error != nil) {
			ctx.JSON(http.StatusInternalServerError, result.Error)
			return
		}
		response, err := Get_user_response(tmp.Email, token_id)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, err)
			return
		}
		ctx.JSON(http.StatusOK, response)
		return
	}
	return fn
}
