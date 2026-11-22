# AGENTS.md: golden-gate-fl.github.io

Instructions for any AI assistant working in this repo. Humans: see README.md.

## What this repo is

The public GitHub Pages site for clubhouse devices: one folder per device project, each the
target of the QR code on the wall beside that device. Plain HTML, CSS and JavaScript, no build
step. Not part of the park software plan, and not the park's website (that's the portal); see
README.md. Started 2026-11-22.

## Rules

1. **One folder per project, owned by that project.** The master copy is `site/` in the
   project's own repo; `tools/publish <project>` copies it here. Never edit a project's folder
   in this repo; change it in the project and publish.
2. **Everything is public**, including unlinked pages and the git history. No residents' names,
   phone numbers or lots, no secrets, no approved-sender lists, no admin addresses or admin
   commands. Removing something later doesn't remove it from the history.
3. **Root stays minimal:** no park overview. `index.html` only says what the site is.
4. **Email forms only open an email.** A form builds a `mailto:` link (to, subject, body) and
   the person sends it from their own mail app, so the device's approved-sender check applies.
   No servers, no form services, no tracking or analytics. After Submit, show the address and
   message with copy buttons, for computers without a mail app.
5. **Pages must work for older residents on phones:** large text, plain words, big buttons.
6. Keep `.nojekyll` (files are served as they are).
7. A new project: add its row to README.md and give it its own folder via `tools/publish`.

## Files

| Path | Holds |
| --- | --- |
| `index.html` | Minimal root page |
| `tools/publish` | Copies `../<project>/site/` here, commits and pushes |
| `<project>/` | Published copy of each project's `site/`; don't edit here |
| `.nojekyll` | Tells GitHub Pages not to process the files |
