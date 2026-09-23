# Academic Homepage Refresh

Updated page: `index-moonshot.html` (2026-09-23).

Reference: https://github.com/RayeRen/acad-homepage.github.io and its demo.
The new layout uses the template's academic reading hierarchy rather than its
source code or assets: compact navigation, a portrait/contact column, and a
continuous content column on white. Mobile stacks the profile above the content.

The reading order is About, News, Publications, Ongoing Research, Education,
Experience, Selected Projects, and Honors. Recent News items are visible;
earlier updates are available in a native disclosure. Each project keeps its
embedded video in an expandable demo. The Skills list and decorative background
are no longer loaded because they add little to the academic reading path.

The BrepLLM entry includes its verified ECCV 2026 author list, publisher page,
preprint, project page, and code. Springer lists it as first published online on
2026-09-15. The CadQuery work appears under Ongoing Research rather than
Publications. The current Chinese and English CVs are the content reference.

This refresh uses `assets/css/academic.css` and `assets/js/academic-content.js`.
The original homepage, CVs, videos, and former dark-theme files are retained.
Eight DOM checks cover assets, reading order, publication metadata, translation,
chronological News, CVs and demos, and mobile navigation. Browser visual QA was
unavailable because the computer-use browser connection failed and local file
preview was blocked by browser URL policy.
