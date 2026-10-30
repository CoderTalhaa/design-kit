# Pages

One folder per page. Claude creates and updates everything here; this file describes the format so the lab can read it.

```
pages/
├── index.json              the list of pages, in the order the lab shows them
└── <page>/
    ├── lab.json            the page's sections and their options
    ├── sections/<section>/ A-<name>.html and B-<name>.html, one file per option
    └── <page>.html         the assembled page, once every section is picked
```

## index.json

```json
{
  "pages": [
    { "id": "about", "name": "About" }
  ]
}
```

`id` is the folder name: lowercase, with hyphens instead of spaces.

## <page>/lab.json

```json
{
  "page": "about.html",
  "sections": [
    {
      "id": "hero",
      "name": "Hero",
      "pick": "B",
      "options": [
        { "id": "A", "file": "sections/hero/A-split.html", "note": "Headline left, photo right" },
        { "id": "B", "file": "sections/hero/B-stack.html", "note": "Headline over a full-width photo" }
      ]
    },
    { "id": "team", "name": "Team", "options": [] }
  ]
}
```

- **`sections`** are listed in page order. A section with no options yet shows as "(todo)" in the lab.
- **`note`** is one short line on what makes that option different. It shows in the lab's bar.
- **`pick`** is added once she chooses. The lab opens on the picked option and marks it "✓ Picked".
- **`page`** is added once the assembled page exists. The lab then shows a "Full page" button.
- File paths are relative to the page folder.
