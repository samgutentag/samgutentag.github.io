---
layout: post
title: 'Downloading Twitter Spaces'
date: 2024-05-01 00:00:00 -0800
last-updated: 2024-05-01
tags: twitter spaces youtube-dl ffmpeg
published: true
---

> Twitter Marks The Spot

## Overview

Twitter Spaces (X spaces?) are a great "town-hall" platform, but it can be hard to re-listen to an
event. Playback controls are iffy and in general, a downloaded copy of a recording offers much more
flexibility.

Unfortunately, Twitter does not natively support downloading a recorded space.

Fortunately, `yt-dlp` (formerly `youtube-dl`) and `ffmpeg` exist!

## Prerequisites

1. you have [`yt-dlp` installed](https://formulae.brew.sh/formula/yt-dlp)
2. you have [`ffmpeg` installed](https://formulae.brew.sh/formula/ffmpeg)
3. you have a link to a Twitter spaces replay.

On a Mac, `yt-dlp` and `ffmpeg` can be installed using [homebrew](https://brew.sh/) with the
following command:

```bash
brew install ffmpeg yt-dlp
```

## Find the Recording URL

For this walkthrough I will be using a replay from a Twitter Space hosted by
[Pieces foe Developers](https://twitter.com/getpieces) titled "AI for Developer Productivity" which
you should 100% listen to.

The URL for the replay is here:
[https://twitter.com/i/spaces/1ZkKzjkVwzLKv](https://twitter.com/i/spaces/1ZkKzjkVwzLKv)

> Plug for [Pieces](https://pieces.app/) here. Seriously, it's already completely overhauled my
> workflow and you should check it out!

### Chrome Dev Tools

Link in hand (or in clipboard) open a Chrome web browser and then open the **Developer Tools**
panel. This can be done by either clicking the three dots menu in the upper right corner of the
Chrome window > **More Tools** > **Developer Tools** or by using the hotkey `⌘⌥I` (Command +
Option + I).

In the Developer Tools panel, navigate to the **Network** tab and enter `m3u` into the filter box.

![dev-tools-network-tab][image-01]

Paste in the spaces replay link from above into the address bar and hit enter.

Watch the filtered content in the **Network** tab. You are looking for an entry similar to:

```bash
playlist_16732160847824420797.m3u8?type=replay
```

The key element is the `type=replay` suffix.

![devtools-filtered-results][image-02]

Right click on this entry and select **Copy** > **Copy URL** from the menu.

![devtool-copy-recording-url][image-03]

### Download the Recording

In a terminal window, navigate to the location you would like to store the recording. For me that is
just the `Downloads` folder for now.

```bash
cd ~/Downloads
```

Use `yt-dpl` to download the spaces recording with this command:

```bash
yt-dpl [playlist_16732160847824420797.m3u8?type=replay](https://prod-fastly-us-east-1.video.pscp.tv/Transcoding/v1/hls/cxIaV_kOVKtVFbsr-rugYE7nlh8BEqogOW-AsQwgF4n5q7I9ve0B_DrmtotFaAEpYpmMJ7A3G8BTdBnNukeHJQ/non_transcode/us-east-1/periscope-replay-direct-prod-us-east-1-public/audio-space/playlist_16732160847824420797.m3u8\?type\=replay)
```

![terminal-download][image-04]

Assuming this is working correctly, you will be shown a progress display in the terminal window.

Once complete, you can open the `mp4` file in any media player you choose.

[image-02]:
  https://raw.githubusercontent.com/samgutentag/img-host/main/download-spaces/devtools-filtered-results.png
[image-01]:
  https://raw.githubusercontent.com/samgutentag/img-host/main/download-spaces/devtools-network-tab.png
[image-03]:
  https://raw.githubusercontent.com/samgutentag/img-host/7aa6031544e7eb2d01ac3901c5cb49fd495ee7a8/download-spaces/devtool-copy-recording-url.png
[image-04]:
  https://raw.githubusercontent.com/samgutentag/img-host/main/download-spaces/terminal-download.png
