# ak-portfolio

Personal portfolio website built with React and Vite, hosted on GitHub Pages at https://arnav149.github.io/ak-portfolio.

## Development

### `npm start`

Runs the Vite dev server. Open [http://localhost:3000/ak-portfolio/](http://localhost:3000/ak-portfolio/) to view it in the browser.

### `npm test`

Runs the Vitest suite once (`npm run test:watch` to keep it running).

### `npm run build`

Builds the app for production to the `build/` folder.

### `npm run deploy`

Builds the app and publishes `build/` to the `gh-pages` branch with the `gh-pages` package; GitHub Pages serves that branch.

## Editing content

All copy (projects, experience, skills, links and the left-swipe messages) lives in `src/content.js`. Projects have a `cat` of `work` or `personal`, which controls the filter they appear under.

## Structure

- `src/App.jsx`: boot loader, then the single-page site
- `src/components/BootLoader.jsx`: terminal loading screen (plays once per browser session; `./reboot` in the footer replays it)
- `src/components/Projects.jsx`: work/personal filter, swipe and list modes, liked panel
- `src/components/SwipeCard.jsx`: the draggable card (pointer events, written directly to the DOM so drags never re-render)
- `src/components/Sections.jsx`: hero, git-log experience, skills and contact
