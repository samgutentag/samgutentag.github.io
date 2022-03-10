---
layout: post
title: "Monitor Helium Hotspot Activity Part 2, Using the Helium API with Python"
date: 2022-03-09 08:00:00 -0800
last-updated: 2022-03-09
tags: python helium pushover hyperthreading
published: true
---

> Utilizing the Helium API.

# Collecting Data with the Helium API

This tutorial assumes you have some programming experience, but I aim to make this as straightforward as possible. It is a personal project to serve a need in my life but please make pull requests and feature suggestions on Github and I would love to help out!

## Github Repo

You can find the code for this project on [github][github-repo], clone the repo to follow along and run the script yourself!

[github-repo]: https://github.com/samgutentag/helium-heartbeat

## Set Up your Development Virtual Environment

I [wrote a blog post][virtual-env-blog] on the basics of setting up python virtual environments, so here are the commands to get you setup.

[virtual-env-blog]: https://gutentag.co/3sVfKZW

```bash
> mkvirtualenv -p python3 helium-heartbeat
```

Your shell output should be similar to this:

![shell output][shell-output-image-file]

[shell-output-image-file]: https://github.com/samgutentag/helium-heartbeat/blob/main/_assets/env-setup-shell-output.png?raw=true

## Store Your Environment Variables

When you create your virtual environment, take note of where the `/postactivate` and `/predeactivate` files are located. You will need to edit

Edit the `/postactvate` file

```bash
#!/bin/zsh
# This hook is sourced after this virtualenv is activated.

# sample address - this is not a real wallet address, just an example
export WALLET_ADDR="95a73802f8434c51a2bec3c8789cac7aa32f63793b8a4374a64"
```

Edit the `/predeactivate` file

```bash
#!/bin/zsh
# This hook is sourced before this virtualenv is deactivated.

unset WALLET_ADDR
```

Create a directory, or clone the repo, navigate to it and activate the virtual environment and lets get started

> Quick Check! run `> printenv | grep WALLET` to ensure your environment variables are set correctly! it will be printed to the console if everything is ready to go.

---

## Install the Requirements

Once inside your directory, be sure to install the requirements, I tried to keep it as lightweight as possible.

```bash
> pip install -r requirements.txt
```

---

## Some Helper Functions

I've included some helper functions outside of the main script to keep things as simple and long term reusable as possible. THe Helium API is vast and you can read up on the [Helium Docs][helium-docs] for more detailed information, this quick tutorial is barely scraping the surface.

[helium-docs]: https://docs.helium.com/

### Headers

To get started, we need to create some helpers to poll the Helium API in the `helium_api_wrapper.py` script.

Please be nice to the HeliumAPI, if you poll too quickly you will be throttled or denied access, so this header makes you somewhat "unique" in the eyes of the API host.

It will populate a header with information from your host system, the file name, file version, and the input email address.

```python
HEADERS = {
    "User-Agent": f"solitaryPixels_{basename(__file__)}/{__version__}",
    "From": f"{getlogin()}.{basename(__file__)}@heliumheartbeat.com",
}
```

### Getting Hotspots Associated With A Wallet

With a header setup, we can make a request to the Helium API like this:

```python
def hotspots_for_account(address, cursor="", api_url=API_HELIUM):
    baseurl = f"https://{api_url}/v1/accounts/{address}/hotspots"
    while True:
        _url = f"{baseurl}?cursor={cursor}"
        r = requests.get(_url, headers=HEADERS).json()
        try:
            for record in r["data"]:
                yield record
            cursor = r["cursor"]
        except KeyError:
            break
```

This function is a little fancy, it uses the `cursor` to roll through the pagination of the API results, though I have not used this script on a wallet with more than 20 or so hotspots, this should be pretty fast.

### Getting Hotspot Activity

Once we get our list of Hotspots, we will need to check each one for the most recent activity, this little function does just that!

```python
def hotspot_activity(address, cursor="", max_depth=2, api_url=API_HELIUM):
    baseurl = f"https://{api_url}/v1/hotspots/{address}/roles"
    depth = 0
    while True and depth < max_depth:
        depth += 1
        _url = f"{baseurl}?cursor={cursor}"
        r = requests.get(_url, headers=HEADERS).json()

        try:
            for record in r["data"]:
                yield record
            cursor = r["cursor"]
        except KeyError:
            break
```

It uses the same method to paginate the API results using a `cursor`, though we only want the single most recent activity, so the `max_depth` is set to a shallow `2` to speed things up, and be nice to the Helium API

---

## Wallet Heartbeats

In the [first post of this series][helium-heartbeat-part-1] I outlined what exactly a "Heartbeat" is considered to be, but the short version is an activity check for a given hotspot.

The next few steps take a multithreaded approach to get the heartbeat of each individual hotspot.

### Get Hotspots For Wallet

This first step uses the Environment Variable `WALLET_ADR` to poll the API using the helper function `hotspots_for_account` descripbed above. This gives us a list of hotspots to check.

### Check Hotspot Heartbeat

This script uses multithreading to speed up the process, but it was also developed with my personal hotspots in mind. So anything more than a handful of hotspots may take a while to complete.

For each hotspot associated with the target wallet, the `get_hotspot_heartbeat` function makes use of the helper function`hotspot_activity` to collect relevant data on the hotspot, the hotspot's latest activity, and the reported block chain height.

We collect the blockchain height with every hotspot as a simplified safeguard for API drift issues. These values are collected and the maximum is taken as the `block_height_max` to simplify comparisons.

### Calculate the Activity Gap

Once we have all of the heartbeat data for each hotspot, the `heartbeats[name]["blocks_inactive"]` key can be calculated by subtracting the `heartbeats[name]["latest_activity_block"]` from the `block_height_max`.

### Store The Result

Now that we have built our dictionary object of wallet heartbeats, we store it in a `data` directory with `year` and `month` subdirectories.

A heartbeat collection run on March 5th, 2022 at 4:15am would have the file path `./data/wallet_heartbeats/2022/03/heartbeat-2022.03.05-04.15.json`

Note that the timestamp is taken in the machine local time zone.

---

## Wrap Up

And there you have it! A small script to check the activity gap of the hotspots associated with a given wallet! THis is a great snapshot, but we should run this frequently to track this over time (and make some insightful charts!) You can check the blog post [Monitor Helium Hotspot Activity Part 4, Notifications with Pushover][helim-heartbeat-part-4] for information on using `cron` to schedule the script at different intervals.

---

## More Information

Checkout the other posts in this series where I will cover in more detail how I get this data from the Helium API and checkout the code on my [Github][github-repo]

- [Monitor Helium Hotspot Activity Part 1, Overview][helim-heartbeat-part-1]
- [Monitor Helium Hotspot Activity Part 2, Using the Helium API][helim-heartbeat-part-2] (you are here)
- [Monitor Helium Hotspot Activity Part 3, Visualize the Data][helim-heartbeat-part-3]
- [Monitor Helium Hotspot Activity Part 4, Notifications with Pushover][helim-heartbeat-part-4]

[github-repo]: https://github.com/samgutentag/helium-heartbeat
[helim-heartbeat-part-1]: https://gutentag.co/3MzZNAb
[helim-heartbeat-part-2]: https://gutentag.co/3MGjUwo
[helim-heartbeat-part-3]: https://www.samgutentag.com/blog
[helim-heartbeat-part-4]: https://www.samgutentag.com/blog
