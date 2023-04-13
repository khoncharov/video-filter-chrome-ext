# Video filter chrome extension

## Extension functions

1. Find & show video container on the page
2. Change video brightness, contrast, saturation
   - filter: brightness() - default 100% / min 0 / max 300
   - filter: contrast() - default 100% / min 0 / max 200
   - filter: saturate() - default 100% / min 0 / max 200
3. Flip video container
   - transform: scaleX(-1) - on / off
4. Save filter state with Alias
5. Restore filter state

## Design

Figma [layout draft](https://www.figma.com/file/hmcOOhND0LHUrJdOEFo8cz/Twitch-video-filter?t=FC0zW5v5bj7pRjJ2-6)

## TODO list

- [x] validation
- [x] focus visible and keyboard navigation
- BUG wrong saves list keyboard navigation
- [ ] tests
- [ ] option page (internationalization, short manual)
- [ ] deploy GWS?
