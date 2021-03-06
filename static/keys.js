const INVALID_KEY_CODE = -1;

function toKeyCode(key) {
  switch (key) {
    case '{bksp}': return 0x08;
    case '{tab}': return 0x09;
    case '{enter}': return 0x0A;
    case '{space}': return 0x20;
    case '!': return 0x21;
    case '"': return 0x22;
    case '#': return 0x23;
    case '$': return 0x24;
    case '%': return 0x25;
    case '&': return 0x26;
    case '\'': return 0x27;
    case '(': return 0x28;
    case ')': return 0x29;
    case '*': return 0x2A;
    case '+': return 0x2B;
    case ',': return 0x2C;
    case '-': return 0x2D;
    case '.': return 0x2E;
    case '/': return 0x2F;
    case '0': return 0x30;
    case '1': return 0x31;
    case '2': return 0x32;
    case '3': return 0x33;
    case '4': return 0x34;
    case '5': return 0x35;
    case '6': return 0x36;
    case '7': return 0x37;
    case '8': return 0x38;
    case '9': return 0x39;
    case ':': return 0x3A;
    case ';': return 0x3B;
    case '<': return 0x3C;
    case '=': return 0x3D;
    case '>': return 0x3E;
    case '?': return 0x3F;
    case '@': return 0x40;
    case 'A': return 0x41;
    case 'B': return 0x42;
    case 'C': return 0x43;
    case 'D': return 0x44;
    case 'E': return 0x45;
    case 'F': return 0x46;
    case 'G': return 0x47;
    case 'H': return 0x48;
    case 'I': return 0x49;
    case 'J': return 0x4A;
    case 'K': return 0x4B;
    case 'L': return 0x4C;
    case 'M': return 0x4D;
    case 'N': return 0x4E;
    case 'O': return 0x4F;
    case 'P': return 0x50;
    case 'Q': return 0x51;
    case 'R': return 0x52;
    case 'S': return 0x53;
    case 'T': return 0x54;
    case 'U': return 0x55;
    case 'V': return 0x56;
    case 'W': return 0x57;
    case 'X': return 0x58;
    case 'Y': return 0x59;
    case 'Z': return 0x5A;
    case '[': return 0x5B;
    case '\\': return 0x5C;
    case ']': return 0x5D;
    case '^': return 0x5E;
    case '_': return 0x5F;
    case '`': return 0x60;
    case 'a': return 0x61;
    case 'b': return 0x62;
    case 'c': return 0x63;
    case 'd': return 0x64;
    case 'e': return 0x65;
    case 'f': return 0x66;
    case 'g': return 0x67;
    case 'h': return 0x68;
    case 'i': return 0x69;
    case 'j': return 0x6A;
    case 'k': return 0x6B;
    case 'l': return 0x6C;
    case 'm': return 0x6D;
    case 'n': return 0x6E;
    case 'o': return 0x6F;
    case 'p': return 0x70;
    case 'q': return 0x71;
    case 'r': return 0x72;
    case 's': return 0x73;
    case 't': return 0x74;
    case 'u': return 0x75;
    case 'v': return 0x76;
    case 'w': return 0x77;
    case 'x': return 0x78;
    case 'y': return 0x79;
    case 'z': return 0x7A;
    case '{': return 0x7B;
    case '|': return 0x7C;
    case '}': return 0x7D;
    case '~': return 0x7E;
    case 'del': return 0x7F;

    case 'left': return 0x83;
    case 'right': return 0x84;
    case 'up': return 0x85;
    case 'down': return 0x86;
  }

  return INVALID_KEY_CODE;
}

function toButtonCode(button) {
  if (button === 0) return 0x80;
  if (button === 1) return 0x81;
  if (button === 2) return 0x82;
  return INVALID_KEY_CODE;
}


export { toKeyCode, toButtonCode, INVALID_KEY_CODE };
