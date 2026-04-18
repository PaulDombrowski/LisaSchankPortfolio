// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

const [owner, repo] = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const site = process.env.SITE ?? (owner ? `https://${owner}.github.io` : undefined);
const base = process.env.BASE_PATH ?? (process.env.GITHUB_ACTIONS && repo ? `/${repo}` : undefined);

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [react()]
});
