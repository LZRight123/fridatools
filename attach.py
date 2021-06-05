from __future__ import print_function
import frida
import codecs
import threading
import traceback

def readScript(filePath):
    with codecs.open(filePath, 'r', 'utf-8') as f:
        source = f.read()
    return source

def attachProcess(name):
    try:
        threadEvent = threading.Event()
        device = frida.get_usb_device()
        print(device)
        session = device.attach(name) #注入进程获取session
        print(session)

        source = readScript('./interceptorNew.js')
        script = session.create_script(source)
        script.load() # 加载js脚本
        threadEvent.wait()
    except KeyboardInterrupt as interrupt:
        print("Keybord interrupt.")
    except Exception as e:
        print(repr(e))
        traceback.print_exc()
    finally:
        session.detach()
        print("Detach session. Exit hook program. ")

if __name__ == "__main__":
    attachProcess(u"企业微信")
