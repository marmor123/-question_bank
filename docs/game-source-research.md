# Reusable game foundations: first pass

Date: 2026-10-20. This is repository/documentation research, not a runtime test, code-quality audit, or a decision to adopt an engine. Fit and adaptation estimates below are engineering judgments.

## Recommendation

Choose a target platform before choosing a foundation. For a browser-first prototype, inspect EmberQuest first. For an installed graphical RPG, compare GDQuest OpenRPG with Tuxemon. Keep hero/team/deck undecided until trying their existing gameplay and adding one question encounter to the strongest candidate.

Prefer one primary codebase. Borrowing separately licensed assets or isolated utilities can save work; merging several games' combat, saves, and progression systems can create more integration work than it saves. None of these projects already implements our agreed question progression, redemption, and reward rules.

## Candidate comparison

| Candidate | Verified scope and stack | Licensing evidence | Fit and remaining work |
|---|---|---|---|
| **[EmberQuest](https://github.com/TheDroidYourLookingFor/EmberQuest)** | Playable browser idle RPG. Single HTML/CSS/JavaScript file; manual and automatic combat, equipment, shops, zones, localStorage saves and JSON backup. | Repository README declares GPL-3.0. It also identifies externally loaded Tabler icons; do not assume the repository license replaces third-party terms. | Closest documented browser/hybrid loop. Its ordinary combat, idle XP, repeatable rewards, and prestige conflict with question-only permanent growth and first-victory coins, so substantial reward changes are needed. Large single-file structure needs inspection. Bundle dependencies and test with networking disabled before calling the fork fully offline. |
| **[GDQuest Godot OpenRPG](https://github.com/gdquest-demos/godot-open-rpg)** | Godot 4/GDScript classical turn-based RPG **work-in-progress demo**, explicitly a learning resource rather than a framework or complete game. Describes combat, inventory, progression, maps and menus. | [Code license is MIT](https://github.com/gdquest-demos/godot-open-rpg/blob/main/LICENSE); [asset credits](https://github.com/gdquest-demos/godot-open-rpg/blob/main/CREDITS.md) label the listed external art/audio CC0. Preserve separate addon notices. | Promising clean starting point for hero/party adventures with paused question events. More content creation than a full-game fork. Verify implemented versus planned systems and actual export targets before selection. A Godot engine capability is not proof this particular project exports correctly to browsers. |
| **[Tuxemon](https://github.com/Tuxemon/Tuxemon)** | Substantial monster-fighting RPG in ongoing development. Python; JSON game data, Tiled maps, scripting, creatures, techniques, items and NPCs. README lists desktop platforms and some Android support. | Code GPL-3.0-or-later, with third-party exceptions. [Asset attributions](https://github.com/Tuxemon/Tuxemon/blob/development/ATTRIBUTIONS.md) are per asset: examples include CC-BY-SA 4.0, CC-BY and CC0. It is not an all-MIT or uniformly licensed art pack. | Strongest team/creature direction in this pass: original monster roster and existing exploration/battles. Likely more content reuse than the demo, but a browser version is not established by the official README. Question UI, progression replacement and per-asset attribution need work. Do not describe it as a finished campaign without playtesting. |
| **[Flare](https://github.com/flareteam/flare-engine)** | C++/SDL2 single-player action-RPG engine with separate [Empyrean game content](https://github.com/flareteam/flare-game). INI-style data and Tiled maps; local saves. | [Engine README](https://github.com/flareteam/flare-engine/blob/master/README.engine.md): GPL-3.0-or-later. [Game credits](https://github.com/flareteam/flare-game/wiki/Credits): general art CC-BY-SA 3.0-or-later with individual exceptions. Fonts have separate terms. | Useful established action-RPG option, but real-time combat is a less direct match for occasional question-driven turning points. Native stack adds distance from a browser question interface. Lower-priority base unless action gameplay is preferred. |

## Additional leads

**[Worlds Upon The Wind](https://github.com/max99x/wutw-public)** is an unusually relevant deck direction: a full Godot 4/GDScript game with a C++ extension, cards, events, saves, and Japanese-learning minigames. The official README releases its own code/art into the public domain (CC0 badge), but excludes music/SFX and lists separate MIT, OFL, CC-BY-SA and CC-BY dependencies/data. It is a peaceful settlement deckbuilder, not a combat deckbuilder, so adopting it would change the battle concept. Desktop setup is documented; browser compatibility is unverified. Worth evaluating if decks remain interesting, but not automatically less work than a battle-focused base.

**[Pokete](https://github.com/lxgr-linux/pokete)** is a terminal-based Python monster-catching game with combat, types and mods. Its terminal presentation makes it a poor graphical-app foundation. License-file verification was incomplete in this pass; it is not cleared as a code or asset donor here.

## Decision gate

Ask: Must the first version run in a browser, or is installing a standalone game acceptable?

Then test the strongest two candidates for: startup/build, offline launch, long clinical-vignette readability, pause/resume around one question, reliable save/load, and replacing ordinary XP with question-earned progress. Pin the selected upstream commit and inventory the exact reused files and their licenses before importing them. This research did not copy game code or assets.
