# Academic Homepage Refresh

Updated page: `index-moonshot.html` (2026-09-23).

Reference: https://github.com/RayeRen/acad-homepage.github.io and its demo.
The layout uses the template's academic reading hierarchy rather than its
source code or assets: compact navigation, a portrait/contact column, and a
continuous content column. Mobile stacks the profile above the content.

The reading order is About, News, Publications, Ongoing Research, Education,
Experience, Selected Projects, and Honors. Recent News items are visible;
earlier updates are available in a native disclosure. Each project keeps its
embedded video in an expandable demo. The Skills list and decorative background
were omitted from the initial academic revision.

The BrepLLM entry includes its verified ECCV 2026 author list, publisher page,
preprint, project page, and code. Springer lists it as first published online on
2026-09-15. The CadQuery work appears under Ongoing Research rather than
Publications. The current Chinese and English CVs are the content reference.

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

Experience now uses the fixed-square logo, institution/date/role/detail, and
individual card layout of https://chang-xinhai.github.io/, recolored for the
dark Moonshot theme. Every logo frame is 100 x 100 pixels on desktop and
88 x 88 pixels on small screens. The Singapore exchange remains one entry
with NTU, NUS, and SMU logos; the 2024 exchange pairs NTU with NPU. The
internship and software-association entries use the owner's supplied icons.
School marks are stored locally at `assets/img/experience/`: NTU from
https://www.ntu.edu.sg/ResourcePackages/NTU/assets/images/NTU_Logo.png,
SMU from https://engage.smu.edu.sg/themes/smubase_5g/assets/site-headers/logo-smu-d.svg,
NPU from https://www.nwpu.edu.cn/images/logo2.png, and the complete NUS
logo from https://en.wikipedia.org/wiki/File:NationalUniversityofSingapore.svg.
The NUS crest and namestyle are kept together in line with its identity
guidelines (https://nus.edu.sg/identity/guidelines/logo-guideline).

This refresh uses `assets/css/academic.css`, `assets/js/academic-content.js`,
and `assets/js/moonshot-background.js`.
The original homepage, CVs, videos, and former dark-theme files are retained.
Eleven DOM checks cover assets, reading order, publication metadata, translation,
chronological News and Experience, CVs, demos, and mobile navigation. Sixteen Canvas checks
cover desktop/mobile pixels, controls, lifecycle and fallback states. Browser visual QA was
unavailable because the computer-use browser connection failed and local file
preview was blocked by browser URL policy.
