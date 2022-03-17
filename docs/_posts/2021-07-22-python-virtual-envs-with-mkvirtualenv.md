---
layout: post
title: "Python virtualenvs with mkvirtualenv"
date: 2021-07-24 08:00:00 -0800
last-updated: 2022-03-16
tags: python virtualenvs variables
---

> Think "nice tidy boxes", but not yet Docker.

## Create a virtualenv

Let's say you wanted to create a `virtualenv` for a new project using `python3` called `gutentag`

{% highlight bash %}
mkvirtualenv -p `which python` gutentag
{% endhighlight %}

This command can be run from anywhere, though I tend to create a directory for the project in my `$HOME/Developer/` directory with the same name as the `virtualenv`.

## Delete a virtualenv

What if you no longer need a particular `virtualenv`? Use the `rmvirtualenv` command.

{% highlight bash %}
rmvirtualenv gutentag
{% endhighlight %}

## List all current virtualenv

To output a list of existing `virtualenv` setups, use the `lsvirtualenv` following command, note the `-b` option for brevity.

{% highlight bash %}
lsvirtualenv -b
{% endhighlight %}

---

## Installing mkvirtualenv

**These steps are copy/pasted from [this stackoverflow Post][stackoverflow-post] so that I can find them quickly.**

To install `virtualenv` and `virtualenvwrapper` for repetitive use you need a correctly configured Python (this example uses `Python 3.x` but the process is identical for `Python 2.x`).

Although you can get the `python` [installer from Python website][python-installer] I advise against it. The most convenient and future-proof method to install `Python` on `MacOS` is [brew][homebrew-link].

Main difference between installer from Python website and brew is that installer puts `python` packages to:

{% highlight bash %}
/Library/Frameworks/Python.framework/Versions/3.x
{% endhighlight %}

`Brew` on the other hand installs `Python`, `Pip` & `Setuptools` and puts everything to:

{% highlight bash %}
/usr/local/bin/python3.x/site-packages
{% endhighlight %}

And though it may not make any difference to you now – it will later on.

---

## Configuration steps

### Install brew

Check out `brew` installation page or simply run this in your terminal:

{% highlight bash %}
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
{% endhighlight %}

### Install Python

To install `python` with `brew` run:

{% highlight bash %}
brew install python3
{% endhighlight %}

Now your system needs to know where to look for freshly installed Python packages. Add this line to youre `~/.zshrc` (or `~/.bash_profile` if you're using `bash`):

{% highlight bash %}
export PATH=/usr/local/share/python:$PATH
{% endhighlight %}

**Restart your terminal.** To make sure you've done everything correctly, run `which python3` and in return you should receive `/usr/local/bin/python`.

### Install virtualenv & virtualenvwrapper

Now it's time to install `virtualenv` and `virtualenvwrapper` to be able to use `workon` command and switch between virtual environments. This is done using `pip`:

{% highlight bash %}
pip3 install virtualenv virtualenvwrapper
{% endhighlight %}

### Set up virtualenv variables

Define a default path for your virtual environments. For example you can create a hidden directory inside `~` and call it `.virtualenvs` with `mkdir ~/.virtualenvs`. Add `virtualenv` variables to `.zshrc` (or `.bash_profile`).

Final version of your `.zshrc` (or `.bash_profile`) should contain this information to work properly with installed packages:

## Setting PATH for Python 3 installed by brew

{% highlight bash %}
export PATH=/usr/local/share/python:$PATH
{% endhighlight %}

## Configuration for virtualenv

{% highlight bash %}
export WORKON_HOME=$HOME/.virtualenvs
export VIRTUALENVWRAPPER_PYTHON=/usr/local/bin/python3
export VIRTUALENVWRAPPER_VIRTUALENV=/usr/local/bin/virtualenv
source /usr/local/bin/virtualenvwrapper.sh
{% endhighlight %}

### Restart your terminal

You should be able to use `mkvirtualenv` and `workon` commands including autocompletion.

[stackoverflow-post]: https://stackoverflow.com/a/49528037
[python-installer]: https://www.python.org/downloads/
[homebrew-link]: https://brew.sh/
