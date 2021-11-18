---
layout: post
title: "Fix Elgato WaveLink Crashing Zoom"
date: 2021-11-18 08:00:00 -0800
last-updated: 2021-11-18
tags: elgato wavelink zoom
---

The [WaveLink Application][wavelink] for the [Wave:1][wave-1] microphone running on my install of [macOS Big Sur][bigsur] has been a nightmare...

I have had to launch the application in various different order to launching [Zoom][zoom], reinstalling Zoom, reinstalling WaveLink, chanign docks, changing cables, unplugging cables. Its been a hassle and I am done.

Turns out, to use a Wave Mic with Zoom on macOS you do not _need_ WaveLink, so here is how to completely remove it from your system, thank you to this [reddit post][reddit-post] with the solution, copie dhere so I can find it in teh future.

## Removal

First, quit the WaveLink app from the menu bar if it is running... (you may need to force kill it from `Activity Monitor`) then open `Terminal`, and run these commands:

1. To delete the app:

   `> sudo rm -rf /Applications/WaveLink.app`

2. Remove the virtual audio driver:

   `> sudo rm -rf /Library/Audio/Plug-Ins/HAL/WaveLinkVirtualAudio.driver`

3. Finally, restart `coreaudiod`:

   `> sudo killall -9 coreaudiod`

4. And that is it, you should be good to go.

[bigsur]: https://support.apple.com/en-us/HT211238
[reddit-post]: https://www.reddit.com/r/elgato/comments/k4xk75/comment/gi48el7/?utm_source=share&utm_medium=web2x&context=3
[wave-1]: https://www.elgato.com/en/wave-1
[wavelink]: https://www.elgato.com/en/downloads
[zoom]: https://zoom.us/download
