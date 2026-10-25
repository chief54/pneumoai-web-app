# PneumoAI — Web App

React + Vite frontend for PneumoAI: an AI-assisted chest X-ray screening tool.
Uploads a chest X-ray to the FastAPI/CNN backend and displays the prediction,
confidence score, and GradCAM heatmap, alongside patient and scan-history
tracking.

## Development

```bash
npm install
npm run dev
```

Set `VITE_API_URL` in a `.env` file to point at the backend (see `.env.example`).

## Disclaimer

Research and educational project — not a certified medical device.
