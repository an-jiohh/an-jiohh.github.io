# Token Meter reference reproduction

Source: https://takeruf.com/en/projects/token-meter

Run from the repository root:

```sh
npm run dev:replica
```

Open http://127.0.0.1:4173/. The page is plain HTML, CSS and JavaScript with local
images and font files. It also exports with the existing Next.js site's public
assets at `/token-meter/index.html`.

- `index.html`: semantic page markup, original English copy and links.
- `styles.css`: page-specific reference styles and responsive breakpoints.
- `fonts.css`: observed DM Sans and Noto Sans JP font subsets.
- `theme-init.js`: restore the selected appearance before paint.
- `interactions.js`: gallery, pointer dragging, keyboard and theme transition.
- `assets/`: reference images, icon and observed font files.

The download, policy, release, language and portfolio links retain their real
destinations on the original site. The reproduction covers the specified project
page. Asset sources, three comparison rounds and final captures are recorded in
`docs/token-meter/`.
