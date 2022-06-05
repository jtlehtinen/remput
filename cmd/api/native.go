package main

import (
	"syscall"
)

var (
	native        = syscall.NewLazyDLL("native.dll")
	nativeSendKey = native.NewProc("send_key")
)

func sendKey(key int) {
	_, _, _ = syscall.Syscall(nativeSendKey.Addr(), 1, uintptr(key), 0, 0)
}
