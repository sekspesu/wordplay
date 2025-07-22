# Estonian Word Learner

This is a tiny, mobile-friendly web app for learning new (often foreign-origin) Estonian words.

## Running Locally

1. Clone or download this repository.
2. Because modern browsers block `fetch()` from accessing local files directly, **serve** the project via a small http server. Two quick options:

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node (if installed)
   npx serve .
   ```
3. Open your browser at `http://localhost:8000` (or the port you chose).
4. Press **Mängi** and start learning!

## Project Files

- `index.html` – main page and UI skeleton
- `styles.css` – responsive styling
- `script.js` – game logic (loading words, scoring, navigation)
- `words.json` – list of words & definitions (easy to extend!)

## Adding More Words

Just append new objects to `words.json` using the same structure:

```json
{
  "word": "demokratiseerima",
  "definition": "muutma demokraatlikumaks või laiemale rahvahulgale kättesaadavaks"
}
```

Happy learning! 🇪🇪 