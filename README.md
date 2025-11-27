**QA Admin Panel**

Welcome to the admin panel prototype — a clean React + TypeScript + Vite starter tailored for QA/autotest dashboards. This README explains the project purpose, structure, technology stack, how to run and deploy, and a few conventions to keep the codebase consistent.

**Why this repo**: it’s a lightweight admin UI used to author, run and view autotests results. The UI focuses on clarity and reusability: components, slices, and pages are organized so new features can be added quickly.

**Project Status:** Prototype / Internal tool

**Live demo (after deploy):** `https://buddazbs.github.io/admin-panel-test`

**Quick Links**
- **Source:** `https://github.com/buddazbs/admin-panel-test`
- **Main branch:** `main`

**Tech Stack**
- **Language:** `TypeScript`
- **Framework:** `React 19`
- **Bundler / Dev server:** `Vite`
- **UI library:** `Ant Design (antd)`
- **State management:** `@reduxjs/toolkit` + `react-redux`
- **Routing:** `react-router-dom`
- **HTTP:** `axios`
- **Deploy:** `gh-pages` (optional CI using GitHub Actions)

**Project Structure (key folders & files)**
- `src/` : application source
  - `main.tsx` : app entry
  - `app/` : core app files
    - `App.tsx` : app root component
    - `AppLayout.tsx` : main layout (header/sidebar)
    - `store.ts` : Redux store setup
    - `slices/` : RTK slices (`authSlice.ts`, `autotestsSlice.ts`, `themeSlice.ts`)
    - `providers/` : app-level providers (router config)
  - `pages/` : route pages (`dashboard`, `autotests`, `test-results`, `auth`, `account`, etc.)
  - `widgets/` : reusable UI widgets (e.g., `menu/Header.tsx`, `menu/SidebarMenu.tsx`)
  - `shared/` : small shared helpers, hooks and styles
  - `entities/` : domain models and entity-specific logic
- `public/` : static assets served as-is
- `index.html` : Vite entry HTML (`<base>` set automatically by config)
- `vite.config.ts` : Vite config (`base` set to `/admin-panel-test/` for GH Pages)
- `package.json` : scripts and dependencies

**Important files**
- `vite.config.ts` — uses `base: '/admin-panel-test/'` so the app works under the GitHub Pages path.
- `package.json` — contains scripts used for development, build and deployment (`predeploy` and `deploy`).

**Scripts** (run from project root)
- `npm install` — install dependencies
- `npm run dev` — run dev server (Vite) at `http://localhost:5173` by default
- `npm run build` — build the production bundle into `dist/`
- `npm run preview` — locally preview the production build
- `npm run deploy` — runs `predeploy` then publishes `dist/` to the `gh-pages` branch using `gh-pages`

Example flow for local development:

```bash
npm install
npm run dev
# open http://localhost:5173
```

Build & deploy to GitHub Pages:

```bash
npm install
npm run build
npm run deploy
```

After `npm run deploy` the site will be published to `https://buddazbs.github.io/admin-panel-test`.

**Deploy to InfinityFree** (or other free PHP hosting)

If you want to host on a free PHP hoster like InfinityFree instead:

1. Build with `base: '/'`:
   ```bash
   DEPLOY_TARGET=infinity-free npm run build
   ```
   
2. Upload all files from `dist/` to the hoster's `public_html/` folder via FTP/File Manager.

3. Ensure `.htaccess` is uploaded (it's in `public/.htaccess` and auto-copied to `dist/`).

See **[DEPLOY_INFINITYFREE.md](./DEPLOY_INFINITYFREE.md)** for detailed instructions.

**Developer notes & conventions**
- **TypeScript-first**: Please add proper types in `src/entities` and `src/pages`. Avoid `any` unless temporary.
- **Slices for state:** Use RTK `createSlice` and `createAsyncThunk` for side effects. Keep selectors colocated with slices if small.
- **Components:** Keep components small and presentation-focused. Prefer props to internal store reads for reusability.
- **Styles:** Global styles in `src/shared/styles`. Local component styles may live alongside components.
- **Assets:** Put static files in `public/` and reference them with relative paths; Vite rewrites during build.
- **Routing:** `react-router-dom` v7 routes are defined in `src/app/providers/router.tsx`.

**Testing**
This repo does not include automated tests yet. For unit / component tests we recommend `vitest` + `@testing-library/react`.

**Optional: CI deploy via GitHub Actions**
If you want automatic deploys on `main` push, I can add a workflow that builds and pushes `dist/` to `gh-pages`. It will:
- run `npm ci`, `npm run build`, and deploy using `peaceiris/actions-gh-pages` (or use `gh-pages` cli).

**FAQ / Troubleshooting**
- Q: Assets 404 after deploy? A: Confirm `vite.config.ts` has `base: '/admin-panel-test/'` and that `index.html` has `<base href="/admin-panel-test/">`. Both are set in this repo.
- Q: `gh-pages` not found when running `npm run deploy`? A: Run `npm install` first; `gh-pages` is already in `package.json`. If you prefer it in `devDependencies`, tell me and I’ll move it.

**Contributing**
- Fork the repo, create a branch, open a PR. Keep changes focused and add a short description of the problem you solved.

**Contact**
- Maintainer: `buddazbs` (GitHub)

---

If you want, I can also:
- add a GitHub Actions workflow for automatic deploys on push to `main`;
- move `gh-pages` to `devDependencies`;
- run a local `npm run build` to verify the `dist/` output (I can run it here if you allow me to execute commands).

Would you like me to add CI deploy or move `gh-pages` to `devDependencies` now?
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {

  ## Deploy to GitHub Pages

  This project is configured to be published to GitHub Pages under the repository `buddazbs/admin-panel-test`.

  - Build the site:

  ```
  npm run build
  ```

  - Deploy to GitHub Pages (uses `gh-pages` and the `dist` folder):

  ```
  npm run deploy
  ```

  Notes:

  - `vite.config.ts` has `base` set to `/admin-panel-test/` so assets resolve correctly on GitHub Pages.
  - `gh-pages` is already included in `package.json`; the deploy script publishes the `dist` folder to the `gh-pages` branch.

        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
