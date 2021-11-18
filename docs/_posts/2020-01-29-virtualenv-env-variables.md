---
layout: post
title: "Environment Variables inside Python virtualenvs"
date: 2020-01-29 08:00:00 -0800
last-updated: 2020-01-29
tags: python virtualenvs variables
---

## Set Variables

navigate to `$VIRTUAL_ENV/bin/postactivate`

{% highlight bash %}
export FIRST_NAME="Sam"
export LAST_NAME="Gutentag"
{% endhighlight %}

## Unset Variables

navigate to `$VIRTUAL_ENV/bin/predeactivate`

{% highlight bash %}
unset FIRST_NAME
unset LAST_NAME
{% endhighlight %}

## Verify Variables are being Set and Unset correctly

In this example, use the command `$ printenv | grep _NAME`

- Before activating the virtualenv, it should return no results
- After activating the virtualenv, it should return our variables
- After deactivating the virtualenv, it should return no results
