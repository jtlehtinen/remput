package main

import (
	"errors"
	"net"
	"strings"
)

var errorLocalIPNotFound = errors.New("ip not found")

func getLocalIPAddress() (string, error) {
	ifaces, err := net.Interfaces()
	if err != nil {
		return "", err
	}

	for _, i := range ifaces {
		virtual := strings.HasPrefix(i.Name, "vEthernet")
		up := (i.Flags & net.FlagUp) != 0
		if virtual || !up {
			continue
		}

		addrs, err := i.Addrs()
		if err != nil {
			return "", err
		}

		for _, addr := range addrs {
			if v, ok := addr.(*net.IPNet); ok {
				if v.IP.To4() != nil && !v.IP.IsLoopback() && v.IP.IsPrivate() && !v.IP.IsMulticast() {
					return v.IP.String(), nil
				}
			}
		}
	}
	return "", errorLocalIPNotFound
}
