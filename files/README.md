# Callum — Game Developer Portfolio

Personal portfolio for COMP710 at AUT. Built as a static multi-page website hosted on GitHub Pages.

## Structure

```
index.html              ← Homepage
css/main.css            ← All styles
js/main.js              ← Animations, scroll effects, canvas
pages/
  projects.html         ← All 4 game projects
  devlog.html           ← Weekly development log (Weeks 1–13)
  labs.html             ← Lab exercises and screenshots
  about.html            ← About me + skills
  contact.html          ← Contact links
images/
  projects/             ← Put project screenshots here
  labs/                 ← Put lab screenshots here
```

## Adding Your Screenshots

Replace the placeholder boxes in each page with real `<img>` tags:

```html
<!-- Find this: -->
<span>Add screenshot: rally-main.png</span>

<!-- Replace the whole placeholder div with: -->
<img src="../images/projects/rally-main.png" alt="Rally Apex Hunter gameplay">
```

For labs it's the same but `src="../images/labs/lab1.png"`.

## Filling In Your Content

Search for `<!-- ADD` comments throughout the HTML files — these mark every spot where your own text needs to go.

Key spots:
- `devlog.html` — fill in weeks 5–13 titles and content
- `projects.html` — fill in the Reflection sections for each game
- `about.html` — edit the background blurb and what you're looking for
- `contact.html` — replace the email and LinkedIn URL

## Enabling GitHub Pages

1. Push all files to your `main` branch
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Save — your site will be live at `https://CalCode110.github.io/Callum_Portfolio`

## Built With

- Vanilla HTML / CSS / JS — no frameworks
- [Syne](https://fonts.google.com/specimen/Syne) + [DM Mono](https://fonts.google.com/specimen/DM+Mono) (Google Fonts)
- Canvas API for animated hero grid
