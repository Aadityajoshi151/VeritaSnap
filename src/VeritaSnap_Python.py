import keyboard
shortcut = "ctrl+shift+p"

def on_triggered():
    print("Screenshot code will go here")


print(f"Press {shortcut} To Take Scrrenshot")
keyboard.add_hotkey(shortcut, on_triggered)
keyboard.wait('esc')