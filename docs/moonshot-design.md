# Moonshot-inspired personal homepage

Independent entry: `index-moonshot.html`. The existing homepage and assets remain intact.

## Reference

Reference: https://careers.kimi.com/ (inspected 2026-09-22).
The browser connector was unavailable. The public HTML, stylesheets and scene modules
confirm a black/white palette, pixel type, dithered imagery, generous spacing,
text reveals, fixed navigation and responsive menus. This is a visual interpretation,
not a copy of the site's branding, assets or implementation.

## Direction

A research portfolio for prospective supervisors, collaborators and recruiters.
Use a monochrome photographic opening, large name, small pixel labels, white rules
and a restrained green accent for the paper status. Keep the content readable with
native scrolling and conventional section navigation. Motion introduces content and
provides hover feedback; reduced-motion preferences disable it.

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
News expansion and reduced-motion behavior. Attempt browser visual verification
and report any connector limitation rather than claiming an unperformed check.

Verification result: script syntax and CSS parsing pass. Nine DOM checks cover
local resources, anchors, translation coverage and persistence, mobile-menu state
and focus, News chronology/expansion, video coordination, current-section state,
and reduced-motion/blocked-storage fallbacks. Video posters were visually inspected.
The browser connector remained unavailable, so viewport screenshots and actual
in-browser video playback could not be verified. The existing tracked files have
no modifications.
