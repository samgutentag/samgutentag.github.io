---
layout: post
title: "Using scp with ohmyzsh"
date: 2022-02-19 08:00:00 -0800
last-updated: 2022-02-19
tags: scp terminal ohmyzsh zsh
---

This trips me up everytime I attempt to copy files from a RaspberryPi to my MacBook.

When using a `zsh` shell, you must escape wildcard characters.

## Good

```bash
> scp pi@123.45.67.89:/home/some/dir/\* ./data/
```

## Bad

```bash
> scp pi@123.45.67.89:/home/some/dir/* ./data/
```

## Source

Credit goes to [this stack overflow response][stack-overflow-post] that I have stumbled towards dozens of times.

[stack-overflow-post]: https://superuser.com/questions/420525/scp-with-zsh-no-matches-found
