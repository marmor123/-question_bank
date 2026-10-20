# Disposable close-up journey

Decision: [Choose the world-map and game-interface presentation](https://github.com/marmor123/-question_bank/issues/10).

The user selected a close-up journey, referencing older Pokémon games as a feel reference. This example preserves the Kenney art direction and selectable destinations. The map fills a phone-shaped scene; a visible hero follows the chosen path and the camera tracks that travel.

Run from the repository root:

```powershell
python -m http.server 8769 --bind 127.0.0.1 --directory prototypes/visual-comparison
```

Open http://127.0.0.1:8769/journey-prototype.html.

Choose the keeper's house or old lookout. Continue after the encounter placeholder, select the lantern clearing, then the gate. Both branches reconnect. The menu pauses travel and allows restart. Reduced-motion preference skips travel animation. Switching away pauses travel until returning through the menu.

The user has chosen a direction, not accepted this specific composition. Houses, names, scene density, controls, path shape, camera offset and travel speed are proposals. Encounters are placeholders. There are no questions, battles, rewards, durable saves, offline installer, direct movement controls or production engine selection. The existing clean question screen remains the baseline.

## Reuse

- Kenney Tiny Town 1.1, official CC0 archive: https://kenney.nl/media/pages/assets/tiny-town/a415fbeb49-1735736916/kenney_tiny-town.zip . Unmodified `Tilemap/tilemap_packed.png` copied as `assets/tiny-town.png`, with `License.txt` as `assets/Tiny-Town-LICENSE.txt`.
- Kenney Tiny Dungeon 1.0: the previously imported and licensed sheet from the combat prototype, copied unchanged as `assets/tiny-dungeon.png`, with `assets/Tiny-Dungeon-LICENSE.txt`. Original archive: https://kenney.nl/media/pages/assets/tiny-dungeon/f8422efb44-1674742415/kenney_tiny-dungeon.zip .
- Map composition, camera, path movement and interface framing are authored throwaway code. Pixel Adventure UI was not imported into this example. No Pokémon source, art, music or branding is included.

No art was generated. The sprite sheets supply scenery and the character; the map layout is new. This demonstrates actual art reuse, not measured overall production savings.
