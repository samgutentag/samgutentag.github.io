---
layout: post
title: "Monitor Helium Hotspot Activity with Pushover"
date: 2022-03-08 08:00:00 -0700
last-updated: 2022-03-08
tags: python helium pushover
---

Helium Heartbeats, Pushing to the Limit.

# Monitoring Heium Hotspots with Pushover.

![sample image][sample-image]

## The Problem

It is easy to fall into the trap of endlessly refreshing Miner Dashboards, the Helium Explorer and the various community apps that have come about to monitor your Hotspot's performance.

You should not do this, its not a great use of your time and you should get to keep more of that time for other things.

## The Solution

To remedy this desire for updates and insights, I have put together a set of scripts running on a Raspberry Pi that utilize the Helium Blockchain API and the application Pushover to keep me up to date on the status of my Hotspots without overloading me with information

## The Code

You can find the code for this project on [github][github-repo]

---

[github-repo]: https://github.com/samgutentag/helium-heartbeat
[sample-image]: https://github.com/samgutentag/helium-heartbeat/blob/main/sample-image.png?raw=true
