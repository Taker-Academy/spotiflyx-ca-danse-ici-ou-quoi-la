package main

import(
	"spotiflix_global_api/cors_handler"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors_handler.Setup_Header())

	//routes.Setup_routes(router, database)
	router.Run("0.0.0.0:8080")
}
