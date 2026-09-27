# OctoFit Tracker frontend

The React 19 presentation tier uses `react-router-dom` for navigation and calls the Express API at `/api`.

## Environment

For a GitHub Codespaces backend, create `octofit-tracker/frontend/.env.local` and define `VITE_CODESPACE_NAME` with the Codespace name:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then uses `https://your-codespace-name-8000.app.github.dev/api/[component]/`. If the variable is not set, it falls back to `http://localhost:8000/api/[component]/` for local development.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
