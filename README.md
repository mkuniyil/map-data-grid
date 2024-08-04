# Map Data grid

This project is bootstrapped with [Vite](https://vitejs.dev/guide/).

## Install & Run Project

Install all dependencies using the command

```bash
pnpm install
```

Build

```bash
pnpm build
```

Run locally

```bash
pnpm dev
```

Run offline

```bash
pnpm preview
```

Project is hosted here [map-data-grid](https://map-data-grid.vercel.app/)

## Tech Stack

### Frontend

- Used `vite` react template for the simplicity of setup
- Used `Mapbox` for the showing maps and get the geolocation api's
- Used `tailwind UI` for styling UI
- Implemented `responsive design`

> Development : React, Typescript, Tailwind CSS, Tailwind UI, Mapbox

### Functionality

- When page loads, it should take you to the current location and shows the restaurants in your location.
- Same should be shown in the grid.
- Based on the zoom level map will show you the restaurants in respective areas.
- Click on the marker will show you the details of place.
- Additionally you can search and then go to different locations, and the restaurants in those locations should be shown.

### Improvements

- Currently the search is only for restaurants, this could be dynamic and user should be able to tell what to look for.
- I added `ts-ignore` to the code for time being, need to identify proper types and remove this.
- Writing tests
