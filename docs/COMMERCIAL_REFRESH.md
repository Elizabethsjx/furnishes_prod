# Local landing refresh

The local demo branch now uses a calm furniture sourcing and spatial planning homepage for residential and commercial briefs. The prior landing remains available at `/?experience=original` for comparison; it is not shown in navigation. No account API, database schema, environment variable or deployment configuration is changed.

## Case provenance

BTO family case supplied by the owner: shortlist and spatial planning proposal delivered, furniture not yet received. The supplied four-page furniture PDF is not published because it contains a customer name and unconfirmed prices. Only selected product reference images are extracted. The supplied HTML contains embedded source-plan and generated reference images; these are used with explicit planning labels. The standalone planner at `/examples/family-apartment.html` is a prepared illustrative model, not a generic floor-plan conversion service or exact SKU placement. The original input file is unchanged.

No savings, verified supplier count, delivered furniture, quality certification or customer testimonial is claimed. Case is anonymous. Confirm external publication rights before publishing beyond the local demo.

## Scope

Homepage, public BTO case page and supplied standalone planner. The user authorized a new visual direction; frozen historical reference files remain unchanged. New pages use scoped CSS and preserve existing account routes. A fresh context and a returning tab with legacy freeze state must both show the homepage without a loading overlay.

## Second iteration

Restored the orange and warm cream brand palette and Archivo type treatment at the owner’s request. The new four-step client explainer supports autoplay, pause, manual selection and reduced-motion preferences. It illustrates a prepared case, not live conversion or exact SKU insertion. Desk S$156 and dining set S$683 are historical shortlist references; landed cost components remain unconfirmed. Bed quote is deliberately left unconfirmed. Service cards now name the actual steps and deliverables.

## Warm home direction

Inspired by the supplied CSD reference’s text-and-3D hero composition, with an original procedurally modelled living room rather than copied site assets. Three.js uses the existing landing-specific package. Soft lighting, rounded type and apricot palette replace the technical treatment. Sofa palettes, motion pause, reduced-motion handling, offscreen render throttling, GPU cleanup and a no-WebGL fallback are included. The room is illustrative. Existing pricing explainer and concrete service steps remain below the hero.

## Commercial refinement

Replaced the playful rounded typography with Archivo, restrained heading weights, square-edged controls and editorial grids while preserving warm orange, cream and brown. The living-room Three.js preview remains. Information architecture draws on the service-to-selection flow of https://havenly.com/ and professional planning/selection presentation at https://www.houzz.com/pro; no assets or layouts were copied.

Added a sample selection studio with category filters, add/remove controls, specification comparison, known-reference-price subtotal and a downloadable text shortlist. It uses only the three supplied case references and is explicitly not a live catalogue or order. Unconfirmed bed prices are excluded from totals; quantities and landed cost are not inferred. Added project scope FAQs and clearer professional audience sections.

Validation: 18 focused Playwright checks passed, covering homepage/case/mobile, selection and download, animation controls/fallback, planner and existing public/auth/health routes. Desktop/mobile visual review confirmed product images load. No production deployment performed.
