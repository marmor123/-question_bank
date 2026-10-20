# Disposable close-up journey

Decision: [Choose the world-map and game-interface presentation](https://github.com/marmor123/-question_bank/issues/10).

The user selected a close-up journey, referencing older Pokémon games as a feel reference. This example preserves the Kenney art direction and selectable destinations. The map fills a phone-shaped scene; a visible hero follows the chosen path and the camera tracks that travel.

Run from the repository root:

```powershell
python -m http.server 8769 --bind 127.0.0.1 --directory prototypes/visual-comparison
```

Open http://127.0.0.1:8769/journey-prototype.html.

Tap any sandy path or clearing to walk there. Drag the map to reveal distant places, then tap reachable ground there; the camera returns to following the walking hero. “Return to hero” recenters without issuing movement. Tapping blocked ground leaves the current movement unchanged. Named landmark buttons remain available when onscreen. Both branches reconnect.

Movement uses a small grid pathfinder limited to the authored paths and clearings; houses, scenery props and fences are blocked. A new tap can reroute movement, completing the current tile-edge segment before taking the new path. The menu pauses travel and allows restart. Reduced-motion preference skips travel animation. Switching away pauses travel until returning through the menu.

The user liked the close-up world presentation and requested ground-tap movement to reach places beyond the screen. They agreed to try bounded movement along paths and small clearings, drag-to-look, and return-to-hero. These new controls still await human evaluation. Houses, names, scene density, path shape, camera offset and travel speed remain proposals.

Encounters are placeholders. Walking around does not validate encounter order or progression gating: that behavior remains undecided. There are no questions, battles, rewards, durable saves, offline installer or production engine selection. The existing clean question screen remains the baseline; unrestricted exploration is not selected.

## Reuse

- Kenney Tiny Town 1.1, official CC0 archive: https://kenney.nl/media/pages/assets/tiny-town/a415fbeb49-1735736916/kenney_tiny-town.zip . Unmodified `Tilemap/tilemap_packed.png` copied as `assets/tiny-town.png`, with `License.txt` as `assets/Tiny-Town-LICENSE.txt`.
- Kenney Tiny Dungeon 1.0: the previously imported and licensed sheet from the combat prototype, copied unchanged as `assets/tiny-dungeon.png`, with `assets/Tiny-Dungeon-LICENSE.txt`. Original archive: https://kenney.nl/media/pages/assets/tiny-dungeon/f8422efb44-1674742415/kenney_tiny-dungeon.zip .
- Map composition, camera, path movement and interface framing are authored throwaway code. Pixel Adventure UI was not imported into this example. No Pokémon source, art, music or branding is included.

No art was generated. The sprite sheets supply scenery and the character; the map layout is new. This demonstrates actual art reuse, not measured overall production savings.
