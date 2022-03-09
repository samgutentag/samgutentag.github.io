---
layout: post
title: "Monitor Helium Hotspot Activity Part 1, Overview"
date: 2022-03-08 08:00:00 -0800
last-updated: 2022-03-09
tags: python helium pushover
---

> Can't Stop Wont Stop, Probably Should Stop.

# Monitoring Helium Hotspots with Pushover.

![sample image][sample-image]

## The Problem

It is easy to fall into the trap of endlessly refreshing Miner Dashboards, the Helium Explorer and the various community apps that have come about to monitor your Hotspot's performance.

You should not do this, its not a great use of your time and you should get to keep more of that time for other things.

## The Solution

To remedy this desire for updates and insights, I have put together a set of scripts running on a Raspberry Pi that utilize the Helium Blockchain API and the application Pushover to keep me up to date on the status of my Hotspots without overloading me with information

## The Code

You can find the code for this project on [github][github-repo]

### Set Up your Development Virtual Environment

I [wrote a blog post[virtual-env-blog] on the basics of setting up python virtual environemnts, so here are the commands to get you setup.

```bash
> mkvirtualenv -p python3 helium-heartbeat
```

Your shell output should be similar to this:

![shell output][shell-output-image-file]

## Notifications with Pushover

This setup uses two [Pushover][pushover-website] Apps to communicate `Timely` and `Status Change` updates.

This can be setup with any number of PushOver Apps, though these two provide a useful balance of information.

To get started, head over to the [Pushover Website][pushover-website] and create an account if you do not already have one.

> To match my setup, you will need to purchase the [Pushover App for iOS][pushover-ios] application, which is free to use for 30 days, but requires a one time $5 purchase for a lifetime unlock on each platform (desktop/android/ios). Its worth it, seriously. For more information see [Pushover's Pricing][pushover-pricing]

Once you have a Pushover account, lets create some API Keys.

### Pushover API

---

[github-repo]: https://github.com/samgutentag/helium-heartbeat
[sample-image]: https://github.com/samgutentag/helium-heartbeat/blob/main/_assets/sample_output.png?raw=true
[virtual-env-blog]: ./2020-01-29-virtualenv-env-variables.md
[shell-output-image-file]: https://github.com/samgutentag/helium-heartbeat/blob/main/_assets/env-setup-shell-output.png?raw=true
[pushover-website]: https://pushover.net/#apps
[pushover-ios]: https://pushover.net/clients/ios
[pushover-pricing]: https://pushover.net/pricing
