package models

import (
	"gorm.io/gorm"
)

type Database struct {
	Host string
	Port string
	Password string
	User string
	Name string
	DB *gorm.DB
}

type User struct {
	Id       string `gorm:"primaryKey" json:"Id"`
	Email string `json:"email"`
	Password string `json:"password"`
	Musics []string `json:"musics"`
}

type New_user struct {
	Email string `json:"email"`
	Password string `json:"password"`
}