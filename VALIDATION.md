# Validation — 22 October 2026

- Eight automated tests pass: all twelve stop routes connect to downtown; map coordinate round trips; speed/proximity arrival gates; saved-progress recovery; free-order and duplicate-safe stamps; house room/story/source integrity with archival qualifications; road driving acceleration, brake/reverse, steering and boundaries.
- Production build passes. Game JavaScript is about 55 kB uncompressed / 20 kB gzip; the separately fetched map database is 266,548 bytes. No cold-load/FPS benchmark is claimed.
- Dependency production audit reports zero vulnerabilities.
- Browser preview returned HTTP 200 and loaded the new title and opening dialog.
- Portrait/narrow layout inspected, with route, car, destination, journal and controls visible.
- Ride along initiated toward coffee and toward Harrison House. Saved journal displayed coffee and Sundays stamps. House arrival and its activity screen were observed.
- Real iGUIDE photographs loaded. A programmatic move to another room updated the story through the viewer event. Saving two distinct room stories earned the House historian stamp and exposed the correct REALTOR.ca link.
- The journal displayed three stamps and “Day well spent.” The storybook fallback was opened and showed retained progress with source qualifications.
- Captured console contains an iGUIDE cross-origin WebXR permission-policy error. The ordinary photographic tour and navigation still worked; VR is not requested or required by this game. This is not a claim of an error-free third-party viewer.
- Not verified: live Google key/billing, satellite rendering, embedded Street View coverage, exact storefront/park entrances, physical iPhone/Android multitouch, low-memory behaviour, screen-reader coverage or production-authenticated browser walkthrough.

Companion screenshots in the parent outputs folder show the house tour and completed journal. No Google imagery is presented as available in the no-key build.

## Street View revision — 22 October 2026

All eleven non-house destinations now have Google-supplied, keyless embed URLs collected from the Google Maps sharing UI. Source panoramas and camera angles were inspected: coffee/bookshop, Roxy, library, bakery, historical Sundays frontage, Centennial Park, Elgin Park entrance, Uxbridge Secondary, Joseph Gould, and older Uxbridge Public School grounds. The house retains the iGUIDE integration and has no Google iframe entry. A new coverage check verifies every non-house ID has a Google embed/panorama URL, note, provenance and no API key.

Panoramas are historical: September 2014 for Victoria Drive, May 2024 for the other scenes. Some signage or obscuring trees differ from current appearance; notes are visible beside each scene. Google may alter availability.

Every captured URL comes from the Google sharing dialog rather than an invented URL or third-party API key. The coffee/bookshop frontage and both Planks Lane school directions intentionally share source panoramas. Schools are shown as exterior public-street scenes.

The updated coffee stop was opened in the running game. Its keyless Google iframe loaded the photographed Books + Coffee frontage with navigation arrows, fullscreen/rotation/zoom controls and unobscured Google attribution. No console errors or warnings were captured in that preview. Screenshot: parent outputs/street-view-in-game.png. All eight tests and the production build pass. Source panorama availability was checked through the Google Maps UI; an exhaustive production walkthrough of all embedded frames was not performed.

## Family morning revision — 22 October 2026

Twelve automated tests pass, including new checks for primary/nursery/large-bedroom/deck/porch panorama assignments, ordered room-gated tasks, corrupt morning save recovery, both home-to-school road routes and distance-based route interpolation. Browser QA loaded the real primary-bedroom image, advanced to the nursery with crib, collected the younger child and older child from the mapped rooms, then reached the real deck and displayed the dog overlay. School-map and return-to-town checks follow below.

School-map QA confirmed both coloured paths, animated progress and arrival labels: the younger child with the player at Joseph Gould, the older child at Uxbridge Secondary. The coffee handoff restored the car at the house and the existing town controls. Replay and story-mode fallback were exercised through all five morning tasks, without changing the prior day-journal stamps. Screenshots: parent outputs/morning-primary-bedroom.png, morning-backyard.png, morning-school-journeys.png, morning-school-arrivals.png. Paths remain illustrative road routes rather than verified pedestrian routes.

### Driving fix verification
All 15 automated tests pass and the production build succeeds. Regression coverage exercises reverse from rest at 60/180/360/720 physics steps per second, braking through zero, steering, reversing from outside the old road boundary, returning to the street, crossing the former barrier, and frame-rate consistency. Browser smoke check confirmed reverse movement from rest and continued driving/reversing after a detour, with no console errors. School completion now derives from the two walker durations (6/8 seconds), including the skip button.

### Full-browser morning scene
The morning tour fills the browser viewport with its task card overlaid and scrollable on smaller screens. Browser checked the live panoramic house and returning to town; the normal map layout is restored when leaving the morning. Town stop dialogs keep their existing layout.

### Family-day sequence
18 automated tests pass, including ordered school/errand transitions, optional cider without gating, drive/walk mode changes, and invalid saved-state recovery. Extended-map route checks connect all destinations, including Slabtown. Browser completed both school drop-offs, the grocery pickup, the mapped dog-walk chapter, optional Slabtown purchase, return home and switch to downtown walking, using the explicit Skip travel control for travel portions. Walk along produced a green mapped route. The original eleven panoramas remain; new stops use illustrated panels. No new panoramas are claimed.

Location references: Countryside Preserve trailhead behind Walmart confirmed at https://discoveruxbridge.ca/trails/countryside-preserve-2/ ; market location at https://uxbridgefarmersmarket.ca/about ; brewery at https://thesecondwedge.ca/visit-us/ ; Slabtown at https://slabtowncidery.squarespace.com/contact . OSM supplies approximate map geometry and frontage positions.

### Missing panoramas completed
Selected the five missing panoramas using Google Maps Share → Embed. Automated coverage now requires every non-house stop to have a keyless panorama, including all five additions. No game browser testing was performed for this update.
