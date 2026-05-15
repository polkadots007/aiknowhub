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

⚡ Then user chooses

Buttons like:

Replace Note
Append
Copy
Retry

That becomes powerful UX.
After AI response panel:

👉 “Apply to Note”

That creates nice interaction loop.

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

Split Editor into Editor and AIResponsePanel.tsx
fetch logic in services folder - /hooks/useAI.ts
Your Zustand store already holds:

notes
AI
theme
selection
search

Still manageable.

But eventually split:

notes store
UI store
AI store

Priority 3 — Keyboard shortcuts

This would make app feel MUCH more premium.

Examples:

Ctrl+N → new note
Ctrl+S → manual sync
Ctrl+B → markdown bold
Esc → close AI panel

Very portfolio-worthy.

🏅 Priority 4 — Better note metadata

Add:

createdAt
updatedAt
word count
reading time

This makes UI feel mature instantly.

🏅 Priority 5 — Note folders/tags

This would level project up significantly.

Even basic:

tags: ["react", "ai"]

adds a lot.

🏅 Priority 6 — AI chat mode

THIS would become killer portfolio material.

Instead of:

single-shot actions

add:

chat with note

Example:

"Explain this paragraph"
"Turn into interview questions"
"Convert to flashcards"

Now app becomes:

AI knowledge workspace

not just notes app.

🏅 Priority 7 — Backend persistence

Right now likely local-first.

Next level:

Supabase
Firebase
PostgreSQL
auth

Then this becomes deployable SaaS-style app.

🎯 What would impress recruiters most next?

Probably ONE of these:

AI chat with notes
tags/folders/search
collaborative editing
cloud sync
command palette
markdown live preview split pane
