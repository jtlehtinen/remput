#pragma comment(lib, "user32.lib")

#define WIN32_LEAN_AND_MEAN
#define NOMINMAX
#include <Windows.h>

static void send_key_event(int key, DWORD flags) {
  // @TODO: Validate key...
  INPUT input = {0};
  input.type = INPUT_KEYBOARD;
  input.ki.wVk = key;
  input.ki.dwFlags = flags;
  SendInput(1, &input, sizeof(INPUT));
}

__declspec(dllexport) void send_key_down(int key) {
  send_key_event(key, 0);
}

__declspec(dllexport) void send_key_up(int key) {
  send_key_event(key, KEYEVENTF_KEYUP);
}

__declspec(dllexport) void send_key(int key) {
  send_key_down(key);
  send_key_up(key);
}

static void send_mouse_event(int dx, int dy, DWORD flags) {
  INPUT input = {0};
  input.type = INPUT_MOUSE;
  input.mi.dx = dx;
  input.mi.dy = dy;
  input.mi.dwFlags = flags;
  SendInput(1, &input, sizeof(INPUT));
}

__declspec(dllexport) void send_mouse_button_down(int button) {
  switch (button) {
    case VK_LBUTTON: send_mouse_event(0, 0, MOUSEEVENTF_LEFTDOWN); break;
    case VK_RBUTTON: send_mouse_event(0, 0, MOUSEEVENTF_RIGHTDOWN); break;
    case VK_MBUTTON: send_mouse_event(0, 0, MOUSEEVENTF_MIDDLEDOWN); break;
  }
}

__declspec(dllexport) void send_mouse_button_up(int button) {
  switch (button) {
    case VK_LBUTTON: send_mouse_event(0, 0, MOUSEEVENTF_LEFTUP); break;
    case VK_RBUTTON: send_mouse_event(0, 0, MOUSEEVENTF_RIGHTUP); break;
    case VK_MBUTTON: send_mouse_event(0, 0, MOUSEEVENTF_MIDDLEUP); break;
  }
}

__declspec(dllexport) void send_mouse_button_click(int button) {
  send_mouse_button_down(button);
  send_mouse_button_up(button);
}

__declspec(dllexport) void send_mouse_move(int dx, int dy) {
  send_mouse_event(dx, dy, MOUSEEVENTF_MOVE);
}
