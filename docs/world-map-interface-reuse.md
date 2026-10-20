# World map and interface reuse

Research date: 2026-10-20. Planning evidence, not a design decision or engine selection.

The user's concern is that the world map and interface feel like a web app. The existing direction remains: Kenney Tiny Dungeon pixel art, a branching route with selectable locations and visible hero travel, no direct free movement, and a dedicated clean question screen.

## Candidates

| Source and visual reference | What is reusable | Fit and limitation |
| --- | --- | --- |
| **Kenney Tiny Town + UI Pack – Pixel Adventure.** View the publisher's previews: [Tiny Town](https://kenney.nl/assets/tiny-town), [Pixel Adventure UI](https://kenney.nl/assets/ui-pack-pixel-adventure). | Actual environment and interface art. Tiny Town is a 130-file, 16×16 pack. Pixel Adventure UI lists 500 assets and button/panel/slider categories. Both publisher pages identify CC0 licenses. | Most direct visual reuse candidate. Tiny Town shares the 16×16 scale of the already selected [Tiny Dungeon](https://kenney.nl/assets/tiny-dungeon); that supports a coherent composition, though matching palette and UI size still need a visual check. These packs do not supply route logic or hero travel. |
| **yurkth/stsmapgen.** [Author-linked browser demo](https://yurkth.github.io/stsmapgen/), [repository](https://github.com/yurkth/stsmapgen). | JavaScript route generation and drawing. The [source](https://raw.githubusercontent.com/yurkth/stsmapgen/master/sketch.js) builds a graph, finds several paths, and draws connected encounter symbols. | Useful code/reference for branching topology in a browser. It is a static generated diagram, not a complete world scene: the inspected script does not implement location selection, travel animation, or saves. Its diagram appearance alone would not fix the user's complaint. The demo URL is supplied by the author; this research tool could not load it, so runtime behavior is unverified. |
| **silverua/slay-the-spire-map-in-unity.** [Repository with author demo videos](https://github.com/silverua/slay-the-spire-map-in-unity). | A Unity map implementation whose README describes orientation options, persisted map/player position, scrolling, and crossing elimination, plus a Unity UI example scene. | Stronger donor for an actual route-map subsystem if Unity is selected. It does not establish that adopting Unity is cheaper, and these are documented features, not integration-tested findings. Use its route behavior as inspiration while preserving the chosen world presentation; it is not an off-the-shelf Kenney landscape with walking hero. |

## License boundaries

Direct publisher-hosted visual: [Pixel Adventure UI sample image](https://www.kenney.nl/media/pages/assets/ui-pack-pixel-adventure/07714c9849-1725434429/sample.png). This is a reusable asset-pack preview, not a proposed final study-game layout.

- Kenney's two proposed packs and the selected Tiny Dungeon are identified as CC0 on their official pages; their art can be considered for direct reuse.
- [stsmapgen's license](https://raw.githubusercontent.com/yurkth/stsmapgen/master/LICENSE) is MIT, requiring preservation of copyright and license notices when copying substantial code. Its README separately lists MIT, ISC, and BSD-3-Clause dependencies and states an objection to NFT use. It is not a claim that every external library is covered by the root license.
- [silverua's license](https://github.com/silverua/slay-the-spire-map-in-unity/blob/master/LICENSE) is MIT with notice preservation. Its README identifies DOTween, Newtonsoft JSON, and Game-icons.net assets, with icon credits in the project. Review those components individually if importing them; replacing icons with the selected Kenney art avoids assuming the root license covers them.
- These independent implementations are reuse candidates. This does not grant rights to copy commercial Slay the Spire artwork or source code.

## Recommendation for the next visual decision

Prefer a **landscape that occupies the main screen**, assembled from the compatible Kenney art, with branching paths physically connecting landmarks. Put the hero on the current landmark and animate travel along the chosen path. Keep a compact portrait/status overlay and a few pixel-art menu controls around the scene; show encounter details when selecting a location. Continue opening medical questions in the already preferred clean reading screen.

This is a composition proposal, not an approved layout. It targets the stated problem more directly than adding fantasy borders to cards: terrain, location placement, hero scale, and how much screen space the landscape receives should carry the game identity.

For the first comparison, show two rough arrangements using the same selected art and route rules: a close-up journey through a landscape versus a zoomed-out region with several visible landmarks. Do not make the user choose an engine to express this visual preference.

Actual production savings remain unmeasured. Art reuse appears immediately applicable; procedural generation may be unnecessary for a first authored route. Consider borrowing route code only after the chosen presentation reveals a concrete need, and test the smallest uncertain piece. No code donor has been installed or run, no production game code has changed, and no tracker decision has been resolved by this note.
