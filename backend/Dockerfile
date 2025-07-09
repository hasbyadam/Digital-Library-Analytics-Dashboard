# Start from golang:1.23-alpine base image
FROM golang:1.23-alpine AS build-env

RUN apk update && apk add --no-cache git

WORKDIR /app

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Build the Go app
RUN go build -o main ./cmd/*.go

EXPOSE 8081

# Run the executable
ENTRYPOINT ["./main"]