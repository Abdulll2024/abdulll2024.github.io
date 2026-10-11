# Saurav Kumar: personal website

A static website: plain HTML, CSS and JavaScript, with no build step and no
server. It is hosted free on GitHub Pages.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Portfolio: profile, experience, skills, projects, certifications |
| `work-with-me.html` | Work With Me: training, websites, part-time Salesforce work |
| `notes.html` | Notes (the blog list) |
| `notes/` | One page per note, created by the notes desk |
| `assets/layout.js` | Shared header and footer used when a note is published |
| `admin/` | Notes desk, the private page for writing notes |

## Put it online

1. On GitHub, create a new **public** repository named exactly
   `dev-saurav-kumar.github.io`. Leave it empty.
2. In this folder, run:

   ```
   git init -b main
   git add .
   git commit -m "First version of the site"
   git remote add origin https://github.com/dev-saurav-kumar/dev-saurav-kumar.github.io.git
   git push -u origin main
   ```

3. In the repository, open Settings, then Pages, and set the source to
   "Deploy from a branch", branch `main`, folder `/ (root)`.
4. After a minute or two the site is live at `https://dev-saurav-kumar.github.io/`.

The `.gitignore` file keeps the resume PDF out of the repository. Check
`git status` before the first commit and confirm the PDF is not listed.

## Write notes

1. On GitHub, open Settings, Developer settings, Personal access tokens,
   Fine-grained tokens, and generate a token with:
   - Repository access: only `dev-saurav-kumar.github.io`
   - Permissions: Contents, read and write
   - An expiry date
2. Open `https://dev-saurav-kumar.github.io/admin/`, paste the token and connect.
3. Write in Markdown, check the preview, and publish.

Keep the token private. Anyone who has it can change the website. If it leaks,
delete it on GitHub and create a new one.
