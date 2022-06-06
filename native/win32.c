#pragma comment(lib, "user32.lib")

#define WIN32_LEAN_AND_MEAN
#define NOMINMAX
#include <Windows.h>
#include <stdio.h>

const int INVALID_KEY = -1;

static int to_vkcode(int key) {
  switch (key) {
    case 0x08: return VK_BACK;
    case 0x09: return VK_TAB;
    case 0x0A: return VK_RETURN;
    case 0x1B: return VK_ESCAPE;
    case 0x7F: return VK_DELETE;
    case 0x80: return VK_LBUTTON;
    case 0x81: return VK_MBUTTON;
    case 0x82: return VK_RBUTTON;
    case 0x83: return VK_LEFT;
    case 0x84: return VK_RIGHT;
    case 0x85: return VK_UP;
    case 0x86: return VK_DOWN;
  }
  return INVALID_KEY;
}

static int is_ascii(int key) {
  return key >= 0x20 && key <= 0x7e;
}

static void send_key_event(int key, DWORD flags) {
  // @TODO: Validate key...
  INPUT input = {0};
  input.type = INPUT_KEYBOARD;
  input.ki.wVk = key;
  input.ki.dwFlags = flags;
  SendInput(1, &input, sizeof(INPUT));
}

static void send_character(int c) {
  INPUT input = {0};
  input.type = INPUT_KEYBOARD;
  input.ki.dwFlags = KEYEVENTF_UNICODE;
  input.ki.wScan = c;
  SendInput(1, &input, sizeof(INPUT));
}

__declspec(dllexport) void send_key(int key) {
  if (is_ascii(key)) {
    send_character(key);
  } else {
    key = to_vkcode(key);
    if (key != INVALID_KEY) {
      send_key_event(key, 0);
      send_key_event(key, KEYEVENTF_KEYUP);
    }
  }
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
  button = to_vkcode(button);
  switch (button) {
    case VK_LBUTTON: send_mouse_event(0, 0, MOUSEEVENTF_LEFTDOWN); break;
    case VK_RBUTTON: send_mouse_event(0, 0, MOUSEEVENTF_RIGHTDOWN); break;
    case VK_MBUTTON: send_mouse_event(0, 0, MOUSEEVENTF_MIDDLEDOWN); break;
  }
}

__declspec(dllexport) void send_mouse_button_up(int button) {
  button = to_vkcode(button);
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
