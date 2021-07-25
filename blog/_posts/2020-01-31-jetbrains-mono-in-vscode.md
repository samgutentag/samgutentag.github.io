---
layout: post
title:  "Using JetBrains Mono inside VSCode"
date:   2020-01-31 08:00:00 -0800
last-updated:   2020-01-31
categories: codeeditor vscode fonts
---

## Using JetBrains Mono inside VSCode

JetBrains Mono can be downloaded from the [JetBrains Site Here](https://www.jetbrains.com/lp/mono/)

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
