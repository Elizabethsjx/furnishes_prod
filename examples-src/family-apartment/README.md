# Family apartment 3D example (Yan Shiuan family)

Source for `public/examples/family-apartment.html`: the interactive 3D walkthrough built
from the client's 2D floor plan and their final furniture list.

## How the page is put together

The published page is one self-contained HTML file (no network requests):

1. HTML shell: header, side panels, dialogs, CSS, and the embedded reference images.
2. One `<script type="module">` holding the minified Three.js r185 bundle.
3. The application code, in the same script and right after the bundle. This is `app.js`.

`app.js` shares the bundle's module scope, so it uses the bundle's short names
(`vi` = Mesh, `ya` = MeshStandardMaterial, …). The header of `app.js` lists them.

## Editing

| Change | Where |
| --- | --- |
| Walls, windows, doors (plan coordinates in metres) | `app.js` → `Ad()` |
| Furniture models from the client's list | `app.js` → `F*()` functions (`Fbed`, `FkidsDesk`, `Fcupboard`, …) |
| Where furniture sits, both layouts | `app.js` → `qd()` (`M(obj, [x, z, rotY] as proposed, [x, z, rotY] space-saving)`) |
| Room floors, wall paint defaults, open-floor analysis | `app.js` → `Yd()` |
| Panel text, furniture price list, wall-colour swatches | the HTML shell in `public/examples/family-apartment.html` |

After editing `app.js`:

```bash
pnpm build:family-apartment   # splice app.js into the page
pnpm check:family-apartment   # fails if the page is out of date
```

The build keeps the HTML shell and the bundle untouched. It replaces everything from
the `// Family apartment 3D example` header to the end of the module script with `app.js`.
To edit the panels or text, change the HTML in the page directly.

## Notes

- Coordinates: x runs 0–14.875 m (west → east), z runs 0–9.35 m (north → south).
  Wall positions were measured from the 2D plan at about 14.2 mm per pixel.
- Before adding a new top-level name, check that it is not already used in the bundle
  (for example `Sr`, `St`, `Sc` and `Sm` are taken).
- `app.js` is excluded from ESLint and Prettier on purpose. The original application was
  only available as minified output, and its code style stays as extracted.
