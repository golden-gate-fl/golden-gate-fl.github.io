# golden-gate-fl.github.io

Public help pages for devices in the Golden Gate clubhouse, published by GitHub Pages at
<https://golden-gate-fl.github.io/>. Each device has a QR code on the wall beside it that opens
its own folder here:

| Folder | Device | Master copy |
| --- | --- | --- |
| [`clubhouse-display/`](https://golden-gate-fl.github.io/clubhouse-display/) | The LED sign above the kitchen opening | `site/` in [clubhouse-display](https://github.com/golden-gate-fl/clubhouse-display) (private) |
| `club-printer/` (planned) | The Men's Club printer | `site/` in [club-printer](https://github.com/golden-gate-fl/club-printer) (private) |

Each device's page explains how to use it, links to simple forms that fill in an email to the
device (the person checks it and presses Send in their own mail app), and links to a public
maintenance page.

There is no park home page here on purpose: the park's website is a separate project (the
portal). This site stands on its own and isn't part of the park software plan. When the park
software is built it will likely replace this site, perhaps copying some of its pages; the QR
labels will be reprinted then and this site retired, so old addresses don't need to keep working.

## Publishing

Don't edit a project's folder here. Edit `site/` in the project's own repo, commit, then run
from this repo (with the park repos cloned side by side):

```
tools/publish <project>        # e.g. tools/publish clubhouse-display
```

It copies `../<project>/site/` into `<project>/`, commits and pushes. GitHub Pages shows the change
a minute or so later.

## Everything here is public

Anyone can read this repo and every page in it, including pages nothing links to. Never put
here: residents' names, phone numbers or lots, passwords or keys, the approved-sender lists, or
admin addresses and commands.
