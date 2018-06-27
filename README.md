# zapier-platform-mastodon-reblloger

Using a hashtag search, reblog status posts from one instance of Mastodon to another using the [Mastodon API](https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md).

# Bot Ethics Disclaimer
This bot will not reblog or follow any accounts that have "nobot" in their bio. If the user has locked their account (if the user has set their account up so that they must approve all new followers), and the host instance is on a recent version of Mastodon, it will not attempt to follow them.

In general, auto reblog bots should not be set to reblog more than once per hour. For searches that have infrequent posts, once per day should generally suffice. Because reblogs are automatically unlisted, this bots will not appear in the timeline.

# Functionality
Within Zapier, use the default Schedule app function to trigger no more than once per hour. Typically once per day will suffice. Then, enter in the required information including the term for which you'd like to search. If there have been more than one post since the last time the bot ran, it will miss any but the most recent post. For that reason, don't expect this bot to post every post using a hashtag from the source instance.
