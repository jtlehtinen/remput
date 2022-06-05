@echo off

set cflags=-nologo -O1 -LD
set lflags=-DEBUG:NONE

cl %cflags% win32.c /link %lflags% -OUT:native.dll
del *.obj
del *.lib
del *.exp

copy native.dll ../native.dll

