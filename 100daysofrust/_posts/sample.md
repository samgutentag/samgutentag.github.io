---
layout: post
title: 'Clipping Safeway Coupons with Python'
date: 2019-06-04 08:00:00 -0700
last-updated: 2022-03-01
tags: python selenium automation
category: 100daysofrust
---

> Clipping coupons, with code.

## Im Tired Of Tapping

I grocery shop on a weekly basis, mostly because I live in a small San Francisco apartment with a
refrigerator from the early 1200's, but also because I am learning to enjoy cooking and fresh
ingredients are _actually_ starting to taste better to me.

My local grocery store (Safeway) has a membership program like all good chain grocers do, and offers
an option to clip coupons digitally.

This is great! But this is boring. Scrolling through the mobile app or website while rapid fire
tapping the 'Add' button became a hassle and something that I constantly forgot to do until I was
sitting in the parking lot outside the store.

## Enter: Python! (and Selenium, and cron, and chromedriver, and other stuff)

To overcome this boring and forgetful stumbling block to savings, I wrote myself a python script
that uses [Selenium][selenium-link] and [chromedriver][chromedriver-link] to hack together my own
Safeway Coupon API.

The project is hosted on github here [Safeway Clipper][safeway-clipper]

The key part of this project was to be a set and forget task that runs on a normal interval so that
anytime I show up at Safeway, I am likely to have as many coupons clipped as is actually possible.

To accomplish this, the main script is wrapped into a cron job. This allows the old [2010 Macbook
Pro][2010-macbook-pro] still chugging along in my back closet to run this script every night.

## Approach

The Code itself is split into 5 key steps.

1. parse command line arguments from user
2. initialize the webdriver
3. log into Safeway with stored user credentials
4. clip coupons
5. savings! (a form of profit!)

## Code

### Step 1. Parsing command line variables

This script allows the user to pass 3 variables, all are technically optional (sorta, see Step 3).
Running in `headless` mode allows the script to open the webdriver without pulling up a chrome
window to watch and manage, and for headless machines, this is ideal. Don't pass this argument if
you want to watch the clipping magic.

### Step 2. Initialize webdriver

This is pretty straightforward, it tries to spin up a webdriver instance, and fails if it can't.
This is where the `headless` setting is actually applied.

### Step 3. Log into Safeway with Stored User Credentials

Users can pass a `password` and `username` to the command line arguments. If those arguments are not
passed the script will attempt to use store Environment Variables! Which is cleaner in my setup.

### Step 4. Clip Coupons

This is where the magic happens. Safeway is overtime evolving, and this section would have changed
several times had I had written this post when I first got started.

Currently the offers are stored on a single page accessible once you are logged in, and that page
does not have infinite scrolling but instead a button to 'load more offers'.

The code logic follows a simple loop: keep scrolling until no more clickable 'Add Offer' buttons are
found. After each scroll, the script checks how many 'Add Offer' buttons it has collected, and if
that number is not greater than the previous scroll, stop scrolling!

Once it is done scrolling, click all the offers and close the webdriver!

Running in `headless` mode will suppress any console output. Which means the next version of this
script needs logging features.

### Step 5. Savings

This is a throw away step, as long as I just remember to punch in my membership number at the
register these coupons are applied to my total.

## Automatic Clipping

To automate this whole thing, I run it on a `crontab` on a computer in my back closet that manages a
bunch of other things.

The cron command I use runs this process at 4:37 am everyday local time. Why 4:37 am? no real reason
aside from my laptop wont be doing anything else at that time.

## Next Steps and Room for Improvement

The obvious next feature I need to add is some kind of user notify system for when this script
fails. Every so often new popups and navigations are required on the Safeway website and I would
love to get notified in some way when the script errors out.

1. Crash Reporting
2. Logging
3. Cross Reference with Grocery List?
4. Move to a Raspberry Pi?

[selenium-link]: https://www.seleniumhq.org
[chromedriver-link]: https://sites.google.com/a/chromium.org/chromedriver/downloads
[safeway-clipper]: https://www.github.com/samgutentag/safewayClipper
[2010-macbook-pro]: https://support.apple.com/kb/sp582?locale=en_US
