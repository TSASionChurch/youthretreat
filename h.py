from PIL import Image
import os
"""if path doesnt exist add"""
path_to_image="grp1.png"
if not os.path.exists("webp/grp1.webp"):
    img = Image.open(path_to_image)
    img.save("webp/grp1.webp", "WEBP", quality=90)

print("Converted successfully!")