import sys
class colors:
    SUCCESS = '\033[92m'
    WARNING = '\033[93m'
    ERROR = '\033[91m'
    RESET = '\033[0m'

class GpioException(Exception): pass

def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)