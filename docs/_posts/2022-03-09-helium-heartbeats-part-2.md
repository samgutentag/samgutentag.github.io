---
layout: post
title: "🎈 Monitor Helium Hotspot Activity Part 2: The Helium API, Python and You"
date: 2022-03-09 08:00:00 -0800
last-updated: 2022-03-16
tags: python Helium pushover hyperthreading
published: true
---

> Utilizing the Helium API with Python `requests`

## Collecting Data with the Helium API

This tutorial assumes you have some programming experience, but I aim to make this as straightforward as possible. It is a personal project to serve a need in my life but please make pull requests and feature suggestions on [Github][github-repo] and I would love to build this out further and serve more users' needs!

## Source Code Github Repo

You can find the code for this project on [github][github-repo], clone the repo to follow along and run the script yourself.

[github-repo]: https://github.com/samgutentag/helium-heartbeat

## Set Up your Development (Virtual) Environment

I [wrote a blog post][virtual-env-blog] on the basics of setting up python virtual environments, assuming you have `mkvirtualenv` installed you can run this command to get started.

[virtual-env-blog]: https://gutentag.co/3sVfKZW

```bash
> mkvirtualenv -p python3 helium-heartbeat
```

Your shell output should be similar to this:

![shell output][shell-output-image-file]

[shell-output-image-file]: https://github.com/samgutentag/helium-heartbeat/blob/main/_assets/env-setup-shell-output.png?raw=true

### Store Your Environment Variables

When the virtual environment is created take note of where the `/postactivate` and `/predeactivate` files are located. You should use these to store your private keys and any other information you do not want published to the internet, but _do_ want available to your scripts.

#### Edit the `/postactvate` file

```bash
#!/bin/zsh
# This hook is sourced after this virtualenv is activated.
# ~/$HOME/.virtualenvs/helium-heartbeat/bin/postactvate

# sample address - this is not a real wallet address, just an example
export WALLET_ADDR="95a73802f8434c51a2bec3c8789cac7aa32f63793b8a4374a64"
```

#### Edit the `/predeactivate` file

```bash
#!/bin/zsh
# This hook is sourced before this virtualenv is deactivated.
# ~/$HOME/.virtualenvs/helium-heartbeat/bin/predeactivate

# unset the wallet address, otherwise it will persist in the shell
unset WALLET_ADDR
```

With your Virtual Environment ready to go, navigate to your project directory (where you cloned the source code) and start the virtualenv with the command

```bash
workon helium-heartbeat
```

> Quick Check! Run `> printenv | grep WALLET` to ensure your environment variables are set correctly! Your Wallet Address will print to the console if everything is ready to go.

### Install the Requirements

Once inside your script directory, be sure to install the requirements, I tried to keep it as lightweight as possible.

```bash
> pip install -r requirements.txt
```

### Set the Headers

Now the fun begins! I've included some additional helper functions to keep things as simple and long term reusable as possible. Open the `helium_api_wrapper.py` script in your code editor and take a look.

The Helium API right now does not require an API passphrase or secret key, but you do need to specify a `header` when making requests.

Please be nice to the HeliumAPI, if you poll too quickly you will be throttled or denied access, this header makes you "unique" in the eyes of the API, keeping you out of the general pool of users accessing the API that do _not_ specify a header. (it is almost always overloaded by non-header-having API calls)

The `HEADERS` will populate with information from your host system, the file name and the script file version.

Please feel free to adjust this as you see fit, the important bits are a `User-Agent` and `From`.

```python
HEADERS = {
    "User-Agent": f"solitaryPixels_{basename(__file__)}/{__version__}",
    "From": f"{getlogin()}.{basename(__file__)}@heliumheartbeat.com",
}
```

The Helium API is vast and you can read up on the [Helium Docs][helium-docs] for more detailed information, this quick tutorial is barely scraping the surface.

[helium-docs]: https://docs.helium.com/

---

---

## The "helium_api_wrapper.py" Script

Now lets get to actually collecting some Hotspot Heartbeats!

## Getting Hotspots Associated With A Wallet

We can now make a request to the Helium API. Open the `helium_api_wrapper.py` file lets review the two functions.

### The "hotspots_for_account()" Function

This function uses the `requests` module to parse the API data and takes 4 arguments:

| param       | info                                                          |
| ----------- | ------------------------------------------------------------- |
| `address`   | Helium wallet address                                         |
| `cursor`    | String key used to step through the paginated api results     |
| `max_depth` | Maximum number of `cursors` that will be used when paginating |
| `api_url`   | Baseurl for the API, defaults to the production API           |

```python
def hotspots_for_account(address, cursor="", max_depth=3, api_url="api.helium.io"):
    baseurl = f"https://{api_url}/v1/accounts/{address}/hotspots"
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

This function uses the `cursor` to step through the pagination of the API results, though I have not used this script on a wallet with more than 20 or so hotspots, this should be pretty quick.

## Getting Hotspot Activity

Once we get the list of Hotspots, we will need to check each one for the most recent activity.

The `hotspot_activity()` function uses the same method to paginate the API results with a `cursor`, though we only want the single most recent activity, so the `max_depth` is set to a shallow `2` to not waste time, and be nice to the Helium API.

### The "hotspot_activity()" Function

This function uses the `requests` module to parse the API data and takes 4 arguments:

| param       | info                                                          |
| ----------- | ------------------------------------------------------------- |
| `address`   | Helium Hotspot address                                        |
| `cursor`    | String key used to step through the paginated api results     |
| `max_depth` | Maximum number of `cursors` that will be used when paginating |
| `api_url`   | Baseurl for the API, defaults to the production API           |

```python
def hotspot_activity(address, cursor="", max_depth=2, api_url="api.helium.io"):
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

---

---

## Capture Wallet Heartbeats with "helium-heartbeats.py"

In the [first post of this series][helium-heartbeat-part-1] I outlined the concept of a Hotspot Heartbeat, the short version is a status record for a given Hotspot at a specific point in time.

The `helium-hearbeats.py` script uses a multithreaded approach to get the Hotspot Heartbeat of each individual Hotspot associated to a given Helium Wallet.

The `get_wallet_heartbeat()` function does a lot of the heavy lifting.

```python
get_wallet_heartbeat(wallet_addr=os.environ["WALLET_ADDR"]):
    """Get heartbeat data for all hotspots in a given wallet.

    Multithreaded collection of heartbeat data for all hotspots associated to
    a given wallet

    Args:
        wallet_addr (string): a wallet address on the Helium Blockchain

    Returns:
        result (dict): dictionary of hotspots heartbeat data

    Raises:
        Exception: broad exception for when the Helium API fails to
                    return a list of hotspots for the given wallet
    """
```

### Step 1. Get List of Hotspots For Wallet

The first step is to use the Environment Variable `WALLET_ADR` to poll the API using the helper function `hotspots_for_account()` to get the list of Hotspots associated to the Wallet.

```python
# get list of hotspots for wallet address
wallet_hotspots = helium_api_wrapper.hotspots_for_account(address=os.environ["WALLET_ADDR"])
```

### Step 2. Check Hotspot Heartbeats

Next, the script saves time by dividing the work to check the Heartbeat of each Hospot across multiple threads, this was developed with a smaller number of hotspots in mind (less than 10), so its fast but not _too fast_ if the Wallet has many many Hotspots.

On each thread, the `get_hotspot_heartbeat()` function makes use of the helper function `hotspot_activity()` to collect relevant data of the Hotspot and the reported block chain height.

```python
# split work into threads
threads = []
with ThreadPoolExecutor(max_workers=20) as executor:
    for hotspot in wallet_hotspots:
        threads.append(executor.submit(get_hotspot_heartbeat, hotspot))

# parse data from threads
heartbeats = {}
for task in threads:
    heartbeat = task.result()
    heartbeats[heartbeat["name"]] = heartbeat
```

We collect the blockchain height with every Hotspot Heartbeat as a simplified safeguard for API drift issues. These values are collected and the maximum is taken as the `block_height_max` to simplify comparisons.

```python
# get max block reported
block_heights = []
for name in sorted(heartbeats.keys()):
    block_heights.append(heartbeats[name]["chain_height"])
block_height_max = max(block_heights)
```

### Step 2b. Heartbeat Data

The `get_hotspot_heartbeat()` function slices the API response into the bits actually needed.

| param     | info                   |
| --------- | ---------------------- |
| `hotspot` | Helium Hotspot address |

```python
def get_hotspot_heartbeat(hotspot=None):
    _heartbeat = {}
    _name = hotspot["name"]
    _heartbeat["name"] = _name
    _heartbeat["status_height"] = hotspot["status"]["height"]
    _heartbeat["status_timestamp"] = hotspot["status"]["timestamp"]
    _heartbeat["chain_height"] = hotspot["block"]

    # get latest activity block
    _heartbeat["latest_activity_block"] = get_latest_active_block(hotspot=hotspot)

    return _heartbeat
```

### Step 3. Calculate the Activity Gaps

Once we have all of the heartbeat data for each hotspot, the `heartbeats[name]["blocks_inactive"]` key can be calculated by subtracting the `heartbeats[name]["latest_activity_block"]` from the `block_height_max`.

```python

# calculate inactive gap for each hotspot
for name in sorted(heartbeats.keys()):
    if heartbeats[name]["latest_activity_block"] == -1:
        heartbeats[name]["blocks_inactive"] = -1
    else:
        heartbeats[name]["blocks_inactive"] = (
            block_height_max - heartbeats[name]["latest_activity_block"]
        )
```

### Step 4. Store The Result

The `record_heartbeat_data()` function is used to reocrd the heartbeat data to a json file on the local machine.

```python
record_heartbeat_data(wallet_heartbeats=None):
    """Write heartbeat data to json files.

    Wallet heartbeat data is stored in JSON files for later processing
    and analysis.

    Args:
         wallet_heartbeats (dict): wallet heartbeats data

    Returns:
         info_file (string): output filepath to recorded json data

    """
```

Heartbeat data is stored in a `data` directory under `year` and `month` subdirectories.

A Heartbeat script run on March 5th, 2022 at 4:15pm would put results into the file `./data/wallet_heartbeats/2022/03/heartbeat-2022.03.05-16.15.json`

Note that the timestamp is taken in the machine local time zone.

---

## Wrap Up

And there you have it, a utility and main script to check the activity gap of the Hotspots associated with a given Helium Wallet!

These are nice snapshots, but running this more frequently to track the Heartbeat over time solves the original "Stop Refreshing" goal. Check the other posts in this series for information on using `cron` to schedule the script to run automatically.

---

## More Information

More information on this project can be found on the companion posts here:

- [Monitor Helium Hotspot Activity Part 1, Overview][helim-heartbeat-part-1]
- [Monitor Helium Hotspot Activity Part 2, Using the Helium API][helim-heartbeat-part-2] (you are here)
- [Monitor Helium Hotspot Activity Part 3, Visualize the Data][helim-heartbeat-part-3]
- [Monitor Helium Hotspot Activity Part 4, Notifications with Pushover][helim-heartbeat-part-4]

[github-repo]: https://github.com/samgutentag/helium-heartbeat
[helim-heartbeat-part-1]: https://gutentag.co/3MzZNAb
[helim-heartbeat-part-2]: https://gutentag.co/3MGjUwo
[helim-heartbeat-part-3]: https://gutentag.co/37DqFPL
[helim-heartbeat-part-4]: https://www.samgutentag.com/blog
