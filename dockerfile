FROM golang:1.22.1

WORKDIR /app/spotiflix/

COPY . .

RUN go mod tidy

RUN go build -o spotiflix

EXPOSE 8080

CMD ["./spotiflix"]