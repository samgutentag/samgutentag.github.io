---
layout: post
title:  "Setting Slack Status with Siri Shortcuts and Zoom"
date:   2020-03-26 08:00:00 -0800
last-updated:   2020-03-27
categories: zoom slack shortcuts
---

## Working from Home Together

As we all transition to the Work From Home lifestyle, my wife and I are seemingly always on and off Zoom calls. To keep each other in the loop and quiet on the opposite sides of out small desk, we have been using the `/status :zoom: on a call` command in Slack to set our status.

## Setting Slack Status with the `/status` command

In both of these Slack Workspaces I added a nice little Zoom emoji (see steps below) and have been using the slash command `/status :zoom: on a call` to update my status.

Using this `/status` command to update my status for my remote team of coworkers _and_ my wife in our private Workspace so she can see it on the other side of the desk from me is an annoying wo step process, and I typically forget to clear my status once the call is over.

### Adding Custom Emoji to Slack

Tons of fun and useful emojis for Slack can be found at [slackmojis.com](https://slackmojis.com/) (this site does not always play well with Safari, fair warning).  A quick search for Zoom leads you [here](https://emojis.slackmojis.com/emojis/images/1567179639/6288/zoom.png?1567179639) download this image.

Follow the steps on the Slack Support Article [Add Custom Emoji](https://slack.com/help/articles/206870177-Add-custom-emoji) to add the custom emoji to your Slack Workspace(s).

### Install and setup StatusHook App in Slack

In a new browser tab, navigate to [statushook.cool](https://www.statushook.cool/) where you will need to click the "Add to Slack" button and install the application in your desired Workspace(s).

Once it is installed, you will need to run two slash commands to generate POST urls to

- Set a Status
  - `/statushook add :zoom: on a call`
  - template: `/statushook :<emoji>: <status text>`
- Clear your status
  - `/statushook add :bacon: clear`
  - template: `/statushook :<any emoji>: <status text>`
  - the emoji does not matter here, and everyone likes bacon

After each of these commands are run, you will be returned a URL.  It will look something like this:

`https://api.statushook.cool/v1/prod/webhook/fire?id=<your_token_here>`

This URL will only work for the user who generated it.

### Using this URL within a Siri Shortcut

Now that we have our POST urls create a new Siri Shortcuts.  You will be passing the URL to a "Get Contents of" action.

In my case, I want to update my "On A Call" status in two different Slack Workspaces, so I added a List action, and then a "Repeat with each item in" action to loop over my URL list and update the status in each Workspace.

![siri_shortcut_image](https://i.imgur.com/3BErYFI.jpg)

Save this Shortcut as "Slack On A Call" or something you will remember, and send it to your homescreen for quick reference.

Now the easiest way to create an "Slack Off Call" shortcut is to duplicate the "Slack On Call" shortcut you just made and replace the URL(s) with the status clear URL(s) generated above.

You can download the template shortcuts here, just be sure to add your StatusHook URLs where appropriate.

[Siri Shortcut Download](https://gutentag.co/3byuGlf)

---

## Getting Fancy with Zoom Events API

**UPDATE March 27, 2020 - So this only works for meetings you are hosting... still working on a setup for joining and leaving meetings hosted by other users...**

So you have got the ability to set a Slack Status with a Siri Shortcut, but then you realized, why not just set your Slack Status using Zoom directly?

This was not nearly as painful as I thought it would be, but it does require "Developer Permissions" on your Zoom account (which free accounts have).  If you are on a company managed Zoom account, you will get stumped at the first step.

### Creating a Zoom Webhook App

To start, sign into your Zoom account on the [Zoom website](https://www.zoom.us) you will need to navigate to the [Zoom App Marketplace](https://marketplace.zoom.us/) and look for the "Develop" dropdown in the upper right hand corner and select "Build App".

### Creating a "Webhook Only" Zoom App

If you have Developer Permissions, the blue "Create" button on the "Webhook Only" tile (bottom middle at the time of writing) will be clickable.  If it is not, try contacting your Zoom admin and come back, but sorry, you are done for now.

![zoom_00](https://i.imgur.com/1kkszq2.png)

### Using StatusHook.cool URLs

Assuming you can continue, give your app a name.  I chose "Slack Stutus" for mine, because that is all the app is managing.

Fill out all the required fields in "Basic Information" and the "Developer Contact Information" then click the blue Continue button.

![zoom_01](https://i.imgur.com/zc2TZQS.png)

Toggle "ON" the Event Subsciptions. You will be adding one for each StatusHook URL

![zoom_02](https://i.imgur.com/LdBEuWD.png)

### On Call Status

Add a new event subscription and call it `Call Started - <your Workspace name>`

Paste your "On Call" StatusHook URL in the Event notification endpoint URL field.

![zoom_03](https://i.imgur.com/dedjKzS.png)

Click the Add Events button in the Event Types field and select only the "Start Meeting" event type, click Done. Then click save.

![zoom_04](https://i.imgur.com/glOGrsz.png)

### Off Call Status

Add another new event subscription and repeat the steps for your "Off Call" StatusHook URL **except** use the "End Meeting" event type instead of "Start Meeting"

![zoom_05](https://i.imgur.com/FzO9YdS.png)

### Test it out

Click the blue Continue button and ensure that your app is activated on the account, you should see a green circle with a check mark.

![zoom_06](https://i.imgur.com/qSjVwjr.png)
