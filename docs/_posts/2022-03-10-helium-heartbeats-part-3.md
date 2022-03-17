---
layout: post
title: "🎈 Monitor Helium Hotspot Activity Part 3, Visualize the Data"
date: 2022-03-9 08:00:00 -0800
last-updated: 2022-03-10
tags: python helium pushover pandas api refresh
published: true
---

> Pythons, Pandas and Matplots

## Visualizing The Heartbeat Data

The final script in [this repo][github-repo] `helium_heartbeat_plots.py` is used to visualize the data the `helium_heartbeat.py` script is collecting.

Also please note, this script handles a lot of edge cases, but not ALL of them, so please bear that in mind (and submit pull requests!)

## Loading Data

The first step to visulzliing the data is loading the data! The `load_data()` function does exactly that.

The function will _find_ all of the Heartbeat JSON files in the `./data` directory, but will only plot the last specified `n` days. For effeciency, the script assumes that a day includes at max 144 Heartbeats (this assumes a 10 minute Heartbeat interval, calculated from `6 per hour * 24 hours = 144`) and will only load most recent `144` Heartbeat JSON files.

> Make note of how frequently you are checking for Heartbeats and adjust the values here as needed, a 10 minute interval is plenty of information.

| param       | info                                           |
| ----------- | ---------------------------------------------- |
| `days_back` | how many days of data to include, default is 3 |

```python
def load_data(days_back=3):

  # serach for files
  search_slug = os.path.join(data_dir, "*", "*", "*.json")
  files = sorted(glob(search_slug))

  # trim to online include latest (daysback * 144) files
  # 144 being the max number of files collected in 10 minute intervals
  # per day this should match the cron
  file_limit = (days_back + 1) * 144
  if len(files) > file_limit:
      files = files[(-1 * file_limit) :]

```

## Create a DataFrame

Pandas is a popular Data Science Python Library and kind of overkill for this plotting work, but it is easy to follow.

Pandas works with the concept of "DataFrames" which is comparable to a fancy Excel sheet (DataFrames are so much more than that, but this is all we need for this project)

Load the JSON files into a DataFrame and clean up the data

```python
chunks = []
for _file in files:
    with open(_file) as json_file:
        _data = json.load(json_file)

    chunk = pd.json_normalize(_data)

    # heartbeats is the data
    chunk = pd.DataFrame(_data["heartbeats"])

    chunk = chunk.transpose()

    # append timestamp
    chunk["timestamp"] = pd.to_datetime(_data["timestamp"])

    chunks.append(chunk)

data = pd.concat(chunks)
data.reset_index(inplace=True, drop=True)

```

## Plot the Data

Visual plots are a great way to convey a lot of information quickly. A Hotspot Heartbeat plot will look something like this:

![sample-image][sample-image]

This example shows the Activity Gap of two Hotspots on a 1o minute interval. As the Blue Line gets higher, the Hotspot has been innactive longer. These two Hotspots are in good shape. The line is blue, and below the `dashed line` at the "inactive threshhold" (in this case 450, which is roughly 7.5 hours given current block times).

The plots also include a `rolling median` line, which is a 30 interval median. This is useful when diagnosing longer term trends in HOtspot Activity.

### What About The Bad Times?

In the case that a Hotspot has gone more than 450 blocks without any activity, the line will turn red and fill the plot. This serves as a quick visual marker that something may not be working as expected.

In this example, the second Hotspot has crossed the threshold and is now considered Innactive.

![sample-image-warning][sample-image-warning]

The `plot_data()` function handles all of the plotting and formatting work, it also generates the output image as a `.png` file.

| param               | info                                                            |
| ------------------- | --------------------------------------------------------------- |
| `data`              | a Pandas DataFrame of Heartbeat data                            |
| `days_back`         | how many days of data to include, default is 3                  |
| `warning_threshold` | inactive block heights over this value are considered innactive |

> This function is long, please see the file in the Github repo for all of the details, the snippet code here is truncated for clarity

```python
def plot_data(data=None, days_back=3, warning_threshold=450):
    """Plot hotspot heartbeat data"""

    latest_date = data.timestamp.max()
    min_date = latest_date - timedelta(days=days_back)
    data = data[data.timestamp >= min_date].copy()

    # get hotspot count for charts
    hotspot_count = len(data.name.unique())

    # create matplot figure
    fig, axes = plt.subplots(
        ncols=1, nrows=hotspot_count, figsize=(15, hotspot_count * 2), sharex=True
    )

    # loop over each hotspot and plot data in a subplot
    for idx, hotspot in enumerate(sorted(data.name.unique())):

        # get data for specific hotspot
        d = data[data.name == hotspot].copy()

        # sort and clean DataFrame index
        d.sort_values(["timestamp"], inplace=True)
        d.set_index(["timestamp"], inplace=True, drop=True)

        # resample data on a 10 minute maximum
        d = d.resample("10T").max()
        d.fillna(method="ffill", inplace=True)

        # get latest innactive count to determin line color and fill
        latest_value = int(d["blocks_inactive"].values[-1])
        color = "r" if latest_value > warning_threshold else "b"
        marker = "d" if d.shape[0] < 30 else ""

        d["blocks_inactive"].plot(
            ax=axes[idx],
            label=f"[{latest_value}] {hotspot}",
            color=color,
            marker=marker,
        )

        # if innactive is grater than warning threshhold, fill in the area under the line
        if latest_value > warning_threshold:
            axes[idx].fill_between(
                x=d.index,
                # y1=warning_threshold,
                y1=0,
                y2=d.blocks_inactive,
                color="r",
                alpha=0.6,
                where=d.blocks_inactive > warning_threshold,
            )

    # write chart to png file
    chart_file = os.path.join(charts_dir, "heartbeats.png")

    axes[0].set_title("Inactive Block Counters")

    plt.savefig(chart_file)

    return chart_file

```

## Quick Access to the Charts

The chart output by `helium_heartbeat_plots.py` overwrites itself, so as to save space and really the most recent data is the most important. With that a very simple webpage is accessible on the local machine to view the latest data via the `plots.html` file. Open this in any web browser to view the plots, or just open the `.png` image file directly.

## More Information

More information on this project can be found on the companion posts here:

- [Monitor Helium Hotspot Activity Part 1, Overview][helim-heartbeat-part-1]
- [Monitor Helium Hotspot Activity Part 2, Using the Helium API][helim-heartbeat-part-2]
- [Monitor Helium Hotspot Activity Part 3, Visualize the Data][helim-heartbeat-part-3] (you are here)
- [Monitor Helium Hotspot Activity Part 4, Notifications with Pushover][helim-heartbeat-part-4]

[github-repo]: https://github.com/samgutentag/helium-heartbeat
[helim-heartbeat-part-1]: https://gutentag.co/3MzZNAb
[helim-heartbeat-part-2]: https://gutentag.co/3MGjUwo
[helim-heartbeat-part-3]: https://www.samgutentag.com/blog
[helim-heartbeat-part-4]: https://www.samgutentag.com/blog
[sample-image-warning]: https://github.com/samgutentag/helium-heartbeat/blob/main/_assets/sample_output_warning.png?raw=true
[sample-image]: https://github.com/samgutentag/helium-heartbeat/blob/main/_assets/sample_output.png?raw=true
