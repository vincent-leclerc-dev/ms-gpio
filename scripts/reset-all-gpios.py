#!/usr/bin/python

#########################################
#   Reset all GPIO on Raspberry Pi 5    #
#########################################

import gpiod

from J8 import getGpios
from utils import GpioException

try:
    # select memory where are the GPIO
    chip = gpiod.Chip('gpiochip4')

    # use the J8 definition
    for gpioId in getGpios():
        # Get the handle to the GPIO at given offset
        pin_line = chip.get_line(gpioId)

        # Request GPIO with a label and type OUTPUT
        pin_line.request(consumer="PIN", type=gpiod.LINE_REQ_DIR_OUT)
        
        # set GPIO status to 0
        pin_line.set_value(0)

        # release GPIO to prevent electrical damage that could happened
        pin_line.release()

except GpioException as e:
    print(e)
