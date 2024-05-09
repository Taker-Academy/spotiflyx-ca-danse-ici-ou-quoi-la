FROM golang:1.22.1

WORKDIR /app/spotiflix/

RUN go install github.com/cespare/reflex@latest

COPY . .

RUN go mod tidy

RUN go build -o spotiflix

EXPOSE 8080

CMD reflex -s -g "*.go" go run main.go