package routes

import(
	"github.com/gin-gonic/gin"
)

func Setup_routes(router *gin.Engine) {
	router.GET("/auth/register", Handler.Create_user(database))
}