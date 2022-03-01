---
layout: post
title: "Converting Strings with Timezones using pandas"
date: 2021-11-08 08:00:00 -0800
last-updated: 2022-03-01
tags: pandas datetimes timezones
---

See also: [xkcd 1883][xkcd-1883]

## 60% Of The Time, It Works Every Time

Working with dates and times is annoying, and roughly once every 3-4 weeks I completely forget how to convert a string that includes a timezone to a timezone aware `datetime` object in python/pandas.

I often have a string like this: `2021-04-24T03:55:09-04:00` that I want to convert.

Here is a template so I can find it later:

```python

import pandas as pd

source_file = "data.csv"

df = pd.read_csv(source_file, parse_dates=True)

# convert `datetime_str` to datetime and localize to the `America/Los_Angeles` timezone
# if you do not localize, will be converted to `UTC` with the `utc=True` parameter
df["datetime"] = pd.to_datetime(df["datetime_str"], utc=True).dt.tz_convert("America/Los_Angeles")

# set the `datetime` column to be the index
df.set_index("datetime", inplace=True)

```

[xkcd-1883]: https://xkcd.com/1883/
