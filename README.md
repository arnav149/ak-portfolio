# ak-portfolio

Personal portfolio website built with React, hosted on GitHub Pages at https://arnav149.github.io/ak-portfolio.

## Development

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build/` folder.

### `npm run deploy`

Builds the app and publishes `build/` to the `gh-pages` branch with the `gh-pages` package; GitHub Pages serves that branch.

## Editing content

All copy (projects, experience, skills, links and the left-swipe messages) lives in `src/content.js`. Projects have a `cat` of `work` or `personal`, which controls the filter they appear under.

## Structure

- `src/App.js`: boot loader, then the single-page site
- `src/components/BootLoader.js`: terminal loading screen (plays once per browser session; `./reboot` in the footer replays it)
- `src/components/Projects.js`: work/personal filter, swipe and list modes, liked panel
- `src/components/SwipeCard.js`: the draggable card (pointer events, written directly to the DOM so drags never re-render)
- `src/components/Sections.js`: hero, git-log experience, skills and contact
