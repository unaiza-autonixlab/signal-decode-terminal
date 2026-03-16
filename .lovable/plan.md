
Goal: fix only the two LIVE_OUTPUT bugs without altering visual design, sizing, layout, or content.

What is causing the bugs now
- The step label and screenshot each get the opacity transition separately, so React can swap their content at slightly different moments.
- The toggle sits outside the animated unit, so it does not fade with the label/screenshot and can feel visually detached.
- The component currently tracks one visible slide plus opacity, but the rendered pieces are not grouped under one shared fading wrapper.

Implementation plan
1. Rebuild the animated part as one shared transition group
- Wrap the play/pause toggle, step label, and screenshot in a single parent “content unit”.
- Apply one shared `opacity` style and one shared `transition: opacity 600ms ease-in-out` to that parent only.
- Keep arrows and dots outside this fading unit so only the requested three elements animate together.

2. Make slide content swap only between fade-out and fade-in
- Use a single `displayIndex` for the currently rendered slide content.
- On any transition:
  - set group opacity to 0
  - wait 600ms
  - swap `displayIndex` to target slide
  - update dots at the exact same moment the new slide starts fading in
  - set group opacity to 1
- This guarantees the previous screenshot is fully gone before the new heading/image/toggle appear.

3. Keep autoplay timing exact
- Initial mount: fade in first slide as one unit.
- Autoplay loop:
  - hold fully visible slide for 3000ms
  - fade whole group out for 600ms
  - swap to next slide
  - fade whole group in for 600ms
  - repeat from current slide
- No extra delay between fade-out completion and fade-in start.

4. Fix manual navigation behavior
- Arrow click immediately sets `playing` to false.
- Dots should update immediately on click for manual intent, while actual content waits until fade-out completes.
- If a transition is in progress, store only the latest requested target and run it next.
- Manual navigation should always use the same sequence: fade out current group → swap slide → fade in group.

5. Keep toggle correctly positioned and synced
- Leave its existing styling/classes unchanged.
- Move it into the same animated row/container as the step label and screenshot content unit so it is no longer visually static or independently timed.
- Ensure the toggle icon always reflects the current `playing` state, including after arrow clicks and resume.

Technical details
- Refactor state to something like:
  - `displayIndex`: currently rendered slide
  - `dotIndex`: currently highlighted dot
  - `playing`: UI state for toggle
  - `groupOpacity`: shared opacity for label + toggle + screenshot
- Keep refs for:
  - current rendered index
  - pending requested index
  - whether a transition is active
  - active timers for cleanup
- Replace separate label/image fade styles with one parent wrapper style.
- Preserve existing widths, aspect ratio, spacing classes, colors, typography, and CTA/layout structure exactly as-is.

Expected outcome
- Heading, matching screenshot, and play/pause toggle always fade out together and fade in together.
- No mismatched heading/image flash.
- Previous screenshot is fully invisible before the next one appears.
- Toggle is no longer effectively static relative to the animated content.
- Autoplay resumes from the current manually navigated slide, not from the beginning.
