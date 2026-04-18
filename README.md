# Lisa Schank Portfolio

Astro site with React support, prepared for GitHub Pages deployment.

## Commands

```sh
npm run dev
```

Starts the local dev server at `localhost:4321`.

```sh
npm run build
```

Builds the production site to `./dist/`.

```sh
npm run preview
```

Previews the production build locally.

## GitHub Pages

Deployment is handled by `.github/workflows/deploy.yml`.

In GitHub, configure:

1. Open the repository settings.
2. Go to Pages.
3. Set Source to GitHub Actions.

The Astro config derives `site` and `base` from `GITHUB_REPOSITORY` during GitHub Actions builds. For a custom domain, set `SITE` and `BASE_PATH` in the workflow or repository environment variables.

## Content Management

Content is stored in Markdown files and can be edited through Decap CMS at `/admin/` once authentication is connected.

Editable content lives in:

- `src/content/pages/home.md`
- `src/content/pages/about.md`
- `src/content/projects/*.md`

CMS configuration lives in `public/admin/config.yml`.

After the GitHub repository exists, replace this placeholder:

```yml
repo: owner/repo
```

with the actual repository path, for example:

```yml
repo: paul/lisa-schank-portfolio
```

The site is ready for Decap CMS, but the production login still needs a GitHub OAuth flow. For GitHub Pages, use an external OAuth proxy such as a small Cloudflare Worker or another free OAuth proxy service. Local editing can use Decap's local backend.
