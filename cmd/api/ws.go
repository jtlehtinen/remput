package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

const (
	MessageTypeKey             = 0
	MessageTypeMouseButtonDown = 1
	MessageTypeMouseButtonUp   = 2
	MessageTypeMouseMove       = 3
)

const (
	socketBufferSize  = 1024
	messageBufferSize = 256
)

var upgrader = &websocket.Upgrader{
	ReadBufferSize:  socketBufferSize,
	WriteBufferSize: socketBufferSize,
}

func (app *application) handleKey(key string) {
	log.Printf("key: %s", key)
}

func (app *application) handleMessage(message []byte) {
	if len(message) == 0 {
		return
	}

	type msg struct {
		Type int `json:"type"`
		Data any `json:"data"`
	}

	var m msg
	err := json.Unmarshal(message, &m)
	if err != nil {
		return
	}

	switch m.Type {
	case MessageTypeKey:
		app.handleKey(m.Data.(string))
	}
}

func (app *application) ws(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer c.Close()

	for {
		mt, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		app.handleMessage(message)

		err = c.WriteMessage(mt, message)
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}
