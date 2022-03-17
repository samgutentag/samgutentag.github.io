---
layout: post
title: "🎈 Monitor Helium Hotspot Activity Part : Overview and Heartbeats"
date: 2022-03-08 08:00:00 -0800
last-updated: 2022-03-16
tags: python Helium pushover
---

> Can't Stop, Wont Stop, (Probably Should Stop) Refreshing.

## Feeling Refreshed

I own and host (with friends and family) a handful of [Helium Hotspots][helium-hotspots] and I like to keep an eye on them to know they are operating well, get a heads up on potential problems and in general satiate my curiosity for data.

It is _very_ easy to fall into the trap of endlessly refreshing Miner Dashboards, the Helium Explorer and the various community apps that have come about to monitor a Hotspot's status.

I, and likely you, should not do this. It is not a great use of time and probably causes more worry than it should.

---

---

## My Approach

To remedy this desire for updates and insights, I have put together a set of scripts running on a Raspberry Pi that utilize the [Helium Blockchain API][helium-api] and the application [Pushover][pushover-website] to keep me up to date without overloading me with information.

These scripts rely on the concept of a "Hotspot Heartbeat" record used to monitor the gaps of Hotspot activity recorded to the Helium Blockchain. The scripts also collect other information for a few utilities I will write about later, but let's focus on just the activity monitoring for now.

The end result of this script is a message posted to the application Pushover on my mobile devices and a view on a (_very basic_) local webpage on the RaspberryPi hosting them.

If all is well, these charts are simple blue lines and pyramids, providing me with activity gaps over the past 3-ish days.

If all is **not** well, the charts are filled in with red, which helps me at a glance identify a potential issue I can investigate and monitor.

|            Yay 👍             |                  Not Yay 👎                   |
| :---------------------------: | :-------------------------------------------: |
| ![sample image][sample-image] | ![sample warning image][sample-image-warning] |

> these are not my actual hotspots, they are associated to a wallet I selected at random.

---

## What is a "Heartbeat"?

The "Hotspot Heatbeat" is a snapshot of hotspot status at a specific point in time, this script records the Heartbeat for every Hotspot in my Wallet every 3 minutes via a `cron`. The plots are generated at the top of every hour, and the message is sent to Pushover every 8 hours or if a Hotspots Status has changed.

> A change in status is when a Hotspot has been innactive for more than a specified number of Blocks, I use `450` for my "inactive" status.

Here is an example `heartbeat.json` file that is saved by this script, it is lightweight, but that keeps storage low and later steps fast and human readable.

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
[helim-heartbeat-part-2]: https://gutentag.co/3MGjUwo
[helim-heartbeat-part-3]: https://www.samgutentag.com/blog
[helim-heartbeat-part-4]: https://www.samgutentag.com/blog
[pushover-website]: https://pushover.net/#apps
[sample-image-warning]: https://github.com/samgutentag/helium-heartbeat/blob/main/_assets/sample_output_warning.png?raw=true
[sample-image]: https://github.com/samgutentag/helium-heartbeat/blob/main/_assets/sample_output.png?raw=true
[helium-hotspots]: https://www.helium.com/mine
[helium-api]: https://docs.helium.com/blockchain
