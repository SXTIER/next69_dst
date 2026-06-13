---
target: section courses
total_score: 24
p0_count: 0
p1_count: 2
timestamp: 2026-06-01T11-42-40Z
slug: app-components-course-explorer-tsx
---
# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Filter is collapsed by default even though search/filter is the main control for a long list. |
| 2 | Match System / Real World | 3 | Curriculum language is mostly clear, but planned courses and optional courses look too similar. |
| 3 | User Control and Freedom | 3 | Accordions, reset, and modal close exist, but actions are distributed awkwardly. |
| 4 | Consistency and Standards | 2 | Whole course cards are clickable, but the visible action looks like a small footer link. |
| 5 | Error Prevention | 3 | Reset and empty states reduce dead ends. |
| 6 | Recognition Rather Than Recall | 2 | Students must infer whether to open filter, planned courses, or optional courses first. |
| 7 | Flexibility and Efficiency | 2 | Search is not immediately available. Repeated cards force scanning instead of narrowing. |
| 8 | Aesthetic and Minimalist Design | 2 | Too many bordered panels and same-weight cards create visual noise. |
| 9 | Error Recovery | 3 | Empty state recovery exists. |
| 10 | Help and Documentation | 2 | PDF links and labels exist, but the course section does not teach what to do next. |
| **Total** | | **24/40** | **Usable but cognitively heavy** |

# Anti-Patterns Verdict

**LLM assessment**: The section does not look broken, but it has generic product-card-grid fatigue. The main issue is not color or typography. It is that everything is treated like a bordered object with similar weight: filter card, accordion card, course cards, credit boxes, optional course cards. That makes the interface feel more complex than the curriculum content actually is.

**Deterministic scan**: `detect.mjs --json app/components/course-explorer.tsx` returned `[]`. The detector did not find hard anti-patterns in the source. This is expected because the problem is interaction hierarchy, not a banned visual pattern.

**Visual overlays**: Browser overlay was not run. No in-app browser mutation tool was exposed in this session, and the user already provided the relevant screenshot. The fallback signal is screenshot review plus source review.

# Overall Impression

The course section is functionally rich, but it asks the student to decode the interface before decoding the curriculum. For incoming DST students, that is backwards. The strongest opportunity is to make the course list feel like a guided study plan first, with filtering and optional requirements as secondary tools.

# What's Working

1. The data model is useful: planned courses, requirement slots, and elective options are separated in code.
2. Course cards contain the right raw facts: code, Thai title, English title, credits, metadata, and modal access.
3. Accordions and reset controls provide recovery paths, which supports accessibility and user control.

# Priority Issues

## [P1] The filter is hidden even though the list is long

**Why it matters**: A student sees many cards first, then must decide whether opening "ค้นหาและจัดหมวดหมู่" is worth it. For a 13 to 33 item list, search should feel immediately available.

**Fix**: Keep the full advanced filter collapsed, but expose a compact always-visible search row above the course cards: search input, term segmented control, and "ตัวกรองเพิ่มเติม" disclosure.

**Suggested command**: `$impeccable layout section courses`

## [P1] Planned courses and optional courses have almost the same visual treatment

**Why it matters**: The user can mistake optional/elective catalogs for required year workload. This is a high-impact curriculum comprehension problem.

**Fix**: Make "แผนการเรียนปีนี้" the primary surface and make "ตัวเลือก/เงื่อนไขเพิ่มเติม" a quieter requirement summary first. Only reveal optional course cards after the student chooses a requirement group.

**Suggested command**: `$impeccable clarify section courses`

## [P2] Course cards look like dense cards, not fast scan rows

**Why it matters**: Repeated bordered cards create a wall. Students need to compare codes, credits, term, and prerequisites quickly.

**Fix**: Convert planned courses to a denser responsive list/table hybrid on desktop: code + title + credits + term + action. Keep card layout only on mobile.

**Suggested command**: `$impeccable distill section courses`

## [P2] Card action affordance is contradictory

**Why it matters**: The whole card is clickable, but the visible action is a small footer text. Users may click only the footer or miss that the whole card opens the modal.

**Fix**: Add a clear top-right "รายละเอียด" button or make the card row style include a chevron/action column. Remove the footer link-like line.

**Suggested command**: `$impeccable polish section courses`

## [P3] The section repeats too many bordered containers

**Why it matters**: Borders are doing too much structural work. The page feels busy even with a restrained palette.

**Fix**: Remove one container layer: use an unframed section header, then list rows/cards directly inside. Keep borders for individual interactive items only.

**Suggested command**: `$impeccable quieter section courses`

# Persona Red Flags

**New DST Student**: They want to know "ปี 1 ต้องเรียนอะไรบ้าง" quickly. The interface first shows summary cards, a collapsed filter, an accordion header, then many similar course cards. They get the answer, but only after scanning a lot of repeated chrome.

**Student Comparing Options**: They need to separate required workload from optional conditions. Because optional courses use the same CourseCard component and sit immediately below the plan, they may overestimate workload.

**Keyboard User**: The controls are semantic, but the interaction count is high. To search, they must focus the collapsed filter, open it, tab into the input, then navigate back to results. Search should be closer to the results.

# Minor Observations

- The "หน่วยกิตรายวิชาที่แสดง" badge is useful but visually low value compared with the space it takes.
- Credit boxes inside every card are consistent, but they visually compete with the title.
- The summary strip above courses is useful but tall. It pushes the actual course list down.
- If the dark circular "N" marks on the far left are part of the app, they are a P1 visual artifact. If they are a browser/plugin overlay, ignore them.

# Questions to Consider

1. What if "แผนการเรียนปีนี้" became a scan-first course table on desktop instead of a card grid?
2. Should optional/elective courses be visible immediately, or should they appear only after choosing a requirement group?
3. Is search a primary action? If yes, it should not live inside a closed accordion.
