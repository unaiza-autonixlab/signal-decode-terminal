

## Plan: Rewrite LiveOutput image display to stacked opacity layers

### What changes

**Remove:**
- `displayIndex` state (no longer needed for image rendering)
- `groupOpacity` state and the animated wrapper `<div style={groupStyle}>`
- The single `<img>` tag that swaps `src`
- All the complex two-phase fade sequencing in `runTransition` and the mount effect

**Keep:**
- `dotIndex` state (renamed/repurposed as `activeIndex` — the single source of truth for which slide is active)
- `playing` state, `playingRef`, `transitioningRef`, `pendingRef`, `timersRef`
- `handleArrow`, `handleDot`, `handleToggle` — same logic but simplified
- `scheduleNext`, `clearTimers`, `addTimer`
- All layout, styling, colors, CTA, dots

**Add/Change:**

1. **Single `activeIndex` state** replaces both `displayIndex` and `dotIndex`. `currentRef` tracks it for refs.

2. **`runTransition` simplified**: Just sets `activeIndex` to the target. The CSS handles the crossfade automatically — no phased sequencing needed. Still uses `transitioningRef` with a single `FADE_MS` timer to prevent rapid-fire transitions from overlapping.

3. **Mount effect**: Just call `scheduleNext()` — images start visible since `activeIndex` defaults to 0.

4. **Image rendering**: Replace the single `<img>` with all 5 stacked:
   ```
   <div className="w-full max-w-[480px] md:max-w-[240px] mx-auto aspect-[9/16] overflow-hidden rounded-sm relative">
     {slides.map((s, i) => (
       <img
         key={i}
         src={s.src}
         alt={s.label}
         className="absolute inset-0 w-full h-full object-contain"
         style={{
           opacity: i === activeIndex ? 1 : 0,
           transition: `opacity ${FADE_MS}ms ease-in-out`,
         }}
       />
     ))}
   </div>
   ```

5. **Label and toggle**: Update instantly based on `activeIndex` — no fade wrapper needed. The `<div style={groupStyle}>` wrapper is removed; label/toggle/arrows render normally.

### File changed
- `src/components/LiveOutput.tsx` — full rewrite of state and image rendering, navigation logic preserved.

