# Base evaluation — 22 October 2026

Inspected README, package manifests and relevant source from shallow clones. No source or assets from either project were copied into this prototype. These are source-level observations, not benchmark or legal clearance results.

| Criterion | donmutti/gta | AneeshaRama/openworld |
|---|---|---|
| Revision inspected | `32b85cc3014174a79d4d822b43b23d65637dc295` | `77c0845cf58861ee96e75e49061cf1194f6cbc6b` |
| License evidence | package.json declares `ISC`; no root LICENSE file found. Better signal, but an explicit license text/copyright and asset provenance should be confirmed before deriving a commercial project. | No root LICENSE and no package license declaration found. Public visibility alone is not an affirmative reuse license. |
| Architecture | Plain JS, Three.js, Vite; separate game, world and render modules. Extensive crowd, police, traffic, terrain and breakable-prop systems. | React, TypeScript, Vite, MapLibre GL JS plus Three.js custom layer; globe/city screens, road controller and procedural audio. |
| Map generation | Development-time Overpass fetch; local metres, bundled `public/data/city.json`; predictable offline gameplay. Fetch tool and world generator are tailored to Luxembourg, including terrain/bridges and location-specific decor. | Live OpenFreeMap vector tiles; buildings rendered by MapLibre; `RoadNetwork` queries loaded transportation features and builds road corridors. Easy location choice; runtime depends on tile availability and loaded map coverage. |
| Third-person driving | Chase and birdseye cameras; richer car handling, recovery and collisions. Closest functional fit. | Car controller updates geographic coordinates and follows with MapLibre camera; road corridor constraints. Appropriate for exploration, less direct control over a handcrafted cinematic world. |
| Extensibility | Modular game systems and delivery code provide mission integration points. Uxbridge adaptation would require removing many Luxembourg assumptions and unneeded systems. | Small codebase with clear components. Custom house/realtor/mission would need integration across map layers, mercator coordinates and React state. |
| Mobile | Dedicated `src/game/touch.js`: coarse-pointer detection, per-pointer capture, stick/button layouts, drift/menu. Existing implementation is promising; not device-tested here. | README documents keyboard; no dedicated driving touch controls found in inspected controller/components. Map gestures are not driving controls. |
| Performance | README reports roughly ten seconds of world-building on a recent laptop and thousands of buildings/props. Instancing exists, but its much larger scene carries unnecessary initial work for this mission. Not measured here. | Streams tiles and uses a shared map WebGL context. Avoids one huge world build but adds MapLibre/React and live tile work. Not measured here. |
| Mac setup | Node 20.19+ / 22.12+, npm, Vite; browser/WebGL. No Windows dependency. | Node/npm, Vite/TS build; browser/WebGL. No Windows dependency. |

## Decision

Build a small original **Three.js** alternative. The Luxembourg project is the stronger technical starting point if its license/provenance is clarified, but its larger simulation and city-specific assumptions work against validating a single short drive. OpenWorld is appealing for global exploration, but this task needs one fixed town, fast predictable initial loading, bespoke mission placement and mobile driving; the absent license and tile dependency also make it a weaker base here.

The alternative implements just the required driving, camera, static OSM world, mobile controls, minimap, waypoint and arrival link. It is independently authored. Its tradeoff is deliberately simple handling and scenery; it should not be presented as feature-equivalent to either project or to GTA.

## Sources

- https://github.com/donmutti/gta
- https://github.com/donmutti/gta/blob/32b85cc3014174a79d4d822b43b23d65637dc295/package.json
- https://github.com/donmutti/gta/blob/32b85cc3014174a79d4d822b43b23d65637dc295/tools/fetch-city.mjs
- https://github.com/donmutti/gta/blob/32b85cc3014174a79d4d822b43b23d65637dc295/src/game/touch.js
- https://github.com/AneeshaRama/openworld
- https://github.com/AneeshaRama/openworld/blob/77c0845cf58861ee96e75e49061cf1194f6cbc6b/package.json
- https://github.com/AneeshaRama/openworld/blob/77c0845cf58861ee96e75e49061cf1194f6cbc6b/src/lib/roads.ts
- https://github.com/AneeshaRama/openworld/blob/77c0845cf58861ee96e75e49061cf1194f6cbc6b/src/lib/BikeController.ts
