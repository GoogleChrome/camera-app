#!/usr/bin/python

"""Resets the uvcvideo kernel module.

Call this script to reload the kernel module, which rebinds all of plugged in
USB camera. This should be done before performing any test case, since in case
of failures, previous tests might not have rebound the camera after unbinding.

To use, run as root: ./camera_reset.py
"""

import subprocess
import sys

# Starts the script.
def main():
  print 'Removing uvcvideo...'
  process_rmmod = subprocess.Popen(['rmmod', '-w', 'uvcvideo'], shell=False)
  process_rmmod.wait()
  # Ignore the return code, since the module may not be available if already
  # removed.

  # TODO(mtomasz): We should return an error if the device is mounted, but
  # rmmode failed, because of lack of permissions.

  process_modprobe = subprocess.Popen(['modprobe', 'uvcvideo'], shell=False)
  process_modprobe.wait()

  print 'Probing uvcvideo...'
  # Forward the return code, since mod probing must succeed.
  sys.exit(process_modprobe.returncode)

if __name__ == '__main__':
  main()

