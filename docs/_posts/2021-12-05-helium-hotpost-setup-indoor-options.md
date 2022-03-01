---
layout: post
title: "RAKv2 Helium Hotspot Indoor Setup"
date: 2021-12-05 08:00:00 -0800
last-updated: 2022-03-01
tags: helium hotspot setup poe crypto
---

[What is Helium?][what-is-helium-video] Glad you asked (to host).

## So Happy To Host With You

This guide is assuming that I (Sam) have already set up and configured the RAKv2 Helium Hotspot to connect to the [Helium Network][helium-network], the next step is to install the physical device itself.

Thank you for hosting, your part is pretty straight forward, however, there are some details that will benefit your setup the most and maximize performance of the Hotspot.

Please call me when you are ready to begin setup, as a few of these steps are a bit tricky, and the last step is a doozy.

## Guidelines & FAQs

Ok, please keep reading.

### The Hotspot needs to be connected to your internet

The Hotspot connects to other Hotspots via [LoRaWan][helium-lorawan] (Long Range Wifi Access Network), and connects to the Internet using your Internet Connection.

> A fast, stable internet connection provides the best performance, an Ethernet connection is **strongly** recommended.

- **Ethernet**
- It is **STRONGLY** encouraged to connect with an Ethernet cable to your Router directly, this will maximize the performance of the Hotspot and keep it in sync with the Helium Blockchain most effectively.
- **Wifi**
- This hotspot can connect to your wifi network, but it is _not_ good at it, using wifi should be considered a last resort.

### The Hotspot needs power

The Hotspot itself uses the same amount of energy as a 5 Watt light bulb.

> In a year this equates to roughly $5 or less, depending on your energy costs.

- **Power Over Ethernet** ("**POE**")
- Allows for the Hotspot to receive electrical power over the same cable that delivers the Internet connection. See [Configuration 1](#configuration-1:-poe-&-ethernet) or [Configuration 3](#configuration-3:-poe-&-wifi) below
- **Wall Power**
- A USB Type C power brick works well, though the cord is a little short and may be a hassle depending on the layout of your location.

### The Hotspot needs a clear view of the world

- Please place the Hotspot in an open window that does **not** have a screen, ideally not one that you will be opening often.
- Height is Key, the higher up your Antenna is, the greater your Hotspot's reach, and the greater your coverage. If you are in a high rise building, you are ahead of the game.

### The Antenna must point up

- The Antenna included in the package I sent you screws on to the connector on the Hotspot itself.
- The Antenna broadcasts in a donut shaped pattern, similar to Wifi antennas, keeping it as vertical as possible to reduce signals being shot into space or into the ground.
- As the Hotspot gets settled in, it might make sense to upgrade the antenna, should this be necessary, I will send you one with more instructions.

---

## Setup Options

With all of that in mind, let's get you set up, but remember:

<div style="background-color:rgba(255, 0, 0, 0.25); text-align:center; vertical-align: middle;font-weight: bold;">
<p>
⚠️IT IS INCREDIBLY IMPORTANT THAT YOU NEVER POWER ON⚠️
</p>
<p>
⚠️THE HOTSPOT WITHOUT THE ANTENNA PROPERLY CONNECTED!⚠️
</p>
</div>

Ok, here are the 4 main options.

### Configuration 1: POE & 🌟Ethernet🌟

![POE & Ethernet][option-1]

### Configuration 2: Wall Power & 🌟Ethernet🌟

Gettings Setup using Wall Power & Ethernet.

![Wall Power & Ethernet][option-2]

### Configuration 3: POE & Wifi

Gettings Setup using POE & Wifi.

![POE & Wifi][option-3]

### Configuration 4: Wall Power & Wifi

Gettings Setup using Wall Power & Wifi.

![Wall Power & Wifi][option-4]

## Last Step

The very last step to get everything working at full capacity is to setup a `Port Forward`

This is a potentially annoying process, and beyond the scope of this document, I will call and walk you through it, or can even take remote control of your computer to do it for you. All I need is the make and model of your Internet Router.

## Wrap Up

Thank you so much for being a Helium Host! Please feel free to contact me at any time with questions or concerns you may have, and I am happy to explain the Helium Project more as well!

I will also send you a link to monitor the Hotspot activity, so you can see the Network, working! 🎈

[helium-lorawan]: https://www.helium.com/lorawan
[helium-network]: https://www.helium.com
[option-1]: https://i.imgur.com/iHCT6Nl.jpg
[option-2]: https://i.imgur.com/7IGx29j.jpg
[option-3]: https://i.imgur.com/j91Nqkj.jpg
[option-4]: https://i.imgur.com/hHjHx4W.jpg
[what-is-helium-video]: https://www.youtube.com/watch?v=Vx9YyS7-d3g
