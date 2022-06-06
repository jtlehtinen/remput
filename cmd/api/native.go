package main

import (
	"syscall"
)

var (
	native                     = syscall.NewLazyDLL("native.dll")
	nativeSendKeyDown          = native.NewProc("send_key_down")
	nativeSendKeyUp            = native.NewProc("send_key_up")
	nativeSendKey              = native.NewProc("send_key")
	nativeSendMouseButtonDown  = native.NewProc("send_mouse_button_down")
	nativeSendMouseButtonUp    = native.NewProc("send_mouse_button_up")
	nativeSendMouseButtonClick = native.NewProc("send_mouse_button_click")
	nativeSendMouseMove        = native.NewProc("send_mouse_move")
)

func sendKeyDown(key int) {
	_, _, _ = syscall.SyscallN(nativeSendKeyDown.Addr(), uintptr(key))
}

func sendKeyUp(key int) {
	_, _, _ = syscall.SyscallN(nativeSendKeyUp.Addr(), uintptr(key))
}

// sendKey sends a key down event followed by a key up event.
func sendKey(key int) {
	_, _, _ = syscall.SyscallN(nativeSendKey.Addr(), uintptr(key))
}

func sendMouseButtonDown(button int) {
	_, _, _ = syscall.SyscallN(nativeSendMouseButtonDown.Addr(), uintptr(button))
}

func sendMouseButtonUp(button int) {
	_, _, _ = syscall.SyscallN(nativeSendMouseButtonUp.Addr(), uintptr(button))
}

// sendMouseButtonClick sends a button down event followed by a button up event.
func sendMouseButtonClick(button int) {
	_, _, _ = syscall.SyscallN(nativeSendMouseButtonClick.Addr(), uintptr(button))
}

func sendMouseMove(dx, dy int) {
	_, _, _ = syscall.SyscallN(nativeSendMouseMove.Addr(), uintptr(dx), uintptr(dy))
}
