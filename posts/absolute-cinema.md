---
title: Absolute Cinema
tagline: Scorsese himself would be proud
date: 2025-07-30T19:00:00.000-06:00
draft: false
---

In a recent stream, [DougDoug](https://www.twitch.tv/dougdoug) taught
[Atrioc](https://www.twitch.tv/atrioc) and [Aimen gamin](https://x.com/aidencalvin) to
program. They went through a few fun little exercises in Python, like building a
custom little hotkey program. The last exercise would connect to each stream's
chat, listen to cheers (donations), and run the streamer's code. Atrioc and
Aimen would be the ones to implement what would happen for each donation.

As far as I know, Twitch doesn't really provide a very good way to check if a
message contains a cheer or get how much it is for. That's going off of
anecdotal evidence, I don't know what it looks like now and quite frankly I'm
too lazy to go check.

So in this case, DougDoug had to implement his own check to see if a message
contains a cheer. Effectively, the check is if a space delimited word starts
with one of a few words like "cheer" and ends with a number. For example,
"cheer100" would cheer 100 bits (cents). This is implemented like this:

```python
            words = message.content.lower().split()
            for word in words:
                # Common cheer patterns: cheer100, kappa50, pogchamp25, etc.
                if any(word.startswith(cheer) for cheer in ['cheer', 'kappa', 'pogchamp']):
                    # Extract number from the end of the cheer
                    import re
                    match = re.search(r'(\d+)$', word)
                    if match:
                        try:
                            bits_amount += int(match.group(1))
                        except (ValueError, TypeError):
                            pass
```

([Code on Github](https://github.com/DougDougGithub/Teaching-Streamers-to-Code/blob/8c2bbeb3b1059457d9a1c211c5d884d6ea7bcac1/Level%205/level_5_testing.py#L112-L123))

This is the brief piece of code that I saw on Atrioc's stream and I almost
couldn't believe my eyes. This code implements the check described above, but
critically it _only_ implements the check from above. The word _only_ needs to
start with "cheer" and end with a number. Anything can be in the middle, so for
example, "cheerc100" would be registered as a cheer for 100 bits without
actually charging me money.

Now, at first I was under the presumption that this code was called for
somewhere that already knew the message contained a cheer. In that case, this
code is really good at finding the amount of bits in the message. However, this
code is run on _every_ message in chat and at that, as a fallback in case a
different way of checking if the message contains a cheer doesn't find one.

Come to find out, DougDoug commit the code for this stream to Github. So I
moseyed my little 'ol self on over to his Github and wouldn't you know it, my
intuition was right. You can put ANYTHING in the middle of "cheer" and any
number and the program will assume it's an actual cheer.

After my initial test, there were a flurry of "cheerc1000000000000000000" as you
would imagine. I was just proud that my intuition was right to be honest.
Nothing too serious or crazy here, just wanted to write up what this was. And
to give my professional opinion, this stream was definitely Cinema
