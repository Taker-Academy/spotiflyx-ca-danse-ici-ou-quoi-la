package models

import (
	"gorm.io/gorm"
)

type database struct {
	Host string
	Port string
	Password string
	User string
	Name string
	DB *gorm.DB
}

type user struct {
	Id       string `gorm:"primaryKey" json:"Id"`
	Email string `json:"email"`
	Password string `json:"password"`
}

type