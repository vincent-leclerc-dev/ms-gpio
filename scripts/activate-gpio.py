#!/usr/bin/python

#########################################
#   Activate a GPIO on Raspberry Pi 5   #
#########################################

import argparse, ntpath, os, sys, time
import gpiod

from J8 import gpioExists
from utils import eprint, GpioException

try:
    scriptName = ntpath.basename(sys.argv[0])

    parser = argparse.ArgumentParser(prog='python ' + scriptName, usage='%(prog)s [options]')

    parser.add_argument('gpio_id', help='id of gpio, ex: 0', type=int)
    parser.add_argument('-t', help='time in seconds, ex: -t 4', type=int)

    args = parser.parse_args()

    gpioId = args.gpio_id
    during = args.t

    if gpioExists(gpioId) == False:
        raise GpioException('gpio id was not found')

    dir = os.listdir('/dev/gpiochip4')
    if len(dir) == 0: 
        raise GpioException('gpiochip4 was not found')

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
    eprint(e)
