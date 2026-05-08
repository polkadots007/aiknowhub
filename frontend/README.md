# React + TypeScript + Vite

pnpm create vite . --template react-ts
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
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
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

Don’t try all 15.

👉 Strong combo for your project:

TanStack Query
Custom hooks
Debounced search
RAG (AI feature)
Optimistic updates
Clean component architecture

👉 That’s already 🔥

Add Zustand store:
notes
activeNote
addNote
updateNote
Connect:
Header → addNote
Editor → read + update
Add localStorage sync:
load on start
save on change

May 6

🧭 Suggested order (do this)
Search (clean + simple)
Title editing (double click)
AI (single feature: summarize)
UX polish (focus, empty states)

Start simple:

search by title
maybe content
🧩 Logic
searchTerm → filter(notes) → render list
💡 Important decisions
case insensitive search
debounce input (optional but nice)

Flow
button in header/editor → "AI"
send activeNote.content
show result (below editor or modal)

Summarize
Improve
Explain
Generate title

🔥 Inline title editing (you’re close already)
double click → edit
blur → save

👉 looks very professional

🔥 Empty states
no notes
no active note

👉 improves UX instantly

🔥 Auto-focus
new note → focus editor
👉 tiny detail, big feel
