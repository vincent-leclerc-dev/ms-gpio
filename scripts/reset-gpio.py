#!/usr/bin/python

#####################################
#   Reset a GPIO on Raspberry Pi 5  #
#####################################

import ntpath, sys
import gpiod

from J8 import gpioExists
from utils import colors, GpioException

try:
    scriptName = ntpath.basename(sys.argv[0])

    if len(sys.argv) != 2:
        raise GpioException(
            colors.ERROR + 'Error : bad arguments number\n' + 
            colors.WARNING + 'Usage: python ' + scriptName + ' gpio_bcm_id ' + 
            colors.SUCCESS +'\nex: "python ' + scriptName + ' 0"'
        )
   
    gpioId = int(sys.argv[1])

    if gpioExists(gpioId) == False:
        raise GpioException(
            colors.ERROR + 'Error : bad gpio id'
        )
    
    # select memory where are the GPIO
    chip = gpiod.Chip('gpiochip4')

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
