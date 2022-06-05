package main

import (
	"html/template"
	"net/http"
)

func (app *application) routes() http.Handler {
	router := http.NewServeMux()

	fs := http.FileServer(http.Dir("./static"))
	router.Handle("/static/", http.StripPrefix("/static", fs))
	router.HandleFunc("/", app.help)
	router.HandleFunc("/ws", app.ws)

	return router
}

func (app *application) help(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.Header().Add("Allow", "GET")
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	if r.URL.Path != "/" {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	t, err := template.ParseFiles("./templates/help.tmpl")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	type templateData struct {
		IP   string
		Port int
	}

	data := templateData{
		IP:   app.localIP,
		Port: app.cfg.port,
	}

	t.Execute(w, data)
}
