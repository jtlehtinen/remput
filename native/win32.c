#pragma comment(lib, "user32.lib")

#define WIN32_LEAN_AND_MEAN
#define NOMINMAX
#include <Windows.h>

__declspec(dllexport) void send_key_down(int key) {
  INPUT input = {
    .type = INPUT_KEYBOARD,
    .ki = {
      .wVk = key,
    },
  };

  if (SendInput(1, &input, sizeof(INPUT)) == 0) {
    DWORD err = GetLastError();
    // @TODO: handle error
  }
}

__declspec(dllexport) void send_key_up(int key) {
  INPUT input = {
    .type = INPUT_KEYBOARD,
    .ki = {
      .wVk = key,
      .dwFlags = KEYEVENTF_KEYUP,
    },
  };

  if (SendInput(1, &input, sizeof(INPUT)) == 0) {
    DWORD err = GetLastError();
    // @TODO: handle error
  }
}

__declspec(dllexport) void send_mouse_button_down(int button) {
  DWORD flags = 0;
  if (button == VK_LBUTTON) flags = MOUSEEVENTF_LEFTDOWN;
  if (button == VK_RBUTTON) flags = MOUSEEVENTF_RIGHTDOWN;
  if (button == VK_MBUTTON) flags = MOUSEEVENTF_MIDDLEDOWN;

  INPUT input = {
    .type = INPUT_MOUSE,
    .mi = {
      .dwFlags = flags,
    },
  };

  if (SendInput(1, &input, sizeof(INPUT)) == 0) {
    DWORD err = GetLastError();
    // @TODO: handle error
  }
}

__declspec(dllexport) void send_mouse_button_up(int button) {
  DWORD flags = 0;
  if (button == VK_LBUTTON) flags = MOUSEEVENTF_LEFTUP;
  if (button == VK_RBUTTON) flags = MOUSEEVENTF_RIGHTUP;
  if (button == VK_MBUTTON) flags = MOUSEEVENTF_MIDDLEUP;

  INPUT input = {
    .type = INPUT_MOUSE,
    .mi = {
      .dwFlags = flags,
    },
  };

  if (SendInput(1, &input, sizeof(INPUT)) == 0) {
    DWORD err = GetLastError();
    // @TODO: handle error
  }
}

__declspec(dllexport) void send_mouse_move(int dx, int dy) {
  INPUT input = {
    .type = INPUT_MOUSE,
    .mi = {
      .dx = dx,
      .dy = dy,
      .dwFlags = MOUSEEVENTF_MOVE,
    },
  };

  if (SendInput(1, &input, sizeof(INPUT)) == 0) {
    DWORD err = GetLastError();
    // @TODO: handle error
  }
}
