import sys
import os
import time
import threading
import webbrowser
import multiprocessing
from pathlib import Path
from PIL import Image
import uvicorn
from innovas.api_server import app

def print_pixelated_logo_and_welcome():
    if sys.platform == "win32":
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:
            pass
        os.system("")

    logo_path = None
    if getattr(sys, 'frozen', False):
        meipass_dir = Path(sys._MEIPASS)
        exe_dir = Path(sys.executable).parent
        candidates = [
            meipass_dir / "Innovaflow" / "LOGO.jpg",
            meipass_dir / "LOGO.jpg",
            exe_dir / "Innovaflow" / "LOGO.jpg",
            exe_dir / "LOGO.jpg"
        ]
        for c in candidates:
            if c.exists():
                logo_path = c
                break
    else:
        candidates = [
            Path(__file__).parent / "Innovaflow" / "LOGO.jpg",
            Path(__file__).parent / "LOGO.jpg"
        ]
        for c in candidates:
            if c.exists():
                logo_path = c
                break

    if logo_path and logo_path.exists():
        try:
            img = Image.open(logo_path)
            width = 54
            aspect_ratio = img.height / img.width
            height = int(width * aspect_ratio * 0.45)
            if height < 1:
                height = 1
            img = img.resize((width, height), Image.Resampling.LANCZOS).convert("RGB")
            ASCII_CHARS = [" ", "░", "▒", "▓", "█"]
            
            print("\n" + "=" * (width + 4))
            for y in range(height):
                line = "  "
                for x in range(width):
                    r, g, b = img.getpixel((x, y))
                    brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0
                    char_idx = min(int(brightness * len(ASCII_CHARS)), len(ASCII_CHARS) - 1)
                    char = ASCII_CHARS[char_idx]
                    line += f"\033[38;2;{r};{g};{b}m{char}\033[0m"
                print(line)
            print("=" * (width + 4) + "\n")
        except Exception as e:
            print(f"Notice: Could not display pixelated logo: {e}")

    welcome_box = """
  ========================================================================================
  ██╗███╗   ██╗███╗   ██╗██████╗ ██╗   ██╗ █████╗ ███████╗██╗     ██████╗ ██╗    ██╗
  ██║████╗  ██║████╗  ██║██╔══██╗██║   ██║██╔══██╗██╔════╝██║    ██╔═══██╗██║    ██║
  ██║██╔██╗ ██║██╔██╗ ██║██║  ██║██║   ██║███████║█████╗  ██║    ██║   ██║██║ █╗ ██║
  ██║██║╚██╗██║██║╚██╗██║██║  ██║██║   ██║██╔══██║██╔══╝  ██║    ██║   ██║██║███╗██║
  ██║██║ ╚████║██║ ╚████║██████╔╝╚██████╔╝██║  ██║██║     ███████╗╚██████╔╝╚███╔███╔╝
  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚══════╝ ╚═════╝  ╚══╝╚══╝
                        *** WELCOME TO INNOVAFLOW ***
  ========================================================================================
    """
    print(welcome_box)

def open_browser():
    time.sleep(1.5)
    if getattr(sys, 'frozen', False):
        exe_dir = Path(sys.executable).parent
        meipass_dir = Path(sys._MEIPASS)
        if (exe_dir / "index.html").exists():
            target_path = (exe_dir / "index.html").resolve()
        elif (meipass_dir / "index.html").exists():
            target_path = (meipass_dir / "index.html").resolve()
        else:
            target_path = (exe_dir / "index.html").resolve()
    else:
        target_path = (Path(__file__).parent / "index.html").resolve()

    webbrowser.open(target_path.as_uri())

if __name__ == "__main__":
    multiprocessing.freeze_support()
    if os.environ.get("INNOVAFLOW_BANNER_SHOWN") != "1":
        os.environ["INNOVAFLOW_BANNER_SHOWN"] = "1"
        print_pixelated_logo_and_welcome()
        threading.Thread(target=open_browser, daemon=True).start()
    uvicorn.run(app, host="127.0.0.1", port=8001, log_level="info")
