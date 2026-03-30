# Master Prompt: Obsidian Horizon Premium Website (Vite + GitHub Pages)

### 1. Project Architecture & Multi-Page Support
- **Vite Multi-page**: Always configure `vite.config.js` to handle multiple entry points. Total HTML files: `index.html`, `about.html`, `donate.html`, `experience.html`, `gallery.html`, `contact.html`, and `book.html`.
- **Base Path**: The `base` must be set to `'./'` (relative) to handle GitHub Pages subdirectories correctly.
- **Output Directory**: Use `'docs'` as the `outDir`. This allows GitHub Pages to serve the site from the `/docs` folder on the `main` branch.
- **Empty Output**: Set `emptyOutDir: true` for clean builds.

### 2. Design System: "Obsidian Horizon"
- **Theme**: Premium Dark (Surface: `#131313`).
- **Primary Accent**: Orange (`#F27131`).
- **Typography**: Manrope (Headings), Inter (Body).
- **Core Elements**: 
  - Glassmorphism (blur, transparent border).
  - Background Glow Orbs for depth.
  - Intersection Observer Classes: `.fade-up` (with `.delay-1` through `.delay-4`).

### 3. Mobile Optimization (CRITICAL)
- **Viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />`.
- **Navigation**: 
  - Hamburger Menu button with `.menu-btn` (top-right).
  - Full-screen `.mobile-overlay` with glass background.
  - Javascript logic in `main.js` to handle toggle and body scroll lock.
- **Scaling**: Fluid `clamp()` typography, but strictly lock sizes for small screens (Media queries for Max 768px).

### 4. Link & Asset Convention
- **NEVER use absolute paths** starting with `/`.
- **ALWAYS use relative paths** starting with `./` (e.g., `./about.html`, `./main.js`, `./logo.png`).

### 5. Deployment Workflow
1. Run Build: `.\node_modules\.bin\vite.cmd build` (bypasses script policies).
2. Git Stage: `git add .`
3. Git Commit: `git commit -m "Update message"`
4. Git Push: `git push origin main`
5. GitHub Settings: Repository -> Settings -> Pages -> Deployment -> **Source: Branch -> main -> /docs**.

---

#### Reference (vite.config.js):
```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        book: resolve(__dirname, 'book.html'),
        contact: resolve(__dirname, 'contact.html'),
        donate: resolve(__dirname, 'donate.html'),
        experience: resolve(__dirname, 'experience.html'),
        gallery: resolve(__dirname, 'gallery.html'),
      },
    },
  },
});
```
