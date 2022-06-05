package main

import (
	"syscall"
)

var (
	native                    = syscall.NewLazyDLL("native.dll")
	nativeSendKeyDown         = native.NewProc("send_key_down")
	nativeSendKeyUp           = native.NewProc("send_key_up")
	nativeSendMouseButtonDown = native.NewProc("send_mouse_button_down")
	nativeSendMouseButtonUp   = native.NewProc("send_mouse_button_up")
	nativeSendMouseMove       = native.NewProc("send_mouse_move")
)

func sendKeyDown(key int) {
	_, _, _ = syscall.SyscallN(nativeSendKeyDown.Addr(), uintptr(key))
}

func sendKeyUp(key int) {
	_, _, _ = syscall.SyscallN(nativeSendKeyUp.Addr(), uintptr(key))
}

func sendMouseButtonDown(button int) {
	_, _, _ = syscall.SyscallN(nativeSendMouseButtonDown.Addr(), uintptr(button))
}

func sendMouseButtonUp(button int) {
	_, _, _ = syscall.SyscallN(nativeSendMouseButtonUp.Addr(), uintptr(button))
}

func sendMouseMove(dx, dy int) {
	_, _, _ = syscall.SyscallN(nativeSendMouseMove.Addr(), uintptr(dx), uintptr(dy))
}
