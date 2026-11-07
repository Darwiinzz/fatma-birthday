# 🎂 Happy Birthday, Fatma

An interactive birthday gift — typing intro, a playful "ready?" question,
music, 3D flip-card photos, a handwritten letter and a fireworks finale.

Built with **Next.js 15 · TypeScript · Tailwind CSS · Framer Motion · canvas-confetti · Lucide**.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Edit the content

Everything she reads lives in **`lib/content.ts`**:

| What            | Where                                   |
| --------------- | --------------------------------------- |
| Intro sentences | `introLines`                            |
| Question / NO replies | `question`                        |
| Photos + captions | `photos` (add a new object per photo) |
| The letter      | `letter` (one line per entry, `""` = gap) |
| Song title      | `song`                                  |
| Finale text     | `finale`                                |

### Add a photo

1. Put the image in `public/photos/` (e.g. `4.jpg`).
2. Add to `photos` in `lib/content.ts`:

```ts
{
  src: "/photos/4.jpg",
  alt: "Short description",
  focus: "50% 30%", // keeps the face in frame
  caption: ["First line...", "Second line."],
},
```

The gallery and the card numbers update automatically.

### Music

The song lives at `public/music/song.mp3`. It tries to start as soon as the
page opens; if the browser blocks sound before any interaction (most do on a
first visit), it starts on her first tap or key press.

## Deploy free on GitHub Pages

1. Create a GitHub repo and push this folder to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes automatically.
   Your link will be `https://<username>.github.io/<repo-name>/`.

The base path is set automatically from the repo name, so images and music
work on Pages without any changes.

## Build manually

```bash
npm run build   # static site in ./out
npm start       # preview ./out locally
```
