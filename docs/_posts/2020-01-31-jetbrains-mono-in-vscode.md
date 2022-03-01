---
layout: post
title: "Using JetBrains Mono inside VSCode"
date: 2020-01-31 08:00:00 -0800
last-updated: 2022-03-01
tags: codeeditor vscode fonts
---

Using a custom font is fancy, and can even be useful too.

## Using JetBrains Mono Inside VSCode

JetBrains Mono can be downloaded from the [JetBrains Site Here][jetbrains-font]

The information below assumes that you have downloaded the font, unzipped it and added to the macOS Font Book.app

### macOS settings.json file location

On macOS the `settings.json` file is located here:

{% highlight bash %}
$HOME/Library/Application Support/Code/User/settings.json
{% endhighlight %}

### Contents of Settings File

Here is a snippet from my `settings.json` file, commented for reference.

{% highlight json-doc %}
{
// Set the font
"editor.fontFamily": "'JetBrains Mono', Consolas, monospace",
// Turn on font ligatures
"editor.fontLigatures": true
}
{% endhighlight %}

[jetbrains-font]: https://www.jetbrains.com/lp/mono/
