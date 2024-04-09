---
layout: post
title: 'Working with MDX files in VSCode'
date: 2024-04-09 08:00:00 -0800
last-updated: 2024-04-19
tags: markdown jsx docusaurus vscode
published: true
---

> Markdown, eXtreme?

## Overview

MDX lets users write Markdown with embedded components through JSX. In my work I mostly use MDX
files when working on documentation sites build on [Docusaurus](https://docusaurus.io)

VSCode does not treat MDX files in the same way it handles standard markdown files out of the box.

To get around this, in your `settings.json` file, add the following:

```json

"files.associations" {
  "*.mdx": "markdown"
}

```

Thats it, now extensions like "[markdownlint][markdownlint-link]", "[Markdown Preview
Enhanced][markdownpreviewenhanced-link]", and "[Markdown All in One][markdownallinone-link]"

[markdownlint-link]:
  https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint
[markdownpreviewenhanced-link]:
  https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced
[markdownallinone-link]:
  https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one
