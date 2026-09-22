# Moonshot-inspired personal homepage

Independent entry: `index-moonshot.html`. The existing homepage and assets remain intact.

## Reference

Visual reference: https://careers.kimi.com/ (inspected 2026-09-22).
The browser connector was unavailable. The public HTML, stylesheets and scene modules
confirm a black/white palette, pixel type, dithered imagery, generous spacing,
text reveals, fixed navigation and responsive menus. This is a visual interpretation,
not a copy of the site's branding, assets or implementation.

Layout reference: https://chang-xinhai.github.io/ and the original `index.html`.
The reference page's public HTML and stylesheet use a desktop profile sidebar and
a continuous academic content column, stacked on smaller screens.

## Direction

A research portfolio for prospective supervisors, collaborators and recruiters.
Use the original academic two-column layout: a sticky profile sidebar with portrait,
name, affiliation, contact links and both CVs, plus a continuous reading column.
Start directly with the introduction and News. Keep the original section order and
show all dated News entries. Use compact headings, paragraph spacing, thin rules,
a black/white palette, a pixel wordmark and restrained green link/status accents.
On mobile the profile sits above the content. Keep native scrolling and subtle
navigation feedback with support for reduced-motion preferences.

Preserve both languages, research, publications, all News entries, education,
internship, both project videos, awards, skills, contact links and both current CVs.
Use the current homepage as the content source, without inventing new achievements.

## Implementation

Static HTML, an independent stylesheet, a content dictionary and a small script.
No build step or server is needed to use the delivered page. Fonts and icons are
self-hosted. Existing photos, videos and CVs are reused by relative path.

## Verification

Check old homepage integrity, local asset and anchor resolution, translation
coverage, script syntax, responsive rules, menu state, language persistence,
News visibility and reduced-motion behavior. Attempt browser visual verification
and report any connector limitation rather than claiming an unperformed check.

Verification result: script syntax and CSS parsing pass. Ten DOM checks cover
local resources, anchors, translation coverage and persistence, mobile-menu state
and focus, News chronology/visibility, video coordination, current-section state,
reduced-motion/blocked-storage fallbacks and the original academic section order.
The existing video posters remain in use.
The browser connector remained unavailable, so viewport screenshots and actual
in-browser video playback could not be verified. The original `index.html`, CVs,
video files and content dictionary have no modifications.

## Land-on Background

Reference: https://careers.kimi.com/land-on (inspected 2026-09-22).
Its public LandOnBackground module renders a low-resolution, grayscale, ordered-
dithered nebula and slowly twinkling stars using Canvas 2D. Recreate that visual
technique independently in `moonshot-background.js`, without copying its code,
assets, moon scene controller, navigation or application dependencies.

Place a pointer-transparent, fixed canvas behind the unchanged academic layout.
Keep the pixels dark enough for muted dates and captions to stay readable. Cache
the noise field on resize, cap the backing canvas at 360 by 300, and limit drawing
to 20 fps on desktop / 12 fps on mobile. A bilingual header icon pauses motion and
remembers the choice. Reduced motion keeps a static frame; hidden tabs and page
navigation stop animation. If Canvas is unavailable, keep the plain background.

Verification: the previous ten DOM checks still pass. Sixteen additional checks
exercise actual Canvas pixel output at 320, 390, 768, 1024, 1440 and 2560 viewport
widths, changing frames, frame-rate caps, pause persistence, translated controls,
visibility/page lifecycle, live reduced-motion changes, blocked storage and no-
Canvas fallback. Desktop and mobile raster previews were visually inspected.
The brightest pixel is capped at #303030 for at least 4.5:1 contrast with muted
text. The browser connector is still unavailable, so these are Canvas render
checks, not full browser screenshots or an in-browser layout inspection.
