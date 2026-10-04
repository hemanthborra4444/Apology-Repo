# Cute Surprise App

A small mobile-friendly React/Vite apology-surprise web app.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Vite prints in your terminal.

## Build

```bash
npm run build
```

The production files will be in `dist/`.

## Deploy with Vercel

1. Upload this folder to GitHub.
2. Go to Vercel and import the GitHub repository.
3. Vercel should detect Vite automatically.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

## Deploy with Netlify

1. Upload this folder to GitHub.
2. In Netlify, choose **Add new site > Import an existing project**.
3. Select the repository.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy.

## Change the correct answer

Open `src/main.jsx` and edit:

```js
const CORRECT_ANSWER = 'chinnu';
```

## Change the text

All main text is grouped inside the `copy` object near the top of `src/main.jsx`.

## Replace the cat image

Replace:

`src/assets/cat.svg`

with your own image, or change this import in `src/main.jsx`:

```js
import catImg from './assets/cat.svg';
```

You can use `.png`, `.jpg`, `.webp`, or `.svg`.

## Replace the mouse doll image

Replace:

`src/assets/mouse-doll.svg`

or change this line in `src/main.jsx`:

```js
import mouseDollImg from './assets/mouse-doll.svg';
```

The included graphic is an original generic mouse-eared doll placeholder, so you can replace it with your preferred image later.
