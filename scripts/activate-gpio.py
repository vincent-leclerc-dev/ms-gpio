#!/usr/bin/python

#########################################
#   Activate a GPIO on Raspberry Pi 5   #
#########################################

import ntpath, sys, time
import gpiod

from J8 import gpioExists
from utils import colors, GpioException

try:
    scriptName = ntpath.basename(sys.argv[0])

    if len(sys.argv) == 1 or len(sys.argv) > 3:
        raise GpioException(
            colors.ERROR + 'Error : bad arguments number\n' + 
            colors.WARNING + 'Usage: python ' + scriptName + ' gpio_bcm_id\n' +
            colors.SUCCESS + 'ex: "python ' + scriptName + ' 0"\n' +
            colors.WARNING + 'Usage with timer: python ' + scriptName + ' gpio_bcm_id execution_time_in_second\n' + 
            colors.SUCCESS + 'ex: "python ' + scriptName + ' 0 4"')
   
    gpioId = int(sys.argv[1])

    if gpioExists(gpioId) == False:
        raise GpioException(
            colors.ERROR + 'Error : bad gpio id'
        )

    during = None
    if len(sys.argv) == 3:
        during = int(sys.argv[2])

    # select chipset gpiomem4 where are the GPIO
    chip = gpiod.Chip('gpiochip4')

    # get the handle to the GPIO line at given offset
    pin_line = chip.get_line(gpioId)

    # request the GPIO with a label and type OUTPUT
    pin_line.request(consumer="PIN", type=gpiod.LINE_REQ_DIR_OUT)
    
    # set the GPIO status to 1
    pin_line.set_value(1)

    # release the line before the end of sleep
    # to allow to set value to 0 with another process manually
    pin_line.release() 

    # wait
    if during != None:

        time.sleep(during)
 
        # get the handle to the GPIO line at given offset
        pin_line = chip.get_line(gpioId)

        # request the GPIO with a label and type OUTPUT
        pin_line.request(consumer="PIN", type=gpiod.LINE_REQ_DIR_OUT)
    
        # set the GPIO status to 0
        pin_line.set_value(0)

        # reset the gpio parameters to prevent electrical damage that could happened
        pin_line.release()

except GpioException as e:
    print(e)
