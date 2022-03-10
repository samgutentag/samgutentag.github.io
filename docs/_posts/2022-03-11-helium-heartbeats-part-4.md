---
layout: post
title: "🎈 Monitor Helium Hotspot Activity Part 4, Notifications with Pushover"
date: 2022-03-09 08:00:00 -0800
last-updated: 2022-03-11
tags: python helium pushover
published: false
---

> Raspberry, you have the Cron.

# Crons and Push Notifications

![sample image][sample-image]

[sample-image]: https://github.com/samgutentag/helium-heartbeat/blob/main/_assets/sample_output.png?raw=true

## Notifications with Pushover

This setup uses two [Pushover][pushover-website] Apps to communicate `Timely` and `Status Change` updates.

This can be setup with any number of PushOver Apps, though these two provide a useful balance of information.

To get started, head over to the [Pushover Website][pushover-website] and create an account if you do not already have one.

> To match my setup, you will need to purchase the [Pushover App for iOS][pushover-ios] application, which is free to use for 30 days, but requires a one time $5 purchase for a lifetime unlock on each platform (desktop/android/ios). Its worth it, seriously. For more information see [Pushover's Pricing][pushover-pricing]

Once you have a Pushover account, lets create some API Keys.

### Pushover API

[github-repo]: https://github.com/samgutentag/helium-heartbeat
[sample-image]: https://github.com/samgutentag/helium-heartbeat/blob/main/_assets/sample_output.png?raw=true
[sample-image-warning]: https://github.com/samgutentag/helium-heartbeat/blob/main/_assets/sample_output_warning.png?raw=true
[virtual-env-blog]: ./2020-01-29-virtualenv-env-variables.md
[shell-output-image-file]: https://github.com/samgutentag/helium-heartbeat/blob/main/_assets/env-setup-shell-output.png?raw=true
[pushover-website]: https://pushover.net/#apps
[pushover-ios]: https://pushover.net/clients/ios
[pushover-pricing]: https://pushover.net/pricing
[helim-heartbeat-part-1]: https://gutentag.co/3MzZNAb
[helim-heartbeat-part-2]: https://gutentag.co/3MGjUwo
[helim-heartbeat-part-3]: https://www.samgutentag.com/blog
[helim-heartbeat-part-4]: https://www.samgutentag.com/blog
