---
layout: post
title: "Use Raspberry Pi VNC with macOS Screen Sharing"
date: 2019-12-18 08:00:00 -0800
last-updated: 2019-12-18
tags: raspberrypi vnc macos
---

## The Summary

Using a Raspberry Pi via ssh is the way I interact with these little computers sitting around, but sometimes it is nice to see the screen. Enter VNC.

## The Problem

Nearly everytime I have setup a new Raspberry Pi and attempted to use the native Screen Sharing app to control them over VNC with my MacBook the first time I am treated to an Error Message reading:

```
The software on the remote computer appears to be
incompatible with this version of Screen Sharing.
```

## The Solution

These steps need to be followed on the Raspberry Pi. This can be done over ssh or directly on the Pi itself.

### Step 1 - Enable VNC on the Raspberry Pi

Open a terminal and enter

```
> sudo raspi-config
```

Navigate to `Interface Options` hit enter
Navigate to `VNC` and enable.

### Step 2 - Reboot the Pi

When changing configurations it is recommended to Reboot the Pi before continuing. The `raspi-config` might prompt directly to reboot, but if it does not enter the following command to reboot the Pi.

```
> sudo reboot -h now
```

### Step 3 - VNC Credentials

Once rebooted, create vnc credentials that will be used to connect over VNC to the pi. You will be prompted to enter a password and verify it. This is the password that will be used to establish the VNC connection.

```
> sudo vncpasswd -service
> sudo touch /etc/vnc/config.d/common.custom
> cd /etc/vnc/config.d
```

### Step 4 - Configure

Open the `custom.common` file just created and add the line.

```
Authentication=VncAuth
```

### Step 5 - Restart the VNC server

Enter the following command to restart the vnc server on the Pi

```
> sudo systemctl restart vncserver-x11-serviced
```

### Step 6 - Get the Raspberry Pi ip address

To obtain the ip address of the Pi, enter

```
> ifconfg
```

in the terminal and look for the _inet_ entry under the _eth0_ (if the Pi is connected over ethernet) or _wlan0_ (if the Pi is connected over wifi)

This ip will be formatted similar to _123.456.7.8_

### Step 7 - Open Screen Sharing on the Mac

Open the app called _Screen Sharing_ and create a new connection and enter in the ip address for the Pi. You will be prompted for the VNC password set in Step 1, with the option to store the password for future connections.
