---
layout: post
title: "Monitor Helium Hotspot Activity Part 1, Overview and Heartbeats"
date: 2022-03-08 08:00:00 -0800
last-updated: 2022-03-09
tags: python helium pushover
---

> Can't Stop, Wont Stop, Probably Should Stop Refreshing.

## Monitoring Helium Hotspots with Pushover.

I own and host (with friends and family) a handful of Helium Hotspots and I like to keep an eye on them to know they are operating well, get a heads up on potential problems, and in general satiate my curiousity and love for data. That said, It is very easy to fall into the trap of endlessly refreshing Miner Dashboards, the Helium Explorer and the various community apps that have come about to monitor Hotspot's status.

I, and likely you, should not do this, it is not a great use of time and probably causes more worry than it should.

---

## My Approach

To remedy this desire for updates and insights, I have put together a set of scripts running on a Raspberry Pi that utilize the Helium Blockchain API and the application [Pushover][pushover-website] to keep me up to date on the status of my Hotspots without overloading me with information.

This series of posts is obout the scripts I use to monitor my Hotspot "Heartbeats", the inactivity gaps that each Hotspot has. it collects a bunch of other information for other utilities I will write about later as well, but lets focus on just the activity monitoring for now.

The end result of this code is a message I send to myself in the application Pushover or view on a (_very basic_) local webpage and it looks like this.

![sample image][sample-image]

> these are not my actual hotspots, just ones from a wallet I selected at random.

If all is well, these charts are nice and clear, providing my with activity gaps over the past 3-ish days.

If all is not well, the charts are filled in with red, which helps me at a glance identify a potential issue to resolve.

![sample warning image][sample-image-warning]

---

## What is a "Heartbeat"?

Here is an example `heartbeat.json` file that is saved by the script, its lightweight, but that keeps storage low and later steps fast and human readible!

```json
{
  "heartbeats": {
    "winning-blush-opossum": {
      "name": "winning-blush-opossum",
      "status_height": 1256354,
      "status_timestamp": "2022-03-07T07:58:46.918000Z",
      "chain_height": 1259885,
      "latest_activity_block": 1259879,
      "blocks_inactive": 6
    },
    "fun-mossy-bird": {
      "name": "fun-mossy-bird",
      "status_height": 1254542,
      "status_timestamp": "2022-03-06T00:19:04.648000Z",
      "chain_height": 1259885,
      "latest_activity_block": 1259753,
      "blocks_inactive": 132
    }
  },
  "timestamp": "2022.03.09-22:17"
}
```

The structure of a `heartbeat.json` entry is detailed here:

```json
{
  "heartbeats": {
    <name-of-hotspot>: {
      "name": <name-of-hotspot>
      "status_height": <hotspot height reported by API>,
      "status_timestamp": <timestamp of hotspot status update in API, in UTC>,
      "chain_height": <chain height reported with hotspot API call>,
      "latest_activity_block": <the last active block for the given hotspot>
      "blocks_inactive": <the number of recent blocks without activity>
    },
  "timestamp": <machine local time the heartbeat was recorded>
}
```

---

## Next Steps

Checkout the other posts in this series where I will cover in more detail how I get this data from the Helium API and checkout the code on my [Github][github-repo]

- [Monitor Helium Hotspot Activity Part 1, Overview][helim-heartbeat-part-1] (you are here)
- [Monitor Helium Hotspot Activity Part 2, Using the Helium API][helim-heartbeat-part-2]
- [Monitor Helium Hotspot Activity Part 3, Visualize the Data][helim-heartbeat-part-3]
- [Monitor Helium Hotspot Activity Part 4, Notifications with Pushover][helim-heartbeat-part-4]

[github-repo]: https://github.com/samgutentag/helium-heartbeat
[helim-heartbeat-part-1]: https://gutentag.co/3MzZNAb
[helim-heartbeat-part-2]: https://www.samgutentag.com/blog
[helim-heartbeat-part-3]: https://www.samgutentag.com/blog
[helim-heartbeat-part-4]: https://www.samgutentag.com/blog
[pushover-website]: https://pushover.net/#apps
[sample-image-warning]: https://github.com/samgutentag/helium-heartbeat/blob/main/_assets/sample_output_warning.png?raw=true
[sample-image]: https://github.com/samgutentag/helium-heartbeat/blob/main/_assets/sample_output.png?raw=true
