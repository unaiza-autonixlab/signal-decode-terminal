

## Bug Analysis

The current code sets `groupOpacity = 0` then uses `setTimeout(FADE_MS)` to know when fade-out is done. The problem: React may batch-render the new `displayIndex` content slightly before the CSS transition visually reaches opacity 0, causing a brief flash of the next image. The `setTimeout` and CSS transition duration can drift apart by a frame or two.

## Fix

Replace the Phase 1 `setTimeout` with a `transitionend` event listener on the group wrapper. This guarantees the content swap happens only after the browser has truly finished the opacity-to-0 transition — no timing drift possible.

### Changes to `src/components/LiveOutput.tsx`

1. Add a `ref` to the animated group `<div>` wrapper.

2. In `runTransition`, replace the Phase 1 `addTimer(() => { ... }, FADE_MS)` with a one-shot `transitionend` listener on the group ref:
   - Set `groupOpacity(0)` to start fade-out
   - Listen for `transitionend` on the ref element (filter for `opacity` property)
   - In the handler: swap `displayIndex`, update `dotIndex`, then `requestAnimationFrame` → set `groupOpacity(1)`
   - Keep the Phase 2 completion (fade-in done) as a second `transitionend` listener that clears `transitioningRef` and processes pending/autoplay

3. Keep the mount effect using `requestAnimationFrame` for initial fade-in (no fade-out needed on mount), but use `transitionend` for completion instead of `setTimeout`.

4. Add a safety fallback `setTimeout(FADE_MS + 50)` that fires only if `transitionend` doesn't trigger (e.g., if element is unmounted), to prevent the carousel from getting stuck.

5. No changes to styling, layout, colors, or content.

