# Rohit Yentruvi: Game Design Document (portfolio site)

Plain HTML. No build step, no coding tools. Everything you edit is in **one file: `content.js`**.

## What's where
| File / folder | What it is | Do you edit it? |
|---|---|---|
| `content.js` | Every word, room, link and media list on the site | **Yes, this is the only one** |
| `media/screens/<game>/` | Real screenshots per game | Upload new ones here |
| `media/gameplay/` | Screen recordings (mp4) | Upload here |
| `media/art/3d`, `2d`, `sketch` | Art Room pieces | Upload here |
| `media/videos`, `media/posters` | The motion films | No |
| `files/` | Your CV PDF | Replace it to update your CV |
| `index.html`, `css/`, `js/` | The code | No |

## Put it online the first time (GitHub Pages)
1. On GitHub, click **+ → New repository**. Name it `<your-username>.github.io`, set it to **Public**, and click **Create repository**.
2. On the new repo page, click **uploading an existing file**. Drag in **everything inside this folder** (not the folder itself), then click **Commit changes**.
3. Go to **Settings → Pages**. Under "Branch" pick **main** and **/ (root)**, then **Save**.
4. After 1–2 minutes your site is live at `https://<your-username>.github.io`.

## Small edits, right on GitHub
1. Open `content.js` in your repo and click the **pencil icon**.
2. Change the text between the quotes. Keep the quotes and the commas.
3. Click **Commit changes**. The site updates in a minute or two.

### Add screenshots to a game
1. Open `media/screens/`, click **Add file → Upload files**, and upload into a folder named after the game (e.g. `media/screens/alien-out/1.png`). On GitHub you create a folder by typing `alien-out/` in the file-name box.
2. In `content.js`, find the game and edit its `screens:` list:
   ```js
   screens: [
     { src: 'media/screens/alien-out/1.png', note: 'One line on the design decision this screen shows.' },
   ],
   ```
3. Delete the placeholder `.svg` lines once your real ones are in.

### Add art
Upload into `media/art/3d` (mp4 turntables), `media/art/2d` or `media/art/sketch` (images), then add a line to that gallery's `pieces:` list in `content.js`:
```js
{ src: 'media/art/3d/robot.mp4', title: 'Robot', tool: 'Blender · Cycles', time: '~6 hours', year: '2024', note: 'Lighting study.' },
```

### Add a new project room
Copy one whole `{ id: ... },` block in `quests:`, paste it below, and change the `id` (no spaces) and the text. Set `tab:` to `'main'`, `'side'`, `'codex'` or `'inventory'` to choose its row.

## If something breaks
Usually a missing comma or quote. On GitHub open `content.js` → **History**, pick the last working version, and restore it. Or send the file to Claude.
