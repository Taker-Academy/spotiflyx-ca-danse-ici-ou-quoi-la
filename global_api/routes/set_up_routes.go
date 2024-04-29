package routes

import(
	"spotiflix/global_api/routes/handler"
	"spotiflix/database/models"
	"github.com/gin-gonic/gin"
)


func Setup_routes(router *gin.Engine, data_base models.Database) {
	router.POST("/auth/register", handler.Create_user(data_base))
	router.POST("/auth/login", handler.Login(data_base))
	router.POST("/auth/update", handler.Update_user(data_base))
}