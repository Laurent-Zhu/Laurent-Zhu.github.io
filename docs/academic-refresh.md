# Academic Homepage Refresh

Updated page: `index-moonshot.html` (2026-09-23).

Reference: https://github.com/RayeRen/acad-homepage.github.io and its demo.
The layout uses the template's academic reading hierarchy rather than its
source code or assets: compact navigation, a portrait/contact column, and a
continuous content column. Mobile stacks the profile above the content.

The reading order is About, News, Publications, Experience, Portfolio, and
Honors. Recent News items are visible; earlier updates are available in a
native disclosure. The Skills list and decorative background were omitted
from the initial academic revision.

The BrepLLM entry includes its verified ECCV 2026 author list, publisher page,
preprint, project page, and code. Springer lists it as first published online on
2026-09-15. The CadQuery work appears in Portfolio rather than Publications.
The current Chinese and English CVs are the content reference.

The final design restores the dark palette and animated pixel nebula inspired by
https://careers.kimi.com/land-on while retaining the compact academic hierarchy.
The background's pause control, stored preference, reduced-motion behavior and
mobile frame cap are unchanged from the previous Moonshot version.

The profile column now takes its portrait-first, centered contact hierarchy from
https://chang-xinhai.github.io/ without changing the two-column page layout. It
keeps both email addresses, Google Scholar, GitHub, and both CV languages. The
single ECCV publication uses the same reference's image-and-details pattern,
with a local optimized preview of the official BrepLLM poster and a link to the
full local poster (source:
https://eccv.ecva.net/media/PosterPDFs/ECCV%202026/5778.png).
Its image now carries a small venue badge, followed by the title, authors,
one-sentence summary, venue, and compact resource links in the adjacent column.
The poster keeps its full aspect ratio rather than being cropped as a teaser.
No citation counter is shown because this site does not have
a reliable, automatically maintained source for it.

The profile column also includes the owner's Statable 30-day 3D visitor globe.
The supplied public widget script tracks page visits, uses a dark theme and
slow rotation, and disables rotation when reduced motion is requested. The
globe's data remains hosted by Statable; this site does not copy another
homepage's visitor data or credentials.
On desktop the sidebar stays sticky while the main column scrolls. Short
viewports can scroll the sidebar's own content to reach the globe; mobile
layouts keep the sidebar in the normal document flow.

Desktop navigation highlights the last section whose heading has crossed the
reading line just below the sticky header. At the document bottom, it selects
the final Honors section even when the footer prevents that heading from
reaching the top of the viewport.
The active underline slides and resizes between links while their text color
eases between states. Reduced-motion preferences disable these transitions.

Experience now uses the fixed-square logo, institution/date/role/detail, and
individual card layout of https://chang-xinhai.github.io/, recolored for the
dark Moonshot theme. Every logo frame is 100 x 100 pixels on desktop and
88 x 88 pixels on small screens. Education is the first, ongoing NPU card,
including the degree, GPA, and class rank; there is no separate Education
section or navigation item. Its seal comes from the NPU archives at
https://dag.nwpu.edu.cn/info/1308/4519.htm. The Singapore exchange remains one entry
with NTU, NUS, and SMU logos; the 2024 exchange pairs NTU with NPU. The
internship and software-association entries use the owner's supplied icons.
School marks are stored locally at `assets/img/experience/`: NTU from
https://www.ntu.edu.sg/ResourcePackages/NTU/assets/images/NTU_Logo.png,
SMU from https://engage.smu.edu.sg/themes/smubase_5g/assets/site-headers/logo-smu-d.svg,
NPU from https://www.nwpu.edu.cn/images/logo2.png, and the complete NUS
logo from https://en.wikipedia.org/wiki/File:NationalUniversityofSingapore.svg.
The NUS crest and namestyle are kept together in line with its identity
guidelines (https://nus.edu.sg/identity/guidelines/logo-guideline).

Portfolio combines the former Ongoing Research and Selected Projects sections.
Its image-led, horizontally scrollable cards and arrow/progress controls are
adapted from the structure of https://chenxxxxxx06.github.io/ while retaining
this page's dark green palette and compact academic copy. The owner's original
CadQueryLLM workflow diagram is retained in `assets/img/portfolio/cadqueryllm.png`;
the card displays a newly generated CAD-themed poster instead, with an HTML
status badge at the lower left that switches language with the page. The UAV
and AgriGuard card art is also generated project-poster imagery, not a screenshot
of either working system. Their
original demo videos and real interface frames remain available through the
expandable Watch demo controls. The original `#projects` anchor remains intact.

This refresh uses `assets/css/academic.css`, `assets/js/academic-content.js`,
and `assets/js/moonshot-background.js`.
The original homepage, CVs, videos, and former dark-theme files are retained.
Fourteen DOM checks cover assets, reading order, publication metadata, translation,
chronological News and Experience, CVs, demos, and mobile navigation. Sixteen Canvas checks
cover desktop/mobile pixels, controls, lifecycle and fallback states. Browser visual QA was
unavailable because the computer-use browser connection failed and local file
preview was blocked by browser URL policy.
