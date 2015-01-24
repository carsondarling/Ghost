# Ghost for JSON

This repository is a fork of Ghost with the minimum set of changes in order to have Ghost provide a consumable JSON API. It is designed to run with [GhostJSON](https://github.com/carsondarling/GhostJSON) as the theme.

The current list of changes:

- Added two Handlebars helpers
  - `safe`: Escape HTML for embedding into JSON
  - `cleanJSON`: Remove excess whitespace from "pretty" JSON
- Add appropriate headers to frontend pages
  - `Content-Type: application/json`
  - `Access-Control-Allow-Origin: *`

## Running

Currently, the easiest way to run this fork is cloning from Github. Follow the official Ghost [instructions](https://github.com/TryGhost/Ghost#install-from-git), but make sure you're on the correct branch.

## Issues

If you run across any issues, or have a cleaner way of providing the needed features, please let me know! I'm in the process of dog-fooding this, so we should be close.