package main

import (
	"encoding/json"
	"log"
)

const (
	MessageTypeKeyDown         = 0
	MessageTypeKeyUp           = 1
	MessageTypeMouseButtonDown = 2
	MessageTypeMouseButtonUp   = 3
	MessageTypeMouseMove       = 4
)

func (app *application) handleKeyDownMessage(message json.RawMessage) {
	type Message struct {
		Key int `json:"key"`
	}

	var m Message
	_ = json.Unmarshal(message, &m)
	sendKeyDown(m.Key)
	log.Printf("key down: %d", m.Key)
}

func (app *application) handleKeyUpMessage(message json.RawMessage) {
	type Message struct {
		Key int `json:"key"`
	}

	var m Message
	_ = json.Unmarshal(message, &m)
	sendKeyUp(m.Key)
	log.Printf("key up: %d", m.Key)
}

func (app *application) handleMouseButtonDown(message json.RawMessage) {
	type Message struct {
		Button int `json:"button"`
	}

	var m Message
	_ = json.Unmarshal(message, &m)
	sendMouseButtonDown(m.Button)
	log.Printf("button down: %d", m.Button)
}

func (app *application) handleMouseButtonUp(message json.RawMessage) {
	type Message struct {
		Button int `json:"button"`
	}

	var m Message
	_ = json.Unmarshal(message, &m)
	sendMouseButtonUp(m.Button)
	log.Printf("button up: %d", m.Button)
}

func (app *application) handleMouseMove(message json.RawMessage) {
	type Message struct {
		DeltaX int `json:"dx"`
		DeltaY int `json:"dy"`
	}

	var m Message
	_ = json.Unmarshal(message, &m)
	sendMouseMove(m.DeltaX, m.DeltaY)
	log.Printf("mouse move: %dx%d", m.DeltaX, m.DeltaY)
}

func (app *application) handleMessage(message []byte) {
	if len(message) == 0 {
		return
	}

	var m struct {
		Type    int `json:"type"`
		Message json.RawMessage
	}
	err := json.Unmarshal(message, &m)
	if err != nil {
		return
	}

	switch m.Type {
	case MessageTypeKeyDown:
		app.handleKeyDownMessage(m.Message)
	case MessageTypeKeyUp:
		app.handleKeyUpMessage(m.Message)
	case MessageTypeMouseButtonDown:
		app.handleMouseButtonDown(m.Message)
	case MessageTypeMouseButtonUp:
		app.handleMouseButtonUp(m.Message)
	case MessageTypeMouseMove:
		app.handleMouseMove(m.Message)
	}
}
