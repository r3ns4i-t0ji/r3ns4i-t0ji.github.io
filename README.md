# Profile — GitHub Pages starter

A responsive, dark anime/manga-inspired personal portfolio built with plain HTML, CSS, and JavaScript. No framework or build step is needed.

## 1. Personalize it

Use your editor's Find/Replace to change:

- `r3ns4i_T0ji` → the display name you want on the website
- `r3ns4i-t0ji` → your GitHub username
- `2026` → an optional year
- Sample About / Learning / Writeup text → your own details

The background artwork is original CSS/SVG-inspired abstract artwork. To use a Toji Fushiguro image instead, add an image you are allowed to use as `assets/toji-bg.jpg`, then add this CSS rule to `.hero-art`:

```css
.hero-art {
  background-image: linear-gradient(0deg, rgba(5,8,7,.88), rgba(5,8,7,.15)), url('assets/toji-bg.jpg');
  background-position: center;
  background-size: cover;
}
```

If you want the image to replace the geometric silhouette too, add `.figure-shadow { display: none; }` to the CSS. The site remains functional without this optional image.

## 2. Publish with GitHub Pages

1. Create a repository named exactly `r3ns4i-t0ji.github.io` (replace this with your actual GitHub username).
2. Upload `index.html`, `style.css`, `script.js`, `README.md`, and the `assets` folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch **main** and folder **/(root)**, then click **Save**.
6. Wait for the first deployment, then open `https://YOUR_USERNAME.github.io`.

GitHub Pages is public website hosting, so don't publish private details, passwords, API keys, or anything you do not want publicly visible.

## 3. Test locally

Open `index.html` in a modern browser. Navigation and the responsive menu work without a server.
