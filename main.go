package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"
)

type config struct {
	port int
}

type application struct {
	cfg     config
	localIP string
}

func run() error {
	var cfg config
	flag.IntVar(&cfg.port, "p", 3000, "server port")
	flag.Parse()

	app := &application{
		cfg: cfg,
	}

	localIP, err := getLocalIPAddress()
	if err != nil {
		return err
	}
	app.localIP = localIP

	server := &http.Server{
		Addr:    fmt.Sprintf(":%d", cfg.port),
		Handler: app.routes(),
	}

	fmt.Printf("starting server at %s\n", server.Addr)
	return server.ListenAndServe()
}

func main() {
	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "%v", err)
	}
}
