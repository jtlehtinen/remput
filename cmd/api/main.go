package main

import (
	"crypto/tls"
	"flag"
	"fmt"
	"net/http"
	"os"

	"github.com/skip2/go-qrcode"
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

	err = qrcode.WriteFile(fmt.Sprintf("http://%s:%d/static/", localIP, cfg.port), qrcode.Medium, 256, "./static/qr.png")
	if err != nil {
		return err
	}

	tlsConfig := &tls.Config{
		MinVersion:               tls.VersionTLS12,
		MaxVersion:               tls.VersionTLS13,
		PreferServerCipherSuites: true,
		CipherSuites: []uint16{
			tls.TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,
			tls.TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,
			tls.TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,
			tls.TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,
			tls.TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,
			tls.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,
		},
		CurvePreferences: []tls.CurveID{tls.X25519, tls.CurveP256},
	}

	server := &http.Server{
		Addr:      fmt.Sprintf(":%d", cfg.port),
		Handler:   app.routes(),
		TLSConfig: tlsConfig,
	}

	fmt.Printf("starting server at %s\n", server.Addr)
	return server.ListenAndServeTLS("./tls/cert.pem", "./tls/key.pem")
}

func main() {
	if err := run(); err != nil {
		fmt.Fprintf(os.Stderr, "%v", err)
	}
}
