import keyboard
import numpy as np
import cv2
import pyautogui
import pystray
from PIL import Image, ImageDraw


shortcut = "ctrl+shift+p"
icon = pystray.Icon('assets/landscape.png')
image = Image.new('RGB', (width, height), color1)
dc = ImageDraw.Draw(image)
dc.rectangle((width // 2, 0, width, height // 2), fill=color2)
dc.rectangle((0, height // 2, width // 2, height), fill=color2)

icon.image = image

def on_triggered():
    #print("Screenshot code will go here")
    image = pyautogui.screenshot()
    image = cv2.cvtColor(np.array(image),
                     cv2.COLOR_RGB2BGR)
    cv2.imwrite("image1.png", image)
    
print(f"Press {shortcut} To Take Screenshot")
keyboard.add_hotkey(shortcut, on_triggered)
keyboard.wait('esc')