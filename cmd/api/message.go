package main

import (
	"encoding/json"
	"log"
)

const (
	MessageTypeKey             = 0
	MessageTypeMouseButtonDown = 1
	MessageTypeMouseButtonUp   = 2
	MessageTypeMouseMove       = 3
)

func (app *application) handleKeyMessage(message json.RawMessage) {
	type Message struct {
		Key int `json:"key"`
	}

	var m Message
	_ = json.Unmarshal(message, &m)
	sendKey(m.Key)
	log.Printf("key down: %d", m.Key)
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
	case MessageTypeKey:
		app.handleKeyMessage(m.Message)
	case MessageTypeMouseButtonDown:
		app.handleMouseButtonDown(m.Message)
	case MessageTypeMouseButtonUp:
		app.handleMouseButtonUp(m.Message)
	case MessageTypeMouseMove:
		app.handleMouseMove(m.Message)
	}
}
