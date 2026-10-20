# Reusable visual combinations for the first adventure

Research date: 2026-10-20. Decision ticket: [Identify reusable visual combinations for the first adventure](https://github.com/marmor123/-question_bank/issues/2).

## Finding

Three combinations are worth a human visual comparison. None requires adopting a source game's engine or mechanics. These are candidate compositions, not a chosen art style, engine, or player format.

| Combination | Strongest reuse | Main gap | First-pass judgment |
| --- | --- | --- | --- |
| Kenney pixel dungeon + pixel UI | Small, consistent environment, character, item and interface vocabulary | Verified attack animation clips are absent from the evidence | Easiest candidate for a deliberately simple presentation, provided procedural movement is acceptable |
| Wesnoth illustrated portraits + animated sprites + restrained UI | An ordinary game's portraits, terrain, attack frames and enemy assets | File-level art licensing and small sprite scale | Strong illustrated identity, but not a library of large animated illustrated characters |
| KayKit characters + skeleton enemies + dungeon + animations + adventure UI | Matching rigged heroes, enemies, environments and actual combat animations | Scene setup, effects and portrait phone composition | Strongest verified animation coverage; more integration work |

“Easy,” “strong,” and compatibility judgments here are design inferences, not measured implementation or phone-performance results.

## 1. Compact pixel adventure

**Sources and previews:** [Tiny Dungeon official page](https://kenney.nl/assets/tiny-dungeon), [creator's package description](https://kenney-assets.itch.io/tiny-dungeon), and [UI Pack – Pixel Adventure official page](https://kenney.nl/assets/ui-pack-pixel-adventure). The source pages were accessible; a stable direct Kenney preview image was not verified.

- Tiny Dungeon supplies 16 × 16 artwork: dungeon tiles, characters, monsters, weapons and items, with tilesheets, individual sprites and a Tiled sample map. The download is a ZIP. The listing does **not** establish a full idle/attack/hit/death animation set; treat it as static artwork for planning. Image extensions and individual actor coverage still require archive inspection. [Tiny Dungeon](https://kenney.nl/assets/tiny-dungeon), [package contents](https://kenney-assets.itch.io/tiny-dungeon).
- Pixel Adventure UI lists 500 assets and button/panel/slider categories. The page does not specify archive file formats, fonts or animation clips; do not assume these are provided. [Pixel UI](https://kenney.nl/assets/ui-pack-pixel-adventure).
- Both packs are CC0. Tiny Dungeon explicitly permits commercial projects without required attribution. These are asset permissions, not a license for unrelated game code. Preserve source/version records anyway. [Package license](https://kenney-assets.itch.io/tiny-dungeon), [UI license](https://kenney.nl/assets/ui-pack-pixel-adventure).

**Proposed composition:** build a vertical route from room/chest/enemy icons; show two enlarged opposing sprites over a dungeon vignette; reuse pixel panels around a dedicated question screen with ordinary readable text. Use integer sprite scaling, not a pixel font for the clinical vignette.

**Missing work:** animation would initially mean authored lunges, flashes, hit shakes and projectiles, not borrowed attack clips. Boss identity, specialty symbols, question imagery layout and battle effects need design. We have not established whether this simple motion meets the user's expectation of an animated RPG. This is the weakest candidate if expressive character animation is essential.

## 2. Illustrated fantasy with sprite combat

**Sources and verified direct previews:** Wesnoth [mage portrait (WebP)](https://raw.githubusercontent.com/wesnoth/wesnoth/master/data/core/images/portraits/humans/mage.webp), [skeleton portrait (WebP)](https://raw.githubusercontent.com/wesnoth/wesnoth/master/data/core/images/portraits/undead/skeleton.webp), [mage sprite (PNG)](https://raw.githubusercontent.com/wesnoth/wesnoth/master/data/core/images/units/human-magi/mage.png), [mage casting frame (PNG)](https://raw.githubusercontent.com/wesnoth/wesnoth/master/data/core/images/units/human-magi/mage-attack-magic1.png), [skeleton sprite (PNG)](https://raw.githubusercontent.com/wesnoth/wesnoth/master/data/core/images/units/undead-skeletal/skeleton/skeleton.png), and [grass tile (PNG)](https://raw.githubusercontent.com/wesnoth/wesnoth/master/data/core/images/terrain/grass/green.png). All resolved during research. These mutable `master` links are previews, not pinned import references.

- Actual animation is established by the [Mage unit definition](https://raw.githubusercontent.com/wesnoth/wesnoth/master/data/core/units/humans/Mage.cfg): separate idle, defense, death, staff and casting images with timing. Coverage varies: its female variant explicitly substitutes a static idle. The [Skeleton definition](https://raw.githubusercontent.com/wesnoth/wesnoth/master/data/core/units/undead/Skeleton.cfg) references standing and directional defense animation. Do not extrapolate every action to every character.
- Wesnoth stores terrain and animation frames as individual PNGs, generally at its 72-pixel hex scale. The illustrated portraits above are separate WebP assets; they are not rigged or fully animated portraits. [Official art guide](https://wiki.wesnoth.org/Create_art).
- Code, WML definitions, maps and story are GPL v2-or-later except explicitly stated alternatives. Core visual/audio assets are **either** GPL v2-or-later **or** CC BY-SA 4.0; this does not mean every image is dual-licensed at the user's choice. Add-ons can have different terms. [Official copyright policy](https://wiki.wesnoth.org/Wesnoth:Copyrights).
- **Import gate:** exact author/license mapping for the previewed artwork remains unresolved in this pass. The inspected [copyright inventory](https://raw.githubusercontent.com/wesnoth/wesnoth/master/copyrights.csv) is not sufficient clearance for those image files. Before importing, establish each selected file's provenance and license at a pinned revision. CC BY-SA assets require credit, a license link, change indications and ShareAlike for adaptations; GPL artwork needs its applicable redistribution/source obligations handled. [CC BY-SA terms](https://creativecommons.org/licenses/by-sa/4.0/). Reusing artwork does not automatically settle the licensing of separately selected code.

**Proposed composition:** large illustrated portraits establish character identity; small animated sprites perform battles; terrain vignettes decorate a custom branching route. Use [Kenney Adventure UI](https://kenney.nl/assets/ui-pack-adventure) sparingly for panels/buttons, with muted colors, rather than copying Wesnoth's full desktop HUD. This UI pack lists 130 CC0 assets; archive formats remain unverified.

**Missing work:** a portrait phone layout, branch connectors, specialty icons, effect extraction and animation playback. Pixel sprites must not be presented as large illustrated attack animations. This candidate is conditional on file-level art clearance and a scale test.

## 3. Stylized 3D dungeon

| Pack | Verified usable coverage and formats |
| --- | --- |
| [KayKit Adventurers](https://kaylousberg.itch.io/kaykit-adventurers) | Five free rigged/animated characters and 25+ accessories; FBX and glTF. Basic movement is included; combat comes from the animation pack below. |
| [KayKit Skeletons](https://kaylousberg.itch.io/kaykit-skeletons) | Four free rigged/animated enemies and 10+ accessories; FBX and glTF. The distinct golem boss and necromancer are EXTRA-tier content, not included in the free four. |
| [KayKit Character Animations](https://kaylousberg.itch.io/kaykit-character-animations) | Free humanoid clips including idle, hit, death, melee, block, ranged and spellcasting; FBX/glTF. Supports medium and large rigs, with fewer large-rig animations. |
| [KayKit Dungeon Pack](https://kaylousberg.itch.io/kaykit-dungeon-pack) | About 200 free modular environment pieces/props; FBX, glTF and OBJ. This supplies scenery rather than character combat animation. |

**Verified direct official previews:** [adventurers](https://img.itch.zone/aW1nLzEyODExNzM4LnBuZw%3D%3D/original/pGaSc4.png), [skeletons](https://img.itch.zone/aW1nLzE0OTA3NTEyLnBuZw%3D%3D/original/EavBa3.png), [dungeon](https://img.itch.zone/aW1nLzI4NTI5ODAyLnBuZw%3D%3D/original/jy5q7A.png), and [animation-pack overview](https://img.itch.zone/aW1nLzIzNjE1ODM2LnBuZw%3D%3D/original/dxs231.png). Preview images show appearance; animation availability is supported by the pack descriptions, not inferred from those still images.

All four pack pages state CC0, commercial use and no required attribution. Editable Blender sources are paid tiers; do not describe them as included in the free downloads. No game code is selected by this combination.

**Proposed composition:** a compact fixed-camera duel on a dungeon platform; small rendered location icons along the route; [Kenney Adventure UI](https://kenney.nl/assets/ui-pack-adventure) for consistent screen borders and controls. Use a dedicated plain question panel when combat pauses. Rendering icons or animation to 2D is an option to investigate, not a settled pipeline.

**Missing work:** lighting/camera, animation binding, weapon attachment, particle effects, boss distinction and phone composition. A spellcasting clip does not include a complete magic effect system. Author claims of mobile suitability are not performance measurements for our app.

## Next decision

Compare all three using the same portrait-phone composition: route map, one hero-versus-enemy battle and one long question with an image. Ask which style is appealing and whether its motion feels sufficient before selecting an engine or hero/team/card format. Do not equate the completeness of a source game with a reusable phone interface.

This bounded pass inspected eight asset-pack/game sources, with linked primary documentation. No assets were imported, no game ran, and no archive-level compatibility or visual mockup test occurred. Exact asset manifests, pinned versions and the Wesnoth license investigation belong before asset import. The human style choice remains open.
