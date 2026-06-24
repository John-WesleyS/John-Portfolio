# John Wesley — Portfolio Website

A static HTML/CSS/JS portfolio. No build step, no frameworks, no dependencies to install — open `index.html` in a browser and it works.

## Files

```
portfolio/
├── index.html      All page content and structure
├── styles.css      All styling, theme variables, responsive rules
├── script.js       All interactivity (boot animation, typing effect,
│                   theme toggle, scroll reveals, counters, project
│                   filter, copy-to-clipboard, contact form)
└── assets/
    └── README.txt  Where to drop your resume PDF / profile photo
```

## Before you deploy

1. **Add your resume.** Save it as `assets/John_Wesley_Resume.pdf`. The
   "Download Resume" button in the hero already points to this exact path —
   if the file isn't there, the button will 404, so don't skip this.
2. **Replace placeholder GitHub repo info.** In `index.html`, search for
   `gh-repo-list` and swap in your real pinned repositories, descriptions,
   and primary language.
3. **Replace placeholder demo links.** Project cards currently link `#`
   for "Live Demo" — point these at your actual deployed clone URLs once
   you have them, or remove the button if a project isn't deployed yet.
4. **Double-check contact details** (email, phone, LinkedIn, GitHub) are
   still correct — they appear in three places: the contact section, the
   footer, and the `mailto:` link in the contact form handler in `script.js`.

## How the contact form works

There's no backend. Submitting the form opens the visitor's default email
client with a pre-filled message addressed to your email — this is the most
reliable zero-server option. If you'd rather collect submissions in a
database or get a notification without relying on the visitor's mail app,
swap the form's submit handler in `script.js` for a service like Formspree,
Web3Forms, or Netlify Forms (a few lines of HTML attribute changes — ask if
you want this wired up).

## Deployment options

Pick whichever is easiest for you — all are free for a static site like this.

### Option A: Netlify (drag-and-drop, easiest)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the whole `portfolio` folder onto the page
3. Done — you get a live URL immediately. Add a custom domain later in
   Site settings → Domain management if you want one.

### Option B: Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import this folder (via GitHub repo, or drag-and-drop in the dashboard)
3. Framework preset: "Other" — no build command needed
4. Deploy

### Option C: GitHub Pages (free, tied to a GitHub repo)
1. Create a new GitHub repository
2. Push these files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/John-WesleyS/YOUR-REPO-NAME.git
   git push -u origin main
   ```
3. In the repo: Settings → Pages → Source: "Deploy from a branch" → `main` → `/ (root)`
4. Your site will be live at `https://John-WesleyS.github.io/YOUR-REPO-NAME/`

## After deploying — sanity checklist

Run through this once on the live URL (not just locally) so nothing looks
broken in front of a recruiter:

- [ ] Open the site in an incognito/private window — confirms it works
      without any cached state from your own browser
- [ ] Click every nav link and confirm it scrolls to the right section
- [ ] Toggle dark/light theme, refresh the page — your choice should persist
- [ ] Resize the browser down to phone width (or open on your actual phone)
      and check the hamburger menu opens and closes
- [ ] Click "Download Resume" — confirm the PDF actually downloads
- [ ] Click through to LeetCode, GeeksforGeeks, GitHub, and LinkedIn links —
      confirm each opens the correct profile in a new tab
- [ ] Submit the contact form with a real name/email/message — confirm your
      email client opens with the message pre-filled
- [ ] Click the project filter buttons (All / Microservices / MERN / Clones)
      and confirm the right cards show/hide
- [ ] Scroll to the GitHub section and confirm the contribution graph and
      stats images load (they need a live internet connection to
      ghchart.rshah.org and github-readme-stats.vercel.app — if your
      deployment host blocks outbound image requests from the page, which
      is rare, you'd see a small fallback message instead of a broken image)

## Browser support

Built with plain CSS and vanilla JS using only widely-supported features.
Tested patterns include graceful fallbacks for: clipboard API, IntersectionObserver,
and localStorage — so older browsers degrade smoothly (e.g. animations
just won't run, but no errors and no broken layout) rather than breaking.

## Making future edits

Everything is in three flat files, so changes are direct:
- **Text/content** → edit `index.html`
- **Colors, spacing, fonts** → edit the `:root` variables at the top of `styles.css`
- **Behavior/animations** → edit `script.js`

No `npm install`, no build command, no compiling — save the file, refresh
the browser, see the change.
