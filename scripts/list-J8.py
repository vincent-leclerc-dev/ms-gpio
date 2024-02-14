#!/usr/bin/python

#####################################
#   Reset a GPIO on Raspberry Pi 5  #
#####################################

import json 
import sys
from J8 import listJ8

print(json.dumps(listJ8()))
sys.stdout.flush()