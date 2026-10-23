# Greater Toronto Area 55 — Uxbridge edition

A local exploration game: drive through real Uxbridge road geography, choose your own stops, collect three good moments, and keep a day journal. A historic-house tour at 55 Brock Street East is one optional activity among twelve. The listing is revealed after reading two house stories.

## Mac setup

Use Node 22.12+ or 24. In this folder:

```sh
npm ci
npm run dev
```

Open the printed Local URL. For phones on the same Wi-Fi, open the Network URL. Touch controls appear on coarse-pointer devices and can be toggled. No API key is required for the playable map preview or the eleven Street View stop embeds.

## Play

- WASD / arrows: gas, brake/reverse, steering. Space: simplified handbrake.
- E / Park & explore: visit the selected stop when close and below 7.2 km/h.
- Day journal / Pick a different stop: choose a destination. Map pins also select destinations.
- Ride along: follows roads automatically; steering/pedals cancel it. Select a destination, then reopen the journal to ride there.
- P / pause: pause/resume. R / Reset car: reset position, preserving the journal.
- Collect three stops in any order for “Day well spent.” Keep exploring afterward.
- About this day: sources, media status, and a fresh-journal action.

Stops: The Bridge Social, Blue Heron Books, Roxy Theatres, Little Thief Bakery, library, Sundays, Centennial Park/Historic Trail, Elgin Park, Uxbridge Secondary, Joseph Gould Public School, Uxbridge Public School, and Harrison House. Imaginary purchases and original fictional dialogue do not represent real staff, orders, reservations or endorsements.

## Imagery: what works now

**Default: illustrated 2D map with real OSM roads.** No Google key is included. The driving map stays illustrated, but all eleven non-house stops now embed manually selected Street View panoramas. The URLs were obtained from Google Maps Share → Embed a map, with camera angles inspected in the browser on 22 October 2026. Google serves all photographs inside its own iframe; nothing is downloaded or rehosted. A link opens the same panorama in Google Maps if the embedded view is unavailable.

**House: hosted iGUIDE panoramas**, integrated with the official `@iguide/viewer` API. Floor-marker navigation updates the story strip. Fifteen researched room stories and qualifications are reused from the earlier Harrison House project. Save two distinct stories for the house stamp. “Read stories without the viewer” allows completion if external photography is unavailable; it does not claim verified panoramic exploration. The original-tour link remains available. The listing appears after the stamp and says the real home is offered for sale.

## Enable Google satellite driving later

1. Use your own billing-enabled Google Cloud project with **Maps JavaScript API** enabled.
2. Create a browser API key restricted to that API and the exact localhost/deployed origins. Configure quotas and billing alerts in Google Cloud.
3. Copy `.env.example` to `.env.local` and set `VITE_GOOGLE_MAPS_API_KEY`. Browser Maps keys appear in the client bundle by design; use restrictions. Never use another simulator's key.
4. Restart development or rebuild/redeploy. Configured builds request hybrid satellite imagery for driving. The town-stop Street View iframes work independently without this key.

The optional satellite-driving adapter is implemented but **not live-key validated**. Load/auth errors retain illustrated mode. Attribution has dedicated space below canvas overlays. Verify live imagery, performance, attribution, costs and applicable Google terms before public marketing. Do not assume Map Tiles API promotional-video rules apply unchanged to Maps JavaScript API.

References:
- https://developers.google.com/maps/documentation/javascript/get-api-key
- https://developers.google.com/maps/documentation/javascript/streetview
- https://developers.google.com/maps/documentation/javascript/policies
- https://docs.youriguide.com/docs/viewer/api-reference/

## Build and validation

```sh
npm test
npm run build
npm run preview
```

`dist/` is a static site; serve with HTTP/HTTPS. Journal and house progress use browser storage with malformed-data recovery. No analytics or location permission. Current Sites publication remains private.

Eight automated tests cover all twelve road routes, coordinate conversion, arrival gating, free-order/idempotent stamps, malformed saves, valid house room/story/source mappings and historical qualifications, plus acceleration, braking/reverse, steering and road boundaries, and complete keyless Street View coverage excluding the iGUIDE house. See VALIDATION.md for browser results.

## Geography and limitations

227 bundled OSM road ways and 1,231 building footprints. Local metre projection: longitude -79.120, latitude 44.1095; +x east, +z south. The no-key driving map is a stylized plan; stop screens provide the real photographic street scenes. OSM POIs supply several stop coordinates; coffee, bakery and restaurant are approximate frontages. The house uses a listing geocode. Parking markers snap to nearby roads. Elgin Park's arrival is approximate, not a verified vehicle entrance. Verify exact entrances and photographic coverage locally. School notes describe locations, not catchment or enrolment eligibility. Sources and pin qualifications are in `src/day.js` and in-game About. Place references checked 22 October 2026; house research retains its 21 October qualifications.

Arcade corridor constraints are not a wall/traffic simulation. Ride along ignores one-way rules; no traffic/pedestrians. Tight business clusters are easiest to select in the journal. Real-phone multitouch, FPS and live Google performance are unverified. No negotiation, real transaction, fake reservation or mandatory house tour.

## Files and next steps

- `src/main.js`: canvas map, driving, activities, journal, house integration.
- `src/day.js`: places, original dialogue, state and arrival rules.
- `src/maps.js`: optional official Google satellite-driving adapter.
- `src/streetviews.json`: eleven manually selected Google iframe URLs, opening links, selection provenance and scene/date notes. The house is intentionally excluded.
- `src/house/`: earlier researched room graph, stories and sources.
- `src/drive.js`: road geometry, routing and handling.
- `public/data/uxbridge.json`: separately licensed ODbL database.
- `tools/fetch-map.mjs`: reproducible importer; `npm run fetch-map` refreshes it. Recheck routes after refreshing.

The old third-person version remains in Git history. BASE_EVALUATION.md records the earlier comparison, not the current renderer architecture. The old Three.js notice is retained for that version; Three.js is no longer a runtime dependency.

Next: configure/test real Google imagery; verify frontages locally; add approved photos/video where useful; tune physical-phone controls; deepen one activity before adding more destinations. Public sharing is a separate launch decision.

## Selected Street View scenes

Coffee and Blue Heron Books share the same Books + Coffee frontage panorama. Roxy, library and bakery frontages are visible. Sundays uses a May 2024 Brock Street frontage whose shop signage may predate the current restaurant. Centennial Park is viewed from Centennial Drive; Elgin Park shows its entrance from Main Street South, not an interior trail walkthrough. The two Planks Lane schools use opposite directions from a shared road panorama. Uxbridge Public School uses September 2014 Victoria Drive imagery; the school grounds are visible but trees obscure much of the facade. Other selected scenes are May 2024. These are historical Google scenes, not promises of current conditions. Google may change availability; all activities remain playable when a panorama fails.

## Family morning opening

The default opening now begins in the real primary-bedroom panorama (10011 / room 39). Wake up, collect the younger child from Bedroom 1/the nursery (10005 / room 41), collect the older child from Bedroom 2/the large room (10007 / room 42), let the illustrated dog into the backyard from the deck (23 / room 29), and leave from the porch (7 / room 38). The room assignments follow the owner's instructions. Children and dialogue are fictional, not depictions of real occupants. The nursery is the younger child's bedroom within this imagined school-age family scenario.

Objectives normally require the matching room's viewer position; the house remains freely navigable, and room shortcuts are available. Story mode offers an explicitly labelled fallback without photographic-position verification. Morning progress has its own recoverable storage entry; Skip morning opens the town, and Replay morning restarts the routine without clearing the day journal.

At departure, the map shows two animated paths: you accompany the younger child toward Joseph Gould Public School; the older child heads toward Uxbridge Secondary School. These are illustrative paths along the bundled road graph, compressed into 6–8 seconds of story time. They are not surveyed pedestrian routes, walking-time measurements, school-boundary claims or safety advice. Finish the school walk can fast-forward the animation; once both arrive, continue into the existing town game with the car at the house. No school stamp is awarded merely for the cutscene.

Morning code: `src/morning.js` (viewer/UI), `src/morning-state.js` (objectives, save recovery, route interpolation). Additional tests check the exact room assignments, ordered room-gated progression, both home-to-school routes and walker interpolation. Reloading after departure offers replay/skip rather than preserving the animation's exact frame.

### Driving update
Reverse now starts reliably with S / down / Brake–Reverse, including high refresh screens. Road acceleration is 18 m/s² and top speed is 38 m/s (137 km/h); ride-along travels at 24 m/s. Grass is forgiving, slower terrain (16 m/s maximum), with no invisible road-edge trap. This arcade preview allows crossing building footprints; it does not simulate building collisions. School journeys take 6 seconds for Joseph Gould and 8 seconds for Uxbridge Secondary; Finish the school walk still skips ahead.

## Family-day route (latest)
Finish the real-house morning to start a car school run: Joseph Gould, Uxbridge Secondary, Zehrs grocery pickup, then a walking chapter at the Countryside Preserve behind Walmart. The car stays at the shopping-area stop while you and the dog follow mapped paths. Finish the walk to return to the parked car and choose either an optional Slabtown bottle pickup or home. At home, unload and settle the dog; downtown then uses the walking avatar and controls. The journal now includes The Second Wedge and the adjacent farmers’ market (a fictional market-day bonus, not daily opening hours).

Use Continue the day to recover the next story objective, Ride/Walk along to follow the route, or Skip travel to shorten the journey without completing the activity. WASD/arrows and touch buttons work in both travel modes. Family-day chapter progress is saved separately from the journal; Replay morning restarts the story, while Skip morning opens free exploration. On reload the current chapter resumes from home (or the shopping-area parking point for the trail chapter). Movement positions are not saved.

The OSM extract now covers the shopping area and the connected Concession 6 country route to Slabtown: 606 road ways, 3,480 building footprints, plus mapped footpaths. New stops use original illustrated activity panels and source links; their Street View panoramas have not yet been curated. Walking is simplified and does not model obstacles or pedestrian crossing rules. The short return from the dog-walk marker to the car is compressed.

### Travel display
Vehicle movement and ride-along now cover ground three times faster. The HUD shows route distance and approximate real-world travel time, with no speedometer. Estimates use 30 km/h average local driving or 5 km/h walking and do not represent accelerated game time or live traffic.

### Power-walking and story photography
Walking now moves ten times faster (including Walk along): Olympic errand mode. Real-world arrival estimates still use an ordinary 5 km/h pace. School story scenes now reuse the existing Google Street View embeds instead of bypassing the media panels. The homecoming uses the real iGUIDE tour. New stops with no curated panorama have an explicit Street View link, rather than an unrelated or invented panorama.

### Compass controls
Arrow keys and WASD now map directly to north / west / south / east in both travel modes. Hold two directions for normalized diagonal movement; opposite keys cancel. The car faces its travel direction automatically, and releasing the keys stops movement. Touch uses the same four compass buttons. Walking has a visible facing arrow.

### Forgiving terrain
The current compass-control driving mode uses the same speed and acceleration on and off roads. There is no grass slowdown or road-edge penalty.

### Local live radio
The Radio button loads the station-hosted 105.5 Hits FM player on demand. Press Play in the official player, then hide the panel to keep listening. Off removes the player and stops this embedded session. The fallback link opens the station’s official player separately. Stream availability and browser playback policies belong to the station/browser; audio playback has not been browser-tested. No audio is downloaded, rehosted or bundled.

Radio focus fix: Back to game explicitly focuses the game canvas, clears held keys and restores play if it was running when the player opened. Clicking the map also closes the panel and returns keyboard control. Focusing the station iframe no longer triggers the window-blur auto-pause. Switching to a hidden tab still pauses normally.

### Explore freely
Every nearby stop can be entered independently of the navigation destination. E and the main Explore button open the nearest stop; other nearby places get their own buttons, and tapping a nearby map pin opens it directly. The arrival area accepts either the real location pin or its road-snapped marker within 55 metres while stopped. Completed downtown stops suggest another unvisited discovery; the itinerary remains optional guidance for exploring. Required family story steps retain their order.

### All stop panoramas completed
All 16 town stops now have Google Maps Share → Embed panorama URLs, including Zehrs, Countryside Preserve, Slabtown, the farmers’ market grounds and The Second Wedge. The house keeps iGUIDE. The market view shows the venue area (not an active market), the Preserve shows the trailhead approach, and the brewery uses a contributed November 2023 panorama. Google serves all imagery directly. Original heading values were adjusted toward the destination where appropriate.

Branding uses the owner-supplied Greater Toronto Area LV — Uxbridge logo (LV = 55), optimized to 2048 pixels wide for the browser. The game name and browser title are Greater Toronto Area 55, referencing 55 Brock Street East.

### Preserve arrival and transparent branding
The logo now sits directly on the map without a dark backplate. After groceries, drive to the exact requested trailhead parking point (44.0876563, -79.1317347), park, then switch to walking. The parked-car marker and return position use that point. The walk destination shows an in-Preserve panorama by Dennis Rankin rather than the parking approach. The owner’s exact Google Maps nature-video link is available beside it: Google’s Embed action for that clip returns a place-map iframe, not the video itself, so the video opens on its original Google Maps page. No video is copied or rehosted. Older itinerary saves migrate to the added parking chapter.

### Roxy / living-room video and meditation
The owner-selected YouTube video yIKn-HoAlC4 appears at the Roxy and when the real-house viewer is in Living room 30 (panoramas 9–11), including free exploration during the morning. Playback is user-initiated; the original YouTube link is available if embedding is restricted.

Meditate pauses the game and opens Google Maps Street View at the player’s current projected coordinates, facing their current heading. This works anywhere Google has nearby imagery without an API key; it opens the official external viewer rather than claiming an arbitrary-location in-game embed. Resume the game on returning.

### Opening cover art
The opening screen uses an original AI-generated Uxbridge cover collage inspired by illustrated game-box art: Roxy, library clock tower, railway station, bookshop, nature trail and family-car scenes. These are stylized interpretations rather than photographic reconstructions. Generated with the built-in image tool and the owner’s supplied cover-style reference and logo; the prompt is included with the deliverables.

### Combined school walk
Walk both kids to one Joseph Gould / Uxbridge Secondary drop-off, then walk home to collect the dog and car. The grocery drive begins only after that home interaction. Either school pin opens the combined drop-off during the school objective; completing it stamps both schools. The dog and parked car stay at home during the school walk. Older in-progress separate-school saves migrate to the combined stop.

### Simple live radio; no game pause mode
The global game pause button, P shortcut and blur/tab auto-pause state are removed. Losing focus still clears held movement keys. Stop and house panels naturally suspend map movement while open. The radio is one labelled Hits 105.5 · Uxbridge play/pause button, using the HTTPS AAC stream published in the station’s own player configuration. Pausing disconnects the live stream; Play reconnects live. Connection errors offer the official station player on the next click. No iframe or radio popover steals keyboard focus. No audio is downloaded or bundled. Audio playback remains unverified in a browser.

### Vince’s groceries and optional Walmart toy
Groceries now go to Vince’s Market at 234 Toronto Street South, with its own frontage marker and panorama. The next drive remains the Preserve trailhead. At that parking interaction, an optional fictional Walmart toy pickup adds a saved toy flag; skipping it still starts the walk normally. With the toy, the walk dialogue describes fetch, carrying and squeaking, and the dog marker carries a small pink toy. Older saves without the toy flag default to no toy. Existing Zehrs journal stamps migrate to the replacement grocery stop.

### Street View interaction and Vince’s frontage
Vince’s now uses the exact owner-selected storefront panorama I2ALfMJEzFtMNaiST1bmxw and camera angle. Embedded panoramas have Done looking / Look around and Reset view controls outside Google’s frame; Done looking disables iframe pointer interaction, while Reset reloads it to clear a stuck drag. The iframe sandbox excludes pointer-lock permission. Game touch captures are released when clearing input. Google still handles drag behaviour inside its cross-origin viewer, so that internal interaction cannot be rewritten by this game.

### Slabtown bottle menu
The Slabtown stop uses the owner-supplied aerial property photo instead of Street View. Ten cider options are transcribed from the supplied menu photograph, with style, ABV and short tasting notes. Selecting a bottle then confirming saves its stable ID in the journal, updates the take-home bag and homecoming dialogue, and leaves Slabtown fully optional. This is a fictional pickup; menu-photo options are not a live inventory or price list. The original menu photograph is expandable beside the activity.

### Your home is for sale / open-house story
Collecting the dog and car starts an in-game open house: a fictional agent shows your real home while you run errands. Any home visit while active (including the normal return after the walk or Slabtown) opens the owner-selected YouTube film instead of iGUIDE. The YouTube IFrame API ended event finishes the open house and persists that state. Closing early does not finish it. On playback/API failure, the original YouTube link and an explicitly self-reported watched confirmation are offered. The normal home interaction then resumes. Replaying the morning resets the open-house event. A persistent HUD link clearly labels 55 Brock Street East FOR SALE and opens the real listing; fictional open-house status is labelled separately.

The farmers’ market activity now uses the owner-supplied market photograph instead of Street View.

### Afternoon: school pickup, sports, Sundays
After the morning errands and open house, visiting three distinct locations during the power-walk triggers school pickup. Repeat visits do not count; earlier morning stamps do not count. Walk home for the car and sports bags, collect both kids at the school stop, drop the older child at Uxbridge Arena, then the younger one at Kennedy Fields / Fields of Uxbridge (335 Main Street North). Play a short three-return pickleball timing activity while soccer is on, or enjoy the sidelines. Reunite with the younger child, collect the older one from hockey, then go to Sundays for a fictional family dinner. Afternoon progress and visited locations persist separately; replaying the morning resets this chapter.

Sundays on the earlier power-walk offers only taking a menu or greeting a friend through the window. Dinner interaction becomes available in the later dinner chapter, even if the location was previously stamped. Sports maps extend north using OSM roads. Arrival panoramas show nearby public-road approaches, not inside the rink or courts. The afternoon minigame and child activity timings are fictional. No real bookings, orders or sports registrations are made.

### Choose the drive soundtrack
After walking home from the school drop-off and collecting the dog/car, a two-option story card offers driving with Hits 105.5 · Uxbridge or driving in silence. Radio playback starts only from the explicit radio choice; silence disconnects any currently playing stream. The normal radio toggle remains available afterward.

### Bookshop, bakery and butcher
Blue Heron Books and Little Thief Bakery now use the owner-supplied interior / pastry photos instead of their Street View panes. The Meat Merchant at 3 Brock Street West is a new free-exploration stop with fictional butcher-shop choices, a journal stamp and a mapped frontage panorama. It counts toward the three distinct power-walk visits.

The owner-selected YouTube film now appears only for the open-house story. It has been removed from the Roxy and the living room, including the morning house tour. Roxy retains its cinema activity and Street View; the living room retains the real house viewer and room stories.


### Missions and inventory
The journal is now Missions & bag: family mission history, five trackable side quests, a choice-sensitive inventory, and All Locations with instant fast travel. Tracking a side quest changes the route while preserving family progress. Side quests use previously completed activities. Picnic lunch specifically requires the sandwich choice at The Meat Merchant plus Little Thief pastries; unpack at Elgin Park to complete it. Provisions are then marked enjoyed, with a picnic memory retained. Existing generic butcher pickups can be upgraded to sandwiches on a revisit. Items, plans and quest keepsakes persist in browser storage. Fast travel moves the player only and never completes an activity.
